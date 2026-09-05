# Antigravity Live Preview & Element Inspector Rules

When working on web applications (React, Vue, PHP, HTML, Next.js, etc.) and the user asks to preview the project, test the UI, or inspect and edit elements visually:

## 1. Universal Browser Preview Workflow
1. Detect or verify the active dev server URL (e.g., `http://localhost:5173`, `http://localhost:3000`, `http://localhost:8000`).
2. Provide an interactive Browser Preview artifact or embed that includes:
   - Top navigation bar with URL input, refresh, and back/forward buttons.
   - Cursor-style Element Inspector tool (`↖` pointer icon) that highlights elements on hover and copies formatted selectors and component context on click.
   - Responsive device toggle (`📱` mobile / desktop).
3. When the user pastes an element description (e.g., `[Компонент: ... | Елемент: ... | Селектор: ...]`), locate the matching component or template in the project codebase and apply edits directly using `replace_file_content`.
