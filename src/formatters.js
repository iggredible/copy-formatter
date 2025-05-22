import { getMenuItemById } from './storage.js';

export async function applyFormatter(menuItemId, selectedText, pageUrl, pageTitle) {
  const menuItem = await getMenuItemById(menuItemId);
  
  if (!menuItem || !menuItem.template) {
    // Fallback to plain text if menu item not found
    return selectedText;
  }
  
  // Replace template variables
  return menuItem.template
    .replace(/{selectedText}/g, selectedText)
    .replace(/{pageUrl}/g, pageUrl)
    .replace(/{pageTitle}/g, pageTitle);
}