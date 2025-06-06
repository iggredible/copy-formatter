import { getMenuItems } from './storage.js';

export async function createContextMenus() {
  try {
    await new Promise((resolve) => {
      chrome.contextMenus.removeAll(() => {
        resolve();
      });
    });
    
    const menuItems = await getMenuItems();
    
    await new Promise((resolve, reject) => {
      chrome.contextMenus.create({
        id: "CopyFormatter",
        title: "Copy Formatter",
        contexts: ["selection"]
      }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });

    for (const item of menuItems) {
      if (item.enabled && item.name && item.id) {
        try {
          await new Promise((resolve, reject) => {
            chrome.contextMenus.create({
              id: item.id,
              parentId: "CopyFormatter",
              title: item.name,
              contexts: ["selection"]
            }, () => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve();
              }
            });
          });
        } catch (error) {
          console.error(`Failed to create menu item ${item.id}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Failed to create context menus:', error);
  }
}
