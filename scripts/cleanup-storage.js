// steps
// 1. Go to chrome://extensions/
// 2. Find your extension and click "service worker" or "background page"
// 3. In the console, paste and run:
// await fetch(chrome.runtime.getURL('cleanup-storage.js')).then(r => r.text()).then(eval)
// This script removes old formatters from storage and migrates data to the new unified structure
// Run this in the Chrome extension's background page console

async function cleanupStorage() {
  console.log('Starting storage cleanup...');
  
  // Get current storage data
  const storageData = await chrome.storage.local.get(['menuItems', 'formatters']);
  
  console.log('Current storage:', storageData);
  
  // Remove formatters if they exist
  if (storageData.formatters) {
    console.log('Removing old formatters:', storageData.formatters);
    await chrome.storage.local.remove('formatters');
    console.log('Formatters removed');
  }
  
  // Check if menuItems need migration (old format has 'title' instead of 'name')
  if (storageData.menuItems && storageData.menuItems.length > 0) {
    const needsMigration = storageData.menuItems.some(item => 
      item.title && !item.name && !item.template
    );
    
    if (needsMigration) {
      console.log('Migrating old menuItems format...');
      
      // Import default menu items to get templates
      const defaultMenuItems = [
        {
          id: "copyAsMarkdownLink",
          name: "Copy as Markdown Link",
          template: "[{selectedText}]({pageUrl})",
          enabled: true
        },
        {
          id: "copyAsQuote",
          name: "Copy as Quote",
          template: "> {selectedText}\n> \n> — [{pageTitle}]({pageUrl})",
          enabled: true
        },
        {
          id: "copyAsHighlight",
          name: "Copy as Highlight",
          template: "=={selectedText}==\n\nSource: [{pageTitle}]({pageUrl})",
          enabled: true
        },
        {
          id: "copyAsCallout",
          name: "Copy as Callout",
          template: "> [!quote] {pageTitle}\n> {selectedText}\n> \n> [Link]({pageUrl})",
          enabled: true
        },
        {
          id: "copyWithPageTitle",
          name: "Copy with Page Title",
          template: "**{pageTitle}**\n\n{selectedText}\n\n[Source]({pageUrl})",
          enabled: true
        },
        {
          id: "copyAsFootnote",
          name: "Copy as Footnote",
          template: "{selectedText}[^1]\n\n[^1]: [{pageTitle}]({pageUrl})",
          enabled: true
        },
        {
          id: "copyPlainText",
          name: "Copy Plain Text",
          template: "{selectedText}",
          enabled: true
        }
      ];
      
      // Create a map of default items for easy lookup
      const defaultMap = {};
      defaultMenuItems.forEach(item => {
        defaultMap[item.id] = item;
      });
      
      // Migrate existing items
      const migratedItems = storageData.menuItems.map(oldItem => {
        const defaultItem = defaultMap[oldItem.id];
        return {
          id: oldItem.id,
          name: oldItem.title || oldItem.name || (defaultItem && defaultItem.name) || oldItem.id,
          template: oldItem.template || (defaultItem && defaultItem.template) || "{selectedText}",
          enabled: oldItem.enabled !== undefined ? oldItem.enabled : true
        };
      });
      
      console.log('Migrated items:', migratedItems);
      await chrome.storage.local.set({ menuItems: migratedItems });
      console.log('Migration complete');
    } else {
      console.log('Menu items are already in the correct format');
    }
  }
  
  // Clear and reinitialize if completely empty
  const finalData = await chrome.storage.local.get(['menuItems']);
  if (!finalData.menuItems || finalData.menuItems.length === 0) {
    console.log('Storage is empty, reinitializing with defaults...');
    // Force reinstall to trigger default initialization
    chrome.runtime.reload();
  }
  
  console.log('Cleanup complete!');
  console.log('Final storage:', await chrome.storage.local.get(['menuItems']));
}

// Run the cleanup
cleanupStorage();
