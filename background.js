import { createContextMenus } from './src/menus.js';
import { applyFormatter } from './src/formatters.js';
import { copyToClipboard } from './src/clipboard.js';
import { getMenuItems, setMenuItems } from './src/storage.js';
import { defaultMenuItems } from './src/defaultMenuItems.js';

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('Copy Formatter: Installing default templates')
    const existingMenuItems = await getMenuItems();
    
    if (existingMenuItems.length === 0) {
      await setMenuItems(defaultMenuItems);
    }
  }
  
  await createContextMenus();
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!info.selectionText) return;

  const formattedText = await applyFormatter(info, tab);

  copyToClipboard(tab, formattedText);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.menuItems) {
    createContextMenus();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getMenuItems') {
    getMenuItems().then(menuItems => {
      sendResponse({ menuItems });
    });
    return true;
  }
  
  if (request.action === 'formatText') {
    const info = {
      menuItemId: request.itemId,
      selectionText: request.selectedText
    };
    const tab = {
      url: request.pageUrl,
      title: request.pageTitle
    };
    
    applyFormatter(info, tab).then(formattedText => {
      sendResponse({ formattedText });
    });
    return true;
  }
});
