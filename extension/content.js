// Antigravity Universal Element Inspector Content Script (English)

(function () {
  if (window.__AGY_INSPECTOR_INITIALIZED) return;
  window.__AGY_INSPECTOR_INITIALIZED = true;

  let isActive = false;
  let hoveredElement = null;

  // Create UI Elements
  const overlay = document.createElement('div');
  overlay.className = '__agy_overlay';
  document.documentElement.appendChild(overlay);

  const badge = document.createElement('div');
  badge.className = '__agy_badge';
  document.documentElement.appendChild(badge);

  const toast = document.createElement('div');
  toast.className = '__agy_toast';
  toast.innerHTML = '<span>🎯</span> <span><b>Copied for Antigravity!</b> Paste into chat (Ctrl+V)</span>';
  document.documentElement.appendChild(toast);

  const floatBtn = document.createElement('div');
  floatBtn.className = '__agy_float_btn';
  floatBtn.title = 'Antigravity Element Picker (Alt + Click)';
  floatBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
      <path d="m13 13 6 6"/>
    </svg>
  `;
  document.documentElement.appendChild(floatBtn);

  function showToast() {
    toast.classList.add('__agy_show');
    setTimeout(() => {
      toast.classList.remove('__agy_show');
    }, 2500);
  }

  function setActive(active) {
    isActive = active;
    if (isActive) {
      floatBtn.classList.add('__agy_active');
    } else {
      floatBtn.classList.remove('__agy_active');
      overlay.style.display = 'none';
      badge.style.display = 'none';
      hoveredElement = null;
    }
  }

  floatBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setActive(!isActive);
  });

  // Toggle with shortcut: Ctrl + Shift + X
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'x') {
      e.preventDefault();
      setActive(!isActive);
    } else if (e.key === 'Escape' && isActive) {
      setActive(false);
    }
  });

  // Calculate unique CSS Selector
  function getCssSelector(el) {
    if (!(el instanceof Element)) return '';
    if (el.id) return `#${el.id}`;

    const path = [];
    while (el && el.nodeType === Node.ELEMENT_NODE) {
      let selector = el.nodeName.toLowerCase();
      if (el.id) {
        selector += `#${el.id}`;
        path.unshift(selector);
        break;
      } else {
        let sibling = el;
        let nth = 1;
        while ((sibling = sibling.previousElementSibling)) {
          if (sibling.nodeName.toLowerCase() === selector) nth++;
        }
        if (nth !== 1) selector += `:nth-of-type(${nth})`;
      }
      path.unshift(selector);
      el = el.parentNode;
      if (el && el.tagName === 'BODY') break;
    }
    return path.join(' > ');
  }

  // Get React component name if available
  function getReactComponentName(el) {
    try {
      for (const key of Object.keys(el)) {
        if (key.startsWith('__reactFiber$') || key.startsWith('__reactInternalInstance$')) {
          let fiber = el[key];
          while (fiber) {
            if (fiber.type && typeof fiber.type === 'function') {
              const name = fiber.type.displayName || fiber.type.name;
              if (name && !name.startsWith('_') && name !== 'Anonymous') {
                return name;
              }
            }
            fiber = fiber.return;
          }
        }
      }
    } catch (_) {}
    return null;
  }

  // Update overlay position on mousemove
  window.addEventListener('mousemove', (e) => {
    if (!isActive) return;

    const target = e.target;
    if (!target || target.closest('.__agy_float_btn') || target.closest('.__agy_toast') || target === overlay || target === badge) {
      return;
    }

    hoveredElement = target;
    const rect = target.getBoundingClientRect();

    overlay.style.display = 'block';
    overlay.style.top = `${rect.top}px`;
    overlay.style.left = `${rect.left}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;

    // Update Badge
    const tag = target.tagName.toLowerCase();
    const id = target.id ? `#${target.id}` : '';
    const classes = Array.from(target.classList || [])
      .filter((c) => !c.startsWith('__agy_'))
      .slice(0, 2)
      .map((c) => `.${c}`)
      .join('');

    const comp = getReactComponentName(target);
    const compText = comp ? `[${comp}] ` : '';

    badge.innerHTML = `<span class="__agy_tag">${compText}&lt;${tag}&gt;</span>${id ? `<span class="__agy_id">${id}</span>` : ''}${classes ? `<span class="__agy_class">${classes}</span>` : ''}`;
    badge.style.display = 'block';

    let badgeTop = rect.top - 26;
    if (badgeTop < 0) badgeTop = rect.bottom + 6;
    badge.style.top = `${badgeTop}px`;
    badge.style.left = `${Math.max(4, rect.left)}px`;
  }, true);

  // Click to Select & Copy
  window.addEventListener('click', (e) => {
    const isAltClick = e.altKey;
    if (!isActive && !isAltClick) return;

    const target = e.target;
    if (!target || target.closest('.__agy_float_btn') || target.closest('.__agy_toast')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const tag = target.tagName.toLowerCase();
    const id = target.id ? `#${target.id}` : '';
    const classes = Array.from(target.classList || [])
      .filter((c) => !c.startsWith('__agy_'))
      .map((c) => `.${c}`)
      .join('');
    const selector = getCssSelector(target);

    // Text Content trimmed
    let text = (target.innerText || target.textContent || '').trim().replace(/\s+/g, ' ');
    if (text.length > 70) text = text.substring(0, 67) + '...';

    // Component name
    const comp = getReactComponentName(target);

    // Build payload
    const parts = [];
    if (comp) parts.push(`Component: <${comp} />`);
    parts.push(`Element: <${tag}${id}${classes ? ' ' + classes : ''}>`);
    if (text) parts.push(`Text: "${text}"`);
    if (selector) parts.push(`Selector: ${selector}`);

    const payload = `[${parts.join(' | ')}]`;

    // Copy to clipboard
    navigator.clipboard.writeText(payload).then(() => {
      showToast();
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = payload;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      showToast();
    });

    if (isActive) {
      setActive(false);
    }
  }, true);
})();
