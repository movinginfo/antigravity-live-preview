# Antigravity Live Preview & Element Inspector 🚀

> **Cursor-style Interactive Browser Preview with One-Click Element Picker (`↖`) for Google Antigravity.**

An official-grade plugin for **Google Antigravity** that brings real-time visual inspection, device emulation, and automated element selection to any web project without manual `F12` or `Copy selector` hassles.

---

## ✨ Features

- **🎯 One-Click Element Inspector (`↖`)**: Click on any button, card, header, or input to automatically capture its component name, CSS selector, and DOM context straight to your clipboard.
- **🔄 Universal Compatibility**: Works seamlessly with **React, Vue, Next.js, PHP, Laravel, HTML, Svelte, Vite, Webpack**, or any local dev server (`localhost`).
- **📱 Responsive Device Mode**: Instantly toggle between desktop and mobile viewport previews (`📱`).
- **⚡ In-Editor & External Browser**: Open as an in-editor Antigravity Artifact or preview in Chrome/Edge with one click.
- **🧩 Zero Code Changes**: Does not modify or pollute your production codebase.

---

## 📦 Installation

### Option 1: Global Plugin (Recommended — Works across all projects)
Clone this repository directly into your Antigravity global plugins directory:

```bash
# Windows PowerShell
git clone https://github.com/movinginfo/antigravity-live-preview.git "$env:USERPROFILE\.gemini\config\plugins\antigravity-live-preview"

# macOS / Linux
git clone https://github.com/movinginfo/antigravity-live-preview.git ~/.gemini/config/plugins/antigravity-live-preview
```

Antigravity will automatically detect the plugin, register the `live-preview` skill, and activate the visual inspection rules across all current and future projects.

---

### Option 2: Project-Specific Plugin
To share this workflow with your team in a specific repository:

```bash
mkdir -p .agents/plugins
git clone https://github.com/movinginfo/antigravity-live-preview.git .agents/plugins/antigravity-live-preview
```

Commit the `.agents/` folder to version control.

---

## 🚀 How to Run in Any Project

1. **Start your project dev server** in terminal:
   ```bash
   npm run dev
   # or: php -S localhost:8000, python -m http.server, etc.
   ```

2. **Ask Antigravity to launch preview**:
   In the chat canvas, simply say:
   > *"Open preview"* or *"Preview this project"*

3. **Inspect and edit elements visually**:
   - The interactive preview window will open in your Antigravity **Artifacts** pane (or inline).
   - Click the **`↖`** pointer icon on the toolbar to activate the Inspector.
   - Click any element on your page.
   - The element details are **automatically copied to your clipboard**:
     ```text
     [Component: <WarehouseCard /> | Element: <button.btn-primary> | Text: "Create Warehouse" | Selector: #app > div > button]
     ```
   - Switch to the Antigravity chat, press **`Ctrl + V`**, and tell the AI what to change:
     > *"Make this button blue and add 8px padding"*

---

## 🌐 Chrome Extension Companion (Optional)

If you prefer inspecting inside your regular Chrome/Edge window alongside Antigravity:

1. Open `chrome://extensions` in Chrome or Edge.
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** (top-left).
4. Select the `extension` folder inside this repository:
   - Path: `~/.gemini/config/plugins/antigravity-live-preview/extension`
5. Now, every `localhost` site will automatically have a floating **`↖`** button in the corner, or you can hold **`Alt + Click`** on any element to instantly copy it for Antigravity!

---

## 📁 Repository Structure

```text
antigravity-live-preview/
├── plugin.json                 # Antigravity Plugin manifest
├── README.md                   # Documentation
├── LICENSE                     # MIT License
├── rules/
│   └── AGENTS.md               # Global agent rule for preview & visual editing
├── skills/
│   └── live-preview/
│       └── SKILL.md            # Procedure for generating interactive previews
├── templates/
│   └── preview.html            # Standalone Cursor-style Preview widget
└── extension/                  # Chrome Extension companion
    ├── manifest.json
    ├── content.js
    └── styles.css
```

---

## 📄 License

MIT License © 2026 movinginfo
