import { getMenuItems } from './storage.js';

export async function createContextMenus() {
  // Remove all existing menus first
  await chrome.contextMenus.removeAll();
  
  // Get menu items from storage
  const menuItems = await getMenuItems();
  
  // Create parent menu
  chrome.contextMenus.create({
    id: "selectForObsidian",
    title: "Copy Formatter",
    contexts: ["selection"]
  });

  // Create submenu items for enabled items only
  menuItems.forEach(item => {
    if (item.enabled && item.name && item.id) {
      try {
        chrome.contextMenus.create({
          id: item.id,
          parentId: "selectForObsidian",
          title: item.name,
          contexts: ["selection"]
        });
      } catch (error) {
        console.error(`Failed to create menu item ${item.id}:`, error);
      }
    }
  });
}
