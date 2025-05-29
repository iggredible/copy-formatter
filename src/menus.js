import { getMenuItems } from './storage.js';

export async function createContextMenus() {
  await chrome.contextMenus.removeAll();
  
  const menuItems = await getMenuItems();
  
  chrome.contextMenus.create({
    id: "CopyFormatter",
    title: "Copy Formatter",
    contexts: ["selection"]
  });

  menuItems.forEach(item => {
    if (item.enabled && item.name && item.id) {
      try {
        chrome.contextMenus.create({
          id: item.id,
          parentId: "CopyFormatter",
          title: item.name,
          contexts: ["selection"]
        });
      } catch (error) {
        console.error(`Failed to create menu item ${item.id}:`, error);
      }
    }
  });
}
