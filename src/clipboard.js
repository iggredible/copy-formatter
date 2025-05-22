export function copyToClipboard(tab, text) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: textToCopy => {
      navigator.clipboard.writeText(textToCopy)
        .then(() => console.log('Text copied to clipboard'))
        .catch(err => console.error('Failed to copy text: ', err));
    },
    args: [text]
  });
}