#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

// 图标配置
const ICON_URL =
	"https://mcp-demo.pexni.com/b0cd59a7-c67d-4796-a682-91a5bc3c7433.png";
const PUBLIC_DIR = path.join(__dirname, "../public");
const TEMP_ICON = path.join(PUBLIC_DIR, "temp-icon.png");

// 需要生成的图标尺寸
const ICON_SIZES = {
	"android-chrome-192x192.png": 192,
	"android-chrome-512x512.png": 512,
	"apple-touch-icon.png": 180,
	"favicon-16x16.png": 16,
	"favicon-32x32.png": 32,
};

// 下载图标文件
function downloadIcon() {
	return new Promise((resolve, reject) => {
		console.log("📥 下载图标文件...");

		const file = fs.createWriteStream(TEMP_ICON);

		https
			.get(ICON_URL, (response) => {
				if (response.statusCode !== 200) {
					reject(new Error(`下载失败: ${response.statusCode}`));
					return;
				}

				response.pipe(file);

				file.on("finish", () => {
					file.close();
					console.log("✅ 图标下载完成");
					resolve();
				});
			})
			.on("error", (err) => {
				fs.unlink(TEMP_ICON, () => {}); // 删除失败的文件
				reject(err);
			});
	});
}

// 检查是否安装了 sharp
function checkSharp() {
	try {
		require("sharp");
		return true;
	} catch (err) {
		return false;
	}
}

// 使用 sharp 生成图标
async function generateIconsWithSharp() {
	const sharp = require("sharp");

	console.log("🎨 使用 Sharp 生成图标...");

	for (const [filename, size] of Object.entries(ICON_SIZES)) {
		const outputPath = path.join(PUBLIC_DIR, filename);

		await sharp(TEMP_ICON)
			.resize(size, size, {
				fit: "contain",
				background: { r: 255, g: 255, b: 255, alpha: 0 },
			})
			.png()
			.toFile(outputPath);

		console.log(`✅ 生成 ${filename} (${size}x${size})`);
	}
}

// 生成 favicon.ico
async function generateFavicon() {
	const sharp = require("sharp");
	const ico = require("png-to-ico");

	console.log("🏷️  生成 favicon.ico...");

	// 生成多个尺寸的 PNG 用于 ICO
	const sizes = [16, 32, 48];
	const buffers = [];

	for (const size of sizes) {
		const buffer = await sharp(TEMP_ICON)
			.resize(size, size, {
				fit: "contain",
				background: { r: 255, g: 255, b: 255, alpha: 0 },
			})
			.png()
			.toBuffer();

		buffers.push(buffer);
	}

	// 生成 ICO 文件
	try {
		const icoBuffer = await ico(buffers);
		fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer);
		console.log("✅ 生成 favicon.ico");
	} catch (err) {
		console.log("⚠️  ICO 生成失败，保持现有的 favicon.ico");
	}
}

// 生成网站清单
function generateManifest() {
	const manifestPath = path.join(PUBLIC_DIR, "site.webmanifest");

	// 检查是否已存在动态路由生成的清单
	if (fs.existsSync(manifestPath)) {
		console.log("ℹ️  使用现有的动态 site.webmanifest");
		return;
	}

	const manifest = {
		name: "Smail - 临时邮箱服务",
		short_name: "Smail",
		description: "免费、安全、无广告的临时邮箱服务",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#2563eb",
		orientation: "portrait-primary",
		scope: "/",
		lang: "zh-CN",
		categories: ["productivity", "utilities"],
		icons: [
			{
				src: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable any",
			},
			{
				src: "/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable any",
			},
		],
	};

	fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
	console.log("✅ 生成 site.webmanifest");
}

// 清理临时文件
function cleanup() {
	if (fs.existsSync(TEMP_ICON)) {
		fs.unlinkSync(TEMP_ICON);
		console.log("🧹 清理临时文件");
	}
}

// 主函数
async function main() {
	try {
		console.log("🚀 开始生成网站图标...\n");

		// 检查 sharp 是否可用
		if (!checkSharp()) {
			console.log("❌ 未找到 sharp 库");
			console.log("请运行: pnpm add -D sharp png-to-ico");
			console.log(`或者手动下载图标: ${ICON_URL}`);
			process.exit(1);
		}

		// 确保 public 目录存在
		if (!fs.existsSync(PUBLIC_DIR)) {
			fs.mkdirSync(PUBLIC_DIR, { recursive: true });
		}

		// 下载原始图标
		await downloadIcon();

		// 生成各种尺寸的图标
		await generateIconsWithSharp();

		// 生成 favicon.ico
		await generateFavicon();

		// 生成网站清单（如果需要）
		generateManifest();

		// 清理临时文件
		cleanup();

		console.log("\n🎉 所有图标生成完成！");
		console.log("\n生成的文件：");
		for (const filename of Object.keys(ICON_SIZES)) {
			console.log(`  ✓ ${filename}`);
		}
		console.log("  ✓ favicon.ico");

		console.log("\n现在你的网站应该不会再有 404 图标错误了！ 🚀");
	} catch (error) {
		console.error("❌ 生成图标时出错:", error.message);
		cleanup();
		process.exit(1);
	}
}

// 运行脚本
if (require.main === module) {
	main();
}
