import { createContextMenus } from './src/menus.js';
import { applyFormatter } from './src/formatters.js';
import { copyToClipboard } from './src/clipboard.js';
import { getMenuItems, setMenuItems } from './src/storage.js';
import { defaultMenuItems } from './src/defaultMenuItems.js';

chrome.runtime.onInstalled.addListener(async (details) => {
  // if (details.reason === 'install' || details.reason === 'update') {
  if (details.reason === 'install') {
    console.log('installing default menu items')
    // Initialize storage with defaults on install or update
    const existingMenuItems = await getMenuItems();
    
    // Only set if not already present
    if (existingMenuItems.length === 0) {
      await setMenuItems(defaultMenuItems);
    }
  }
  
  // Create context menus
  await createContextMenus();
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!info.selectionText) return;

  const formattedText = await applyFormatter(
    info.menuItemId,
    info.selectionText,
    tab.url,
    tab.title
  );

  copyToClipboard(tab, formattedText);
});

// Listen for storage changes to update menus
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.menuItems) {
    createContextMenus();
  }
});
