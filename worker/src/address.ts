import { randomName } from "@scaleway/random-name";

import { site } from "../../site.config.ts";

// 去掉了 l / 1 / o / 0：地址用普通字体显示，这几个字符手抄时容易看错。
const SUFFIX_ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";
const SUFFIX_LENGTH = 6;
// 只用能被字符数整除的那段取值，每个字符出现的概率才相同。
const UNBIASED_LIMIT = 256 - (256 % SUFFIX_ALPHABET.length);

function randomSuffix(): string {
	let suffix = "";
	while (suffix.length < SUFFIX_LENGTH) {
		for (const byte of crypto.getRandomValues(
			new Uint8Array(SUFFIX_LENGTH * 2),
		)) {
			if (byte < UNBIASED_LIMIT && suffix.length < SUFFIX_LENGTH) {
				suffix += SUFFIX_ALPHABET[byte % SUFFIX_ALPHABET.length];
			}
		}
	}
	return suffix;
}

// 名字最长 16 个字符，整个地址就不超过 32 个。首页的地址栏按这个长度算字号，
// 保证地址排成一行（见前端的 app/components/mailbox.tsx）。约七成的名字符合，够用。
const MAX_NAME_LENGTH = 16;

function shortRandomName(): string {
	let name = randomName();
	while (name.length > MAX_NAME_LENGTH) {
		name = randomName();
	}
	return name;
}

export function generateEmailAddress() {
	return `${shortRandomName()}-${randomSuffix()}@${site.domain}`;
}
