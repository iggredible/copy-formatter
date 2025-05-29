import { getMenuItemById } from './storage.js';

export async function applyFormatter(info, tab) {
  const menuItem = await getMenuItemById(info.menuItemId);
  
  if (!menuItem || !menuItem.template) {
    return info.selectionText;
  }
  
  return menuItem.template
    .replace(/{selectedText}/g, info.selectionText)
    .replace(/{pageUrl}/g, tab.url)
    .replace(/{pageTitle}/g, tab.title);
}
