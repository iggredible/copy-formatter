export const defaultMenuItems = [
  {
    id: "copyAsMarkdownLink",
    name: "Copy as Markdown Link",
    template: "[{selectedText}]({pageUrl})",
    enabled: true
  },
  {
    id: "copyPlainText",
    name: "Copy Plain Text",
    template: "{selectedText}",
    enabled: true
  },
  {
    id: "copyAsQuote",
    name: "Copy as Quote",
    template: "> {selectedText}\n> \n> — [{pageTitle}]({pageUrl})",
    enabled: true
  },
  {
    id: "copyAsQuoteCallout",
    name: "Copy as Quote Callout",
    template: "> [!quote] {pageTitle}\n> {selectedText}\n> \n> [Source]({pageUrl})",
    enabled: true
  },
  {
    id: "copyAsFootnote",
    name: "Copy as Footnote",
    template: "{selectedText}[^1]\n\n[^1]: [{pageTitle}]({pageUrl})",
    enabled: true
  }
];
