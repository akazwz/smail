// 前端和 Worker 之间的约定：接口返回的数据长什么样，以及两边都要读写的那个 cookie 叫什么。
// 这个文件不依赖任何别的模块；前端只从这里引入类型和常量（package.json 里的 #contract）。

/** D1 里 emails 表的一行，也是接口返回给页面的邮件摘要。 */
export type Email = {
	id: string;
	to_address: string;
	from_name: string;
	from_address: string;
	subject: string;
	time: number;
};

/**
 * GET /api/inbox、POST /api/address、DELETE /api/address 的返回值。
 *
 * POST /api/address 生成一个新地址，原来的作废。带上 `?keep=1` 时，会话里已经有地址
 * 就什么都不改，原样返回现有的收件箱；页面在“没有地址、点生成”时带这个参数。
 */
export type Inbox = {
	addresses: string[];
	emails: Email[];
	// 取数的时间。页面上的相对时间（“3 分钟前”）以它为准。
	renderedAt: number;
};

// 页面读得到的一个标记：1 有地址，0 没有，没有这个 cookie 就是还不知道。
// 会话 cookie 本身是 HttpOnly 的，页面看不到；首页靠这个标记决定要不要来取收件箱。
export const INBOX_MARKER_COOKIE = "smail_inbox";

/** POST /api/messages 的请求内容：联系页的留言。 */
export type MessagePayload = {
	message: string;
	// 留言的人自愿留下的联系方式，可以是空字符串。
	contact: string;
	// 页面的语言。
	locale: string;
	// 陷阱字段：页面上看不见，正常情况下永远是空字符串。
	// 名字故意起得不像任何常见的表单项，免得浏览器的自动填充替真人填上。
	extra: string;
};

/** 留言和联系方式的长度上限。页面上的输入框和 Worker 的校验用同一组数。 */
export const MESSAGE_MAX_LENGTH = 2000;
export const CONTACT_MAX_LENGTH = 200;
