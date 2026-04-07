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

## Download

Go to **[Releases](../../releases/latest)** on the right and download the latest version. You need two files:

| File | Description |
|------|-------------|
| `Claude Code in Figma-x.x.x-arm64.dmg` | Local bridge app (menubar) |
| `figma-plugin-vx.x.x.zip` | Figma plugin files |

> Only download the first two files. The **Source code** entries are added by GitHub automatically and are not needed.

---

## Installation

### Step 1 — Install Claude Code CLI

If you haven't already, run this in your terminal:

```bash
npm install -g @anthropic-ai/claude-code
claude  # follow the login prompts
```

### Step 2 — Install the bridge app

The bridge app handles communication between Claude Code and the Figma plugin. It also displays your Claude Code usage quota and reset status in the menubar.

<img width="536" height="524" alt="Claude Code in Figma menubar app" src="https://github.com/user-attachments/assets/b2621837-5b1d-41dc-9d55-86bad1ad269c" />

1. Open the `.dmg` file and drag **Claude Code in Figma** into your Applications folder
2. Launch the app — a menubar icon will appear in the top-right
3. Keep it running in the background

### Step 3 — Install the Figma plugin

<img width="1704" height="1208" alt="Import plugin from manifest" src="https://github.com/user-attachments/assets/c9a45f15-ec84-4f7a-bf6b-0b370fb8e30f" />

1. Download and unzip `figma-plugin-vx.x.x.zip` anywhere (e.g. your Desktop)
2. Open the **Figma desktop app**
3. Go to **Menu → Plugins → Development → Import plugin from manifest…**
4. Select the `manifest.json` inside the unzipped folder

### Step 4 — Run

<img width="1358" height="1662" alt="CleanShot 2026-04-07 at 11 49 38@2x" src="https://github.com/user-attachments/assets/7538017e-aece-4fe2-b6fb-5cd9b5924334" />

Make sure the bridge app is running, then in Figma:

**Plugins → Development → Claude Code in Figma**

A terminal panel opens inside Figma, connected to Claude Code.

---

## FAQ

**macOS says the app is "damaged and can't be opened"?**
This is a macOS Gatekeeper quarantine flag — not actual damage. The app is unsigned, so macOS blocks it on download.

**Option A — before installing (recommended):** remove the flag from the DMG first, then drag to Applications as usual:
```bash
xattr -cr ~/Downloads/Figent-*.dmg
```

**Option B — already installed:** remove the flag from the app directly:
```bash
sudo xattr -rd com.apple.quarantine /Applications/Figent.app
```

You do **not** need to disable Gatekeeper or change any system settings.

**Plugin says it can't connect?**
Make sure the bridge app is running and its menubar icon is visible. The plugin communicates via `localhost:9528`.

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
