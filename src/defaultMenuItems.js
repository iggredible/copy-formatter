export const defaultMenuItems = [
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