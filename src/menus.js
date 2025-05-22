import { getMenuItems } from './storage.js';

export async function createContextMenus() {
  // Remove all existing menus first
  await chrome.contextMenus.removeAll();
  
  // Get menu items from storage
  const menuItems = await getMenuItems();
  
  // Create parent menu
  chrome.contextMenus.create({
    id: "selectForObsidian",
    title: "Select for Obsidian",
    contexts: ["selection"]
  });

  // Create submenu items for enabled items only
  menuItems.forEach(item => {
    if (item.enabled) {
      chrome.contextMenus.create({
        id: item.id,
        parentId: "selectForObsidian",
        title: item.name,
        contexts: ["selection"]
      });
    }
  });
}