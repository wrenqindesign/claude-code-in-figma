# Claude Code in Figma

[English](README.md) | 中文

在 Figma 设计稿里直接运行 Claude Code 终端。

> **系统要求：** macOS（Apple Silicon 或 Intel）· Figma 桌面版 · 已安装并登录 Claude Code CLI

---

## 功能特性

- **终端内嵌 Figma** — 无需离开设计工具，直接使用完整的 Claude Code 会话
- **主题同步** — 插件与 menubar 应用均支持浅色、深色、跟随系统三种模式，自动响应 macOS 外观设置

---

## 安装

### 桥接应用

推荐使用一条命令完成安装。它会把桥接应用安装到 `~/Applications`，移除 macOS quarantine，并自动启动：

```bash
curl -fsSL https://raw.githubusercontent.com/wrenqindesign/claude-code-in-figma/main/install.sh | bash
```

说明：

- 当前安装脚本只支持 **macOS Apple Silicon（arm64）**
- 你仍然需要单独安装并登录 Claude Code CLI
- 安装路径默认是 `~/Applications/Claude Code in Figma.app`

---

## 安装步骤

### 第一步：安装 Claude Code CLI

如果还没有安装，先在终端运行：

```bash
npm install -g @anthropic-ai/claude-code
claude  # 按提示登录
```

### 第二步：安装桥接应用

运行上面的安装命令即可自动安装桥接应用。

该桥接应用除了承担与本地 Claude Code 和 Figma Plugin 的通信，也可以显示你的 Claude Code 使用额度与重置等 usage，与后台一致。

<img width="536" height="524" alt="Claude Code in Figma menubar app" src="https://github.com/user-attachments/assets/b2621837-5b1d-41dc-9d55-86bad1ad269c" />

安装完成后，打开应用就会在菜单栏右上角出现图标。使用 Figma 插件时请保持它在后台运行。

### 第三步：安装 Figma 插件

<img width="1704" height="1208" alt="从 manifest 导入插件" src="https://github.com/user-attachments/assets/c9a45f15-ec84-4f7a-bf6b-0b370fb8e30f" />

1. 从 **[Releases](../../releases/latest)** 下载 `figma-plugin-v0.1.0.zip`，解压到任意位置（例如桌面）
2. 打开 **Figma 桌面版**
3. 顶部菜单 → **Plugins → Development → Import plugin from manifest…**
4. 选择解压后文件夹里的 `manifest.json`

### 第四步：运行

<img width="1348" height="1652" alt="Claude Code in Figma 运行中" src="https://github.com/user-attachments/assets/b0fb561b-b85a-45c4-a4b3-5262b60b8358" />

确认 **Claude Code in Figma** 正在运行后，在 Figma 里：

**Plugins → Development → Claude Code in Figma**

插件面板打开，即可在 Figma 内使用 Claude Code。

### 以后再次打开

如果你退出了 menubar app，之后可以运行：

```bash
open "$HOME/Applications/Claude Code in Figma.app"
```

或者在 Finder 的 `~/Applications` 里双击 **Claude Code in Figma.app**。

### 验证安装是否正常

下面两条命令应该都能正常工作：

```bash
find "$HOME/Applications/Claude Code in Figma.app" -path '*libffmpeg.dylib'
```

```bash
claude --version
```

---

## 常见问题

**如何开机自动启动？**
打开 **系统设置 → 通用 → 登录项**，把 **Claude Code in Figma.app** 加进去。

**只支持 macOS 吗？**
目前只有 macOS 版本。

**我的代码会上传到服务器吗？**
不会。桥接应用只连接本地 `localhost:9528`，所有数据在你的电脑上处理。

---

## 问题反馈

[提交 Issue](../../issues) · [查看下载统计](../../releases)
