import randomName from "@scaleway/random-name";
import { customAlphabet } from "nanoid";

export function generateEmailAddress() {
	return `${randomName()}-${customAlphabet("1234567890", 6)()}@smail.pw`;
}
