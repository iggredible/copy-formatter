export async function getMenuItems() {
  const result = await chrome.storage.local.get(['menuItems']);
  return result.menuItems || [];
}

export async function setMenuItems(items) {
  await chrome.storage.local.set({ menuItems: items });
}

export async function updateMenuItem(itemId, updates) {
  const items = await getMenuItems();
  const index = items.findIndex(item => item.id === itemId);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    await setMenuItems(items);
  }
}

export async function getMenuItemById(itemId) {
  const items = await getMenuItems();
  return items.find(item => item.id === itemId);
}