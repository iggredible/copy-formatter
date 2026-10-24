// A shortcut is stored as { code, ctrl, alt, shift, meta }. `code` is KeyboardEvent.code
// (physical key), because on macOS Option+c reports event.key as "ç".
const MODIFIER_CODES = new Set([
  'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight',
  'ShiftLeft', 'ShiftRight', 'MetaLeft', 'MetaRight'
]);

export function shortcutFromEvent(event) {
  if (MODIFIER_CODES.has(event.code)) return null;

  return {
    code: event.code,
    ctrl: event.ctrlKey,
    alt: event.altKey,
    shift: event.shiftKey,
    meta: event.metaKey
  };
}

// Without ctrl/alt/meta the shortcut would fire while typing normal text.
export function isValidShortcut(shortcut) {
  return Boolean(shortcut && shortcut.code && (shortcut.ctrl || shortcut.alt || shortcut.meta));
}

export function shortcutsEqual(a, b) {
  return Boolean(a && b) &&
    a.code === b.code &&
    Boolean(a.ctrl) === Boolean(b.ctrl) &&
    Boolean(a.alt) === Boolean(b.alt) &&
    Boolean(a.shift) === Boolean(b.shift) &&
    Boolean(a.meta) === Boolean(b.meta);
}

export function formatShortcut(shortcut) {
  if (!shortcut) return '';

  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const parts = [];
  if (shortcut.ctrl) parts.push('Ctrl');
  if (shortcut.alt) parts.push(isMac ? 'Option' : 'Alt');
  if (shortcut.shift) parts.push('Shift');
  if (shortcut.meta) parts.push(isMac ? 'Cmd' : 'Win');
  parts.push(shortcut.code.replace(/^Key/, '').replace(/^Digit/, ''));

  return parts.join(' + ');
}
