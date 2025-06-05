import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

// SVG 基础模板
const createIconSVG = (size, maskable = false) => {
	const padding = maskable ? size * 0.1 : 0; // maskable图标需要10%的安全区域
	const contentSize = size - padding * 2;
	const iconScale = contentSize * 0.75; // 图标占可用空间的75%
	const iconOffset = padding + (contentSize - iconScale) / 2; // 居中偏移
	const scale = iconScale / 24; // 将24x24的lucide Mail图标缩放到所需大小
	const transform = `translate(${iconOffset}, ${iconOffset}) scale(${scale})`;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0891b2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.1875}" ry="${size * 0.1875}" fill="url(#grad)" />
  <g transform="${transform}" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
  </g>
</svg>`;
};

// 生成图标配置
const icons = [
	{ size: 192, name: "icon-192.png" },
	{ size: 512, name: "icon-512.png" },
	{ size: 192, name: "icon-192-maskable.png", maskable: true },
	{ size: 512, name: "icon-512-maskable.png", maskable: true },
	{ size: 32, name: "favicon-32.png" },
	{ size: 16, name: "favicon-16.png" },
];

const publicDir = path.join(process.cwd(), "public");

async function generateIcons() {
	console.log("🎨 生成PWA PNG图标...");

	for (const { size, name, maskable } of icons) {
		try {
			const svgString = createIconSVG(size, maskable);
			const pngBuffer = await sharp(Buffer.from(svgString))
				.resize(size, size)
				.png()
				.toBuffer();

			const filePath = path.join(publicDir, name);
			fs.writeFileSync(filePath, pngBuffer);

			console.log(
				`✅ 生成 ${name} (${size}x${size}${maskable ? ", maskable" : ""})`,
			);
		} catch (error) {
			console.error(`❌ 生成 ${name} 失败:`, error.message);
		}
	}

	// 生成ICO格式的favicon
	try {
		console.log("🔧 生成ICO格式favicon...");

		// 创建多尺寸PNG用于ICO
		const favicon16 = await sharp(Buffer.from(createIconSVG(16)))
			.resize(16, 16)
			.png()
			.toBuffer();

		const favicon32 = await sharp(Buffer.from(createIconSVG(32)))
			.resize(32, 32)
			.png()
			.toBuffer();

		// 创建包含多尺寸的ICO文件
		const icoBuffer = await toIco([favicon16, favicon32]);
		const icoPath = path.join(publicDir, "favicon.ico");
		fs.writeFileSync(icoPath, icoBuffer);

		console.log("✅ 生成 favicon.ico (16x16, 32x32)");
	} catch (error) {
		console.error("❌ 生成favicon.ico失败:", error.message);
	}

	console.log("🎉 所有图标生成完成！");
	console.log("\n📝 说明:");
	console.log("- 生成了PWA所需的PNG格式图标");
	console.log("- 生成了ICO格式的favicon，提供最佳兼容性");
	console.log("- maskable图标包含10%安全区域，适用于自适应图标");
	console.log("- 所有图标使用蓝色渐变背景和邮件图标设计");
}

generateIcons().catch(console.error);
