import randomName from "@scaleway/random-name";
import { customAlphabet } from "nanoid";

const nanoSuffix = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);

export function generateEmailAddress() {
	return `${randomName()}-${nanoSuffix()}@smail.pw`;
}
