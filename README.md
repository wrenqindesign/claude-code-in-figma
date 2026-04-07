# Claude Code in Figma

English | [中文](README.zh.md)

Run a full Claude Code terminal directly inside Figma.

[![GitHub Sponsors](https://img.shields.io/github/sponsors/wrenqindesign?style=flat&logo=githubsponsors&color=EA4AAA)](https://github.com/sponsors/wrenqindesign)

> **Requirements:** macOS (Apple Silicon or Intel) · Figma desktop app · Claude Code CLI installed and authenticated

---

## Features

- **Terminal inside Figma** — full Claude Code session without leaving your design tool
- **Theme sync** — the plugin and menubar app both support Light, Dark, and System modes, automatically following your macOS appearance setting

---

## Product Overview

Claude Code in Figma connects your design workspace and your local coding workspace. It lets designers, engineers, and solo builders run a real Claude Code session inside Figma while keeping execution on their own machine.

The product is made of two parts:

- **Bridge app** — a local menubar app on macOS that manages the local session and exposes a localhost connection for Figma
- **Figma plugin** — the UI inside Figma that opens the terminal panel and sends requests to the bridge app

This setup keeps the workflow close to design review, implementation, and iteration without asking users to switch between Figma and a separate terminal window all day.

## How It Works

1. The bridge app runs locally on your Mac and starts the local service used by the plugin.
2. The Figma plugin connects to the bridge app through `localhost:9528`.
3. Claude Code runs on your machine with your own CLI login and local files.
4. Commands, output, and interaction are rendered back into the Figma panel.
5. Usage status and reset timing are also exposed through the menubar app.

In short: Figma provides the interface, the bridge app handles local communication, and Claude Code does the actual work on your computer.

---

## Install

### Bridge app

The recommended install path is a one-line script that installs the bridge app into `~/Applications`, removes macOS quarantine, and launches it:

```bash
curl -fsSL https://raw.githubusercontent.com/wrenqindesign/claude-code-in-figma/main/install.sh | bash
```
<img width="1520" height="1130" alt="CleanShot 2026-04-07 at 16 32 57@2x" src="https://github.com/user-attachments/assets/5a576e8d-da87-42b3-9e74-b45f6c8027c0" />


Notes:

- This installer currently targets **macOS Apple Silicon (arm64)**.
- Claude Code CLI still needs to be installed and logged in separately.
- It installs to `~/Applications/Claude Code in Figma.app`.

---

## Installation

### Step 1 — Install Claude Code CLI

If you haven't already, run this in your terminal:

```bash
npm install -g @anthropic-ai/claude-code
claude  # follow the login prompts
```

### Step 2 — Install the bridge app

Run this command. It installs the bridge app automatically.
<img width="1520" height="1130" alt="CleanShot 2026-04-07 at 16 32 57@2x" src="https://github.com/user-attachments/assets/edf49eaa-af45-4e17-bf97-7443ae34475f" />



```bash
curl -fsSL https://raw.githubusercontent.com/wrenqindesign/claude-code-in-figma/main/install.sh | bash
```

The bridge app handles communication between Claude Code and the Figma plugin. It also displays your Claude Code usage quota and reset status in the menubar.

<img width="536" height="524" alt="Claude Code in Figma menubar app" src="https://github.com/user-attachments/assets/b2621837-5b1d-41dc-9d55-86bad1ad269c" />

After installation, a menubar icon will appear when the app is open. Keep it running in the background while using the Figma plugin.

### Step 3 — Install the Figma plugin

<img width="1704" height="1208" alt="Import plugin from manifest" src="https://github.com/user-attachments/assets/c9a45f15-ec84-4f7a-bf6b-0b370fb8e30f" />

1. Download and unzip `figma-plugin-v0.1.0.zip` from **[Releases](../../releases/latest)** anywhere (e.g. your Desktop)
2. Open the **Figma desktop app**
3. Go to **Menu → Plugins → Development → Import plugin from manifest…**
4. Select the `manifest.json` inside the unzipped folder

### Step 4 — Run

<img width="1358" height="1662" alt="CleanShot 2026-04-07 at 11 49 38@2x" src="https://github.com/user-attachments/assets/7538017e-aece-4fe2-b6fb-5cd9b5924334" />

Make sure the bridge app is running, then in Figma:

**Plugins → Development → Claude Code in Figma**

A terminal panel opens inside Figma, connected to Claude Code.

### Open it again later

If you quit the menubar app and want to reopen it later, run:

```bash
open "$HOME/Applications/Claude Code in Figma.app"
```

Or open **Claude Code in Figma.app** from Finder in `~/Applications`.

### Verify the install

These checks should succeed on a healthy install:

```bash
find "$HOME/Applications/Claude Code in Figma.app" -path '*libffmpeg.dylib'
```

```bash
claude --version
```

---

## FAQ

**How do I start it automatically on login?**
Go to **System Settings → General → Login Items** and add **Claude Code in Figma.app**.

**macOS only?**
Yes, for now. Windows support is not available yet.

**Is my code sent to any server?**
No. The bridge app only connects to local `localhost:9528`. Everything stays on your machine.

---

## Feedback

[Open an Issue](../../issues) · [Download stats](../../releases)

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wrenqindesign/claude-code-in-figma&type=Date)](https://star-history.com/#wrenqindesign/claude-code-in-figma&Date)
