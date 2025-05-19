// Create a context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyAsMarkdownTitleHighlight",
    title: "Copy as Markdown Title Highlight",
    contexts: ["selection"]
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyAsMarkdownTitleHighlight" && info.selectionText) {
    const markdownLink = `[${info.selectionText}](${tab.url})`;
    
    // Execute script in the current tab to copy text to clipboard
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: textToCopy => {
        navigator.clipboard.writeText(textToCopy)
          .then(() => console.log('Text copied to clipboard'))
          .catch(err => console.error('Failed to copy text: ', err));
      },
      args: [markdownLink]
    });
  }
});
