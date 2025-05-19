chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyAsMarkdownTitleHighlight",
    title: "Copy as Markdown Title Highlight",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyAsMarkdownTitleHighlight" && info.selectionText) {
    const markdownLink = `[${info.selectionText}](${tab.url})`;

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
