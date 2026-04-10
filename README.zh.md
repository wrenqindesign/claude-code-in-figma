# Claude Code in Figma

[English](README.md) | 中文

在 Figma 设计稿里直接运行 Claude Code 终端。

> **系统要求：** macOS（Apple Silicon 或 Intel）· Figma 桌面版 · 已安装并登录 Claude Code CLI

---

## 功能特性
<img width="3356" height="2214" alt="CleanShot 2026-04-07 at 16 46 55@2x" src="https://github.com/user-attachments/assets/1d43e684-6953-4bac-9e5d-c7842427f0d6" />


- **终端内嵌 Figma** — 无需离开设计工具，直接使用完整的 Claude Code 会话
- **主题同步** — 插件与 menubar 应用均支持浅色、深色、跟随系统三种模式，自动响应 macOS 外观设置

---

## 产品介绍

Claude Code in Figma 用来连接设计工作区与本地编码工作区，让设计师、工程师或个人开发者可以直接在 Figma 里运行真实的 Claude Code 会话，同时依然把执行留在自己的电脑上。

整个产品由两部分组成：

- **桥接应用** — 运行在 macOS 菜单栏中的本地应用，负责管理本地会话，并为 Figma 提供 localhost 连接
- **Figma 插件** — 运行在 Figma 内的界面层，用来打开终端面板并把请求发送给桥接应用

这种结构把设计评审、实现和迭代放在同一个工作流里，减少在 Figma 和独立终端之间来回切换。

## 运作方式

1. 桥接应用在你的 Mac 本地运行，并启动插件所需的本地服务。
2. Figma 插件通过 `localhost:9528` 连接桥接应用。
3. Claude Code 依赖你自己的 CLI 登录态和本地文件，在你的电脑上运行。
4. 命令、输出和交互结果会回显到 Figma 面板里。
5. usage 状态和重置时间也会显示在 menubar 应用中。

简单来说：Figma 负责界面，桥接应用负责本地通信，Claude Code 负责在你的电脑上实际执行任务。

---

## 安装

### 桥接应用

推荐使用一条命令完成安装。它会把桥接应用安装到 `~/Applications`，移除 macOS quarantine，并自动启动：

```bash
curl -fsSL https://raw.githubusercontent.com/wrenqindesign/claude-code-in-figma/main/install.sh | bash
```
<img width="1336" height="1058" alt="CleanShot 2026-04-07 at 17 27 42@2x" src="https://github.com/user-attachments/assets/14d8110b-cedb-4ca1-8805-0e291a243354" />


说明：

- 安装脚本会自动为 **Apple Silicon（`arm64`）** 和 **Intel（`x86_64`）** Mac 选择对应版本
- 你仍然需要单独安装并登录 Claude Code CLI
- 安装路径默认是 `~/Applications/Claude Code in Figma.app`
- **请勿直接从 Releases 下载 `.zip` 安装。** 直接下载的包缺少 quarantine 清除步骤，macOS Gatekeeper 会阻止应用运行。

---

## 安装步骤

### 第一步：安装 Claude Code CLI

如果还没有安装，先在终端运行：

```bash
npm install -g @anthropic-ai/claude-code
claude  # 按提示登录
```

### 第二步：安装桥接应用

运行这条命令即可自动安装桥接应用。

```bash
curl -fsSL https://raw.githubusercontent.com/wrenqindesign/claude-code-in-figma/main/install.sh | bash
```
<img width="1336" height="1058" alt="CleanShot 2026-04-07 at 17 27 42@2x" src="https://github.com/user-attachments/assets/0de85e80-82ee-4f46-bfa9-e744bebc0dfb" />

<img width="1174" height="742" alt="CleanShot 2026-04-07 at 17 30 13@2x" src="https://github.com/user-attachments/assets/6790fe4d-801a-4e1d-a8a8-aa19dbb5724d" />


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
