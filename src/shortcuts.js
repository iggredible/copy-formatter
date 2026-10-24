// A shortcut is stored as { code, ctrl, alt, shift, meta }. `code` is KeyboardEvent.code
// (physical key), because on macOS Option+c reports event.key as "ç".
// `meta` is the Cmd key on macOS, the Windows key on Windows and Super on Linux.
const MODIFIER_CODES = new Set([
  'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight',
  'ShiftLeft', 'ShiftRight', 'MetaLeft', 'MetaRight'
]);

export function getPlatform() {
  const platform = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();

  if (platform.includes('mac')) return 'mac';
  if (platform.includes('win')) return 'windows';
  return 'other';
}

const MODIFIER_LABELS = {
  mac: { ctrl: 'Ctrl', alt: 'Option', shift: 'Shift', meta: 'Cmd' },
  windows: { ctrl: 'Ctrl', alt: 'Alt', shift: 'Shift', meta: 'Win' },
  other: { ctrl: 'Ctrl', alt: 'Alt', shift: 'Shift', meta: 'Super' }
};

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

// Without a "command" modifier the shortcut would fire while typing normal text.
// Cmd counts on macOS, but on Windows/Linux the Win/Super key is mostly claimed by the
// OS, so there it only counts as an add-on to Ctrl or Alt.
export function isValidShortcut(shortcut, platform = getPlatform()) {
  if (!shortcut || !shortcut.code) return false;

  return platform === 'mac'
    ? Boolean(shortcut.ctrl || shortcut.alt || shortcut.meta)
    : Boolean(shortcut.ctrl || shortcut.alt);
}

export function shortcutRequirementHint(platform = getPlatform()) {
  switch (platform) {
    case 'mac': return 'Include Ctrl, Option or Cmd so it does not trigger while typing';
    case 'windows': return 'Include Ctrl or Alt (the Win key alone is reserved by Windows)';
    default: return 'Include Ctrl or Alt (the Super key alone is reserved by your desktop)';
  }
}

export function shortcutsEqual(a, b) {
  return Boolean(a && b) &&
    a.code === b.code &&
    Boolean(a.ctrl) === Boolean(b.ctrl) &&
    Boolean(a.alt) === Boolean(b.alt) &&
    Boolean(a.shift) === Boolean(b.shift) &&
    Boolean(a.meta) === Boolean(b.meta);
}

export function formatShortcut(shortcut, platform = getPlatform()) {
  if (!shortcut) return '';

  const labels = MODIFIER_LABELS[platform];
  const parts = [];
  if (shortcut.ctrl) parts.push(labels.ctrl);
  if (shortcut.alt) parts.push(labels.alt);
  if (shortcut.shift) parts.push(labels.shift);
  if (shortcut.meta) parts.push(labels.meta);
  parts.push(shortcut.code.replace(/^Key/, '').replace(/^Digit/, ''));

  return parts.join(' + ');
}
