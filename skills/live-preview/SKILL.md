---
name: live-preview
description: Launches an interactive in-editor Browser Preview with Cursor-style Element Inspector (↖) for any local or remote web project. Use when the user requests a live preview, wants to inspect UI elements, or needs visual editing without manual selector copying.
---

# Live Preview & Visual Element Inspector Skill

This skill allows Antigravity to generate and embed an interactive in-app Browser Preview equipped with an element inspector tool (similar to Cursor / Claude Code preview).

## When to Use
- The user asks for a preview of the website/project.
- The user wants to point to elements visually and have the AI edit them.
- Any frontend task where visual inspection streamlines development.

## Implementation Details
1. Generate a self-contained HTML artifact (`preview.html`) in the artifact directory (`<appDataDir>/brain/<conversation-id>/preview.html`).
2. Embed the Cursor-style navigation and toolbar:
   - Navigation: Back, Forward, Reload.
   - Address Bar: Editable input (`Type a URL`) pre-filled with the active server URL (e.g. `http://localhost:5173`).
   - Tools:
     - `✏️` Annotations tool.
     - `↖` Element Inspector: Highlights elements under mouse and copies formatted element info (`[Element: ... | Text: ... | Selector: ...]`) directly to the clipboard on click.
     - `📱` Device emulation switcher.
3. Inform the user they can view the preview in the **Artifacts** side pane or inline, click `↖` to select any element, and paste directly into chat with `Ctrl + V`.
