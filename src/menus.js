import { getMenuItems } from './storage.js';

// Rebuilds can be requested concurrently (e.g. onInstalled and storage.onChanged on a
// fresh install). Run them one at a time, otherwise both create the same menu id.
let pendingRebuild = Promise.resolve();

export function createContextMenus() {
  pendingRebuild = pendingRebuild.then(rebuildContextMenus);
  return pendingRebuild;
}

async function rebuildContextMenus() {
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
          console.error(`Failed to create menu item ${item.id}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error('Failed to create context menus:', error.message);
  }
}
