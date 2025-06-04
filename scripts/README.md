# 图标生成脚本

这个脚本自动为Smail网站生成所有需要的图标文件。

## 使用方法

```bash
# 方法1: 直接运行脚本
node scripts/generate-icons.cjs

# 方法2: 使用npm脚本
pnpm run generate-icons
```

## 功能

- 🖼️ 自动下载AI生成的Smail图标
- 📐 生成多种尺寸的PNG图标:
  - `android-chrome-192x192.png` (192x192)
  - `android-chrome-512x512.png` (512x512) 
  - `apple-touch-icon.png` (180x180)
  - `favicon-16x16.png` (16x16)
  - `favicon-32x32.png` (32x32)
- 🏷️ 生成多层级的 `favicon.ico`
- 🧹 自动清理临时文件

## 依赖

脚本需要以下npm包（已包含在devDependencies中）:
- `sharp` - 图像处理
- `png-to-ico` - ICO文件生成

## 生成的文件

所有图标文件会保存到 `public/` 目录，这样可以被网站直接访问，解决404错误。

## 图标设计

当前使用的图标是AI生成的蓝色主题的"S"字母图标，符合Smail的品牌形象。 