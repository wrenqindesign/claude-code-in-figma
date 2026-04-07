# Claude Code in Figma

[English](README.md) | 中文

在 Figma 设计稿里直接运行 Claude Code 终端。

> **系统要求：** macOS（Apple Silicon 或 Intel）· Figma 桌面版 · 已安装并登录 Claude Code CLI

---

## 功能特性

- **终端内嵌 Figma** — 无需离开设计工具，直接使用完整的 Claude Code 会话
- **主题同步** — 插件与 menubar 应用均支持浅色、深色、跟随系统三种模式，自动响应 macOS 外观设置

---

## 下载

在右侧 **[Releases](../../releases/latest)** 页面下载最新版本，包含两个文件：

| 文件 | 说明 |
|------|------|
| `Figent-x.x.x-arm64.dmg` | 本地桥接应用（menubar app） |
| `figma-plugin-vx.x.x.zip` | Figma 插件文件 |

> 只需下载前两个文件，**Source code** 是 GitHub 自动附加的，无需下载。

---

## 安装步骤

### 第一步：安装 Claude Code CLI

如果还没有安装，先在终端运行：

```bash
npm install -g @anthropic-ai/claude-code
claude  # 按提示登录
```

### 第二步：安装桥接应用

该桥接应用除了承担与本地 Claude Code 和 Figma Plugin 的通信，也可以显示你的 Claude Code 使用额度与重置等 usage，与后台一致。

<img width="536" height="524" alt="Figent menubar app" src="https://github.com/user-attachments/assets/b2621837-5b1d-41dc-9d55-86bad1ad269c" />

1. 下载 `.dmg` 文件，打开后将 **Figent** 拖入 Applications 文件夹
2. 启动 Figent，菜单栏右上角会出现图标
3. 保持它在后台运行

### 第三步：安装 Figma 插件

<img width="1704" height="1208" alt="从 manifest 导入插件" src="https://github.com/user-attachments/assets/c9a45f15-ec84-4f7a-bf6b-0b370fb8e30f" />

1. 下载 `figma-plugin-vx.x.x.zip`，解压到任意位置（例如桌面）
2. 打开 **Figma 桌面版**
3. 顶部菜单 → **Plugins → Development → Import plugin from manifest…**
4. 选择解压后文件夹里的 `manifest.json`

### 第四步：运行

<img width="1348" height="1652" alt="Claude Code in Figma 运行中" src="https://github.com/user-attachments/assets/b0fb561b-b85a-45c4-a4b3-5262b60b8358" />

确认 Figent 正在运行后，在 Figma 里：

**Plugins → Development → Claude Code in Figma**

插件面板打开，即可在 Figma 内使用 Claude Code。

---

## 常见问题

**Mac 提示「应用已损坏，无法打开」？**
这是 macOS Gatekeeper 的隔离标记问题，并非真的损坏。应用未签名，macOS 会在下载时自动加上隔离标记。在终端运行以下命令移除即可：

```bash
xattr -cr "/Applications/Claude Code in Figma.app"
```

之后正常启动应用，**无需**关闭 Gatekeeper 或修改任何系统设置。

**插件提示无法连接？**
确认 Figent（桥接应用）已启动，菜单栏图标可见。插件通过 `localhost:9528` 与桥接应用通信。

**只支持 macOS 吗？**
目前只有 macOS 版本。

**我的代码会上传到服务器吗？**
不会。桥接应用只连接本地 `localhost:9528`，所有数据在你的电脑上处理。

---

## 问题反馈

[提交 Issue](../../issues) · [查看下载统计](../../releases)
