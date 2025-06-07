import { redirect } from "react-router";

export async function loader() {
	// 404页面自动跳转到首页
	return redirect("/");
}
