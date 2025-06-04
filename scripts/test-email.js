#!/usr/bin/env node

// 本地邮件测试脚本
// 使用方法: node scripts/test-email.js [to_email] [from_email] [port] [with_attachment]

import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const toEmail = process.argv[2] || "test@smail.pw";
const fromEmail = process.argv[3] || "sender@example.com";
const port = process.argv[4] || "5173";
const withAttachment = process.argv[5] === "true" || process.argv[5] === "1";

// 创建一个简单的附件内容（文本文件）
const createAttachment = () => {
	const content = `这是一个测试附件文件
生成时间: ${new Date().toLocaleString("zh-CN")}
文件用途: 验证邮件附件功能

包含内容:
- 中文字符测试
- 换行符测试
- 时间戳: ${Date.now()}
- 随机数: ${Math.random()}

如果您能下载并看到这个文件，说明附件功能正常工作！🎉`;

	const contentBuffer = Buffer.from(content, "utf-8");
	const base64Content = contentBuffer.toString("base64");
	const contentSize = contentBuffer.length;

	return {
		content: base64Content,
		size: contentSize,
	};
};

const attachmentData = withAttachment ? createAttachment() : null;

const testEmail = withAttachment
	? `Received: from smtp.example.com (127.0.0.1)
        by cloudflare-email.com (unknown) id 4fwwffRXOpyR
        for <${toEmail}>; ${new Date().toUTCString()}
From: "测试发件人" <${fromEmail}>
Reply-To: ${fromEmail}
To: ${toEmail}
Subject: 📎 带附件的测试邮件 - ${new Date().toLocaleString("zh-CN")}
Content-Type: multipart/mixed; boundary="boundary123456"
X-Mailer: Local Test Script
Date: ${new Date().toUTCString()}
Message-ID: <${Date.now()}@test.local>

--boundary123456
Content-Type: text/html; charset="utf-8"

<html>
<body>
<h1>📎 带附件的测试邮件</h1>
<p>这是一封包含附件的测试邮件，用于验证附件处理功能。</p>

<div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
  <h2>📧 邮件信息</h2>
  <ul>
    <li><strong>发送时间:</strong> ${new Date().toLocaleString("zh-CN")}</li>
    <li><strong>收件人:</strong> ${toEmail}</li>
    <li><strong>发件人:</strong> ${fromEmail}</li>
    <li><strong>包含附件:</strong> 是 (1个文件)</li>
  </ul>
</div>

<h2>📎 附件测试</h2>
<p>这封邮件包含一个测试附件文件：<strong>test-attachment.txt</strong></p>
<ul>
  <li>✅ 附件存储到R2</li>
  <li>✅ 数据库元数据保存</li>
  <li>✅ 下载功能测试</li>
  <li>✅ 中文文件名支持</li>
</ul>

<p><strong>请点击邮件详情中的附件下载按钮进行测试！📥</strong></p>

<hr>
<p style="color: #666; font-size: 12px;">
  生成时间: ${new Date().toISOString()}<br>
  附件大小: ${attachmentData.size} bytes
</p>
</body>
</html>

--boundary123456
Content-Type: text/plain; charset="utf-8"
Content-Disposition: attachment; filename="test-attachment.txt"
Content-Transfer-Encoding: base64
Content-Length: ${attachmentData.size}

${attachmentData.content}
--boundary123456--`
	: `Received: from smtp.example.com (127.0.0.1)
        by cloudflare-email.com (unknown) id 4fwwffRXOpyR
        for <${toEmail}>; ${new Date().toUTCString()}
From: "测试发件人" <${fromEmail}>
Reply-To: ${fromEmail}
To: ${toEmail}
Subject: 本地开发测试邮件 - ${new Date().toLocaleString("zh-CN")}
Content-Type: text/html; charset="utf-8"
X-Mailer: Local Test Script
Date: ${new Date().toUTCString()}
Message-ID: <${Date.now()}@test.local>

<html>
<body>
<h1>🧪 本地开发测试邮件</h1>
<p>这是一封测试邮件，用于验证本地开发环境的邮件处理功能。</p>

<div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
  <h2>📧 邮件信息</h2>
  <ul>
    <li><strong>发送时间:</strong> ${new Date().toLocaleString("zh-CN")}</li>
    <li><strong>收件人:</strong> ${toEmail}</li>
    <li><strong>发件人:</strong> ${fromEmail}</li>
    <li><strong>测试端口:</strong> ${port}</li>
  </ul>
</div>

<h2>🧪 测试功能</h2>
<ul>
  <li>✅ HTML内容解析</li>
  <li>✅ 中文字符支持</li>
  <li>✅ 邮件存储到数据库</li>
  <li>✅ 邮件列表显示</li>
  <li>✅ 邮件详情查看</li>
</ul>

<p><strong>如果你能在网页界面中看到这封邮件，说明邮件处理功能正常工作！🎉</strong></p>

<hr>
<p style="color: #666; font-size: 12px;">
  这是通过本地调试脚本发送的测试邮件。<br>
  生成时间: ${new Date().toISOString()}
</p>
</body>
</html>`;

async function sendTestEmail() {
	console.log("🚀 发送测试邮件到本地服务器...");
	console.log(`📧 收件人: ${toEmail}`);
	console.log(`👤 发件人: ${fromEmail}`);
	console.log(`🔌 端口: ${port}`);
	console.log(`📎 包含附件: ${withAttachment ? "是" : "否"}`);
	console.log("");

	try {
		const curlCommand = `curl --request POST "http://localhost:${port}/dev/email-handler" \\
			--url-query "from=${fromEmail}" \\
			--url-query "to=${toEmail}" \\
			--header 'Content-Type: application/json' \\
			--data-raw '${testEmail.replace(/'/g, "'\\''")}' \\
			--silent --show-error`;

		console.log("📤 正在发送邮件...");
		const { stdout, stderr } = await execAsync(curlCommand);

		if (stderr) {
			console.error("❌ 发送失败:", stderr);
			process.exit(1);
		}

		console.log("✅ 测试邮件发送成功！");
		console.log("");

		if (withAttachment) {
			console.log("📎 附件测试说明:");
			console.log("1. 打开邮件详情页面");
			console.log("2. 查看附件列表部分");
			console.log("3. 点击下载按钮测试附件下载");
			console.log("4. 验证文件内容是否正确");
			console.log("");
		}

		console.log("📋 接下来的步骤:");
		console.log("1. 检查开发服务器的日志输出");
		console.log("2. 打开 http://localhost:5173/ 查看邮件是否出现在收件箱中");
		console.log("3. 点击邮件查看详细内容");
		console.log("");
		console.log("🔄 要发送更多测试邮件，可以重新运行此脚本");
		if (!withAttachment) {
			console.log(
				"💡 要测试附件功能，请使用: node scripts/test-email.js [email] [from] [port] true",
			);
		}
	} catch (error) {
		console.error("❌ 发送测试邮件时出错:", error.message);
		console.log("");
		console.log("💡 可能的解决方案:");
		console.log("1. 确保开发服务器正在运行 (pnpm dev)");
		console.log("2. 检查端口是否正确 (默认5173)");
		console.log("3. 确保email worker已经正确配置");
		process.exit(1);
	}
}

// 运行测试
sendTestEmail();
