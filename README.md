# Claude Code in Figma

在 Figma 设计稿里直接运行 Claude Code 终端。

> **系统要求：** macOS（Apple Silicon 或 Intel）· Figma 桌面版 · 已安装并登录 Claude Code CLI

---

## 下载

在右侧 **[Releases](../../releases/latest)** 页面下载最新版本，包含两个文件：

| 文件 | 说明 |
|------|------|
| `Figent-x.x.x-arm64.dmg` | 本地桥接应用（menubar app） |
| `figma-plugin-vx.x.x.zip` | Figma 插件文件 |

---

## 安装步骤

### 第一步：安装 Claude Code CLI

如果还没有安装，先在终端运行：

```bash
npm install -g @anthropic-ai/claude-code
claude  # 按提示登录
```

### 第二步：安装桥接应用

1. 下载 `.dmg` 文件，打开后将 **Figent** 拖入 Applications 文件夹
2. 启动 Figent，菜单栏右上角会出现图标
3. 保持它在后台运行

### 第三步：安装 Figma 插件

1. 下载 `figma-plugin-vx.x.x.zip`，解压到任意位置（例如桌面）
2. 打开 **Figma 桌面版**
3. 顶部菜单 → **Plugins → Development → Import plugin from manifest…**
4. 选择解压后文件夹里的 `manifest.json`

### 第四步：运行

确认 Figent 正在运行后，在 Figma 里：

**Plugins → Development → Claude Code in Figma**

插件面板打开，即可在 Figma 内使用 Claude Code。

---

## 常见问题

**Mac 提示应用已损坏或来自不明开发者，无法打开？**
这是 macOS 的安全限制，并非真的损坏。解决方法：
1. 打开 **系统设置 → 隐私与安全性**
2. 在「安全性」部分找到被拦截的提示，点击 **「仍要打开」**

或者在终端运行以下命令，允许任意来源的应用：
```bash
sudo spctl --master-disable
```
之后在 **系统设置 → 隐私与安全性 → 允许以下来源的应用** 中选择「任何来源」。

**插件提示无法连接？**
确认 Figent（桥接应用）已启动，菜单栏图标可见。插件通过 `localhost:9528` 与桥接应用通信。

**只支持 macOS 吗？**
目前只有 macOS 版本。

**我的代码会上传到服务器吗？**
不会。桥接应用只连接本地 `localhost:9528`，所有数据在你的电脑上处理。

---

## 问题反馈

[提交 Issue](../../issues) · [查看下载统计](../../releases)
