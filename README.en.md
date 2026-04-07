# Claude Code in Figma

Run a full Claude Code terminal directly inside Figma.

> **Requirements:** macOS (Apple Silicon or Intel) · Figma desktop app · Claude Code CLI installed and authenticated

---

## Download

Go to **[Releases](../../releases/latest)** on the right and download the latest version. You need two files:

| File | Description |
|------|-------------|
| `Figent-x.x.x-arm64.dmg` | Local bridge app (menubar) |
| `figma-plugin-vx.x.x.zip` | Figma plugin files |

---

## Installation

### Step 1 — Install Claude Code CLI

If you haven't already, run this in your terminal:

```bash
npm install -g @anthropic-ai/claude-code
claude  # follow the login prompts
```

### Step 2 — Install the bridge app

1. Open the `.dmg` file and drag **Figent** into your Applications folder
2. Launch Figent — a menubar icon will appear in the top-right
3. Keep it running in the background

### Step 3 — Install the Figma plugin

1. Download and unzip `figma-plugin-vx.x.x.zip` anywhere (e.g. your Desktop)
2. Open the **Figma desktop app**
3. Go to **Menu → Plugins → Development → Import plugin from manifest…**
4. Select the `manifest.json` inside the unzipped folder

### Step 4 — Run

Make sure Figent is running, then in Figma:

**Plugins → Development → Claude Code in Figma**

A terminal panel opens inside Figma, connected to Claude Code.

---

## FAQ

**macOS says the app is damaged or from an unidentified developer?**
This is a macOS security restriction, not actual damage. To fix it:
1. Open **System Settings → Privacy & Security**
2. Find the blocked app notice and click **"Open Anyway"**

Or run this in Terminal to allow apps from any source:
```bash
sudo spctl --master-disable
```
Then go to **System Settings → Privacy & Security → Allow applications from** and select "Anywhere".

**Plugin says it can't connect?**
Make sure Figent (the bridge app) is running and its menubar icon is visible. The plugin communicates via `localhost:9528`.

**macOS only?**
Yes, for now. Windows support is not available yet.

**Is my code sent to any server?**
No. The bridge app only connects to local `localhost:9528`. Everything stays on your machine.

---

## Feedback

[Open an Issue](../../issues) · [Download stats](../../releases)
