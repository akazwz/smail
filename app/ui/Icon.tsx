import type { JSX } from "@solidjs/web";

const paths = {
	copy: () => (
		<>
			<rect width="14" height="14" x="8" y="8" rx="2" />
			<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
		</>
	),
	check: () => <path d="M20 6 9 17l-5-5" />,
	refresh: () => (
		<>
			<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
			<path d="M21 3v5h-5" />
			<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
			<path d="M8 16H3v5" />
		</>
	),
	// 垃圾桶：它所在的东西会消失。
	// 两条交叉的箭头：换一个。和 refresh（原地刷新）区分开。
	shuffle: () => (
		<>
			<path d="m18 14 4 4-4 4" />
			<path d="m18 2 4 4-4 4" />
			<path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
			<path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
			<path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
		</>
	),
	trash: () => (
		<>
			<path d="M3 6h18" />
			<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
			<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
		</>
	),
	plus: () => (
		<>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</>
	),
	back: () => <path d="m15 18-6-6 6-6" />,
	forward: () => <path d="m9 18 6-6-6-6" />,
	close: () => (
		<>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</>
	),
	mail: () => (
		<>
			<rect width="20" height="16" x="2" y="4" rx="2" />
			<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		</>
	),
	inbox: () => (
		<>
			<path d="M22 12h-6l-2 3h-4l-2-3H2" />
			<path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
		</>
	),
	globe: () => (
		<>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
			<path d="M2 12h20" />
		</>
	),
} satisfies Record<string, () => JSX.Element>;

export type IconName = keyof typeof paths;

// 装饰性的线性图标；可访问名称由包着它的控件提供。
export function Icon(props: { name: IconName; size?: number }) {
	return (
		<svg
			aria-hidden="true"
			width={props.size ?? 18}
			height={props.size ?? 18}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			{paths[props.name]()}
		</svg>
	);
}
