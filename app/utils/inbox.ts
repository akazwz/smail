import { revalidate, useAction } from "@solidjs/router";
import {
	createEffect,
	createMemo,
	createOptimistic,
	createSignal,
	onCleanup,
	onSettled,
} from "solid-js";

import {
	deleteAddressAction,
	generateAddressAction,
	getInbox,
} from "#/data.ts";
import { useLiveInbox } from "#/utils/live-inbox.ts";
import { type Email, INBOX_MARKER_COOKIE } from "#contract";

export type InboxState = {
	// guest：没有地址；ready：取到了；failed：一次都没取到，不能当成“没有地址”。
	status: "guest" | "ready" | "failed";
	addresses: string[];
	emails: Email[];
	renderedAt: number;
	// 这一次刷新没成功，显示的还是上一次取到的内容。
	stale?: boolean;
};

const GUEST: InboxState = {
	status: "guest",
	addresses: [],
	emails: [],
	renderedAt: 0,
};

// 出错提示在界面上停留多久。
const NOTICE_MS = 5000;

// 浏览器里记着“这个访客有没有地址”的那个 cookie：1 有，0 没有，没有这个 cookie 就是还不知道。
function readInboxMarker(): string | null {
	const match = new RegExp(`(?:^|; )${INBOX_MARKER_COOKIE}=([01])`).exec(
		document.cookie,
	);
	return match?.[1] ?? null;
}

/**
 * 首页收件箱的全部状态和操作：要不要去取、取到了什么、推送连没连上，以及生成、更换、
 * 删除地址和手动刷新。界面只管把它显示出来。
 */
export function useInbox() {
	const [refreshing, setRefreshing] = createSignal(false);
	// 正在进行的操作。操作结束后自动回到 null。
	const [pending, setPending] = createOptimistic<"generate" | "delete" | null>(
		null,
	);

	// 首页是预渲染的静态页，HTML 里永远是“没有地址”的样子。
	// 浏览器接管后再决定要不要找 Worker 要收件箱：确定没有地址的访客一次都不用问。
	const [shouldLoad, setShouldLoad] = createSignal(false);
	// 上一次成功取到的收件箱。之后某一次刷新失败（网络抖了一下、接口出错）时接着显示它：
	// 地址还是那个地址，不能因为一次失败就从界面上消失。
	let lastLoaded: InboxState | undefined;
	const inbox = createMemo<InboxState | Promise<InboxState>>(() =>
		shouldLoad()
			? getInbox().then(
					(loaded): InboxState => {
						lastLoaded = {
							...loaded,
							status: loaded.addresses.length > 0 ? "ready" : "guest",
						};
						return lastLoaded;
					},
					(): InboxState =>
						lastLoaded
							? { ...lastLoaded, stale: true }
							: { ...GUEST, status: "failed" },
				)
			: GUEST,
	) as () => InboxState;
	const address = () => inbox().addresses[0];

	// 一次操作或刷新没成功时给用户的提示，过几秒自己消失。
	const [failed, setFailed] = createSignal(false);
	let noticeTimer: ReturnType<typeof setTimeout> | undefined;
	const showFailure = () => {
		setFailed(true);
		clearTimeout(noticeTimer);
		noticeTimer = setTimeout(() => setFailed(false), NOTICE_MS);
	};
	onCleanup(() => clearTimeout(noticeTimer));

	onSettled(() => {
		if (readInboxMarker() !== "0") {
			setShouldLoad(true);
		}
	});

	// 取到结果之后，<head> 里那段脚本为“有地址的访客”提前换上的占位块就可以交还给页面了。
	createEffect(
		() => inbox() !== GUEST,
		(loaded) => {
			if (loaded) {
				delete document.documentElement.dataset.inbox;
			}
		},
	);

	const generate = useAction(generateAddressAction);
	const remove = useAction(deleteAddressAction);
	generateAddressAction.onSubmit(() => setPending("generate"));
	deleteAddressAction.onSubmit(() => setPending("delete"));
	generateAddressAction.onSettled((submission) => {
		if (submission.error) {
			showFailure();
		}
		// 第一次生成地址之前没取过收件箱，生成完要开始读。
		setShouldLoad(true);
	});
	deleteAddressAction.onSettled((submission) => {
		if (submission.error) {
			showFailure();
		}
	});

	// 每取完一次（不管成没成功）收件箱都是一个新对象：刷新到此结束。
	createEffect(
		() => inbox(),
		(current) => {
			// 只有用户自己点的刷新才提示；推送触发的后台刷新失败了不打扰，下一次再取就是了。
			if (current.stale && refreshing()) {
				showFailure();
			}
			setRefreshing(false);
		},
		{ defer: true },
	);

	const refresh = () => {
		setRefreshing(true);
		revalidate(getInbox.key);
	};

	// 有新邮件时 Worker 会推一个信号过来，收到就重新取一次收件箱。
	const live = useLiveInbox(address, () => revalidate(getInbox.key));

	return {
		inbox,
		address,
		live,
		refreshing,
		pending,
		/** 刚才的操作或刷新没成功。 */
		failed,
		refresh,
		// 失败由上面的 onSettled 提示给用户，这里只是不让它变成“未处理的错误”。
		/** 没有地址时生成一个。 */
		generate: () => void generate(false).catch(() => {}),
		/** 换成一个新地址，原来的作废。调用前要先让用户确认。 */
		replace: () => void generate(true).catch(() => {}),
		remove: () => void remove().catch(() => {}),
	};
}

export type InboxController = ReturnType<typeof useInbox>;
