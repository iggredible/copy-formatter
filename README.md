# Copy Formatter
TODO: think of a catchier name

*Format your copy-pasted text.*

Do you often wish that you could paste your recently copied text differently? Do you use Markdown editor like Obsidian and want to quickly create an external links for the URL of the text that you just copied? Try Copy Formatter.

## Features

- Comes with some default formatting templates right out of the box that works with Obsidian (can be edited)
- Configurable templates
- Has access to most of Google Chrome public APIs (?)

TODO: list all other chrome public APIs that may be useful. How are they being used?

## What it does

It lets you to format a copy/paste text from a page. Select a body of text on the page. Right click on the page (it will show the Context Menu), look for "Copy Formatter", then select from one of the templates. For example, if you choose "Copy as Markdown Link" (one of the default templates), when you paste the text, it will be pasted as a markdown link.

To add / edit / remove the template, click on the Copy Formatter chrome extension icon, select "Configure". You should see a list of all the available templates. Feel free to change them

## Mouseless note taking with Vimium

Copy Formatter can also be triggered with `"` instead of right click. This gives you a more seamless experience if you're using other "mouseless" browsing chrome extension, like Vimium / Surfingkeys / Tridactyl.

TODO: Does it work with others like surfingkeys and tridactyl?

Here's how to use it with Vimium to copy a text without touching your mouse.

Suppose that you're on browsing a website (mouseless). https://daringfireball.net/projects/markdown/syntax#link.
You saw a body of text that you want to add to your notes. Let's say that you want to create an external link for the text: "Markdown supports two style of links: inline and reference." that links back to the URL.

1. Fire up Vimium's search `/`
2. Search for that text: `/Markdown supports two style`
3. Switch to [visual mode](https://github.com/philc/vimium/wiki/Visual-Mode) (`v`) + go to the end of the line (`$`), or you can just use the visual line mode
4. Exit the visual mode
5. Press `"`. It will display a popup on the browser, showing a list of all different formats you can use to paste your text.
6. Choose the first one, "Copy as Markdown Link".
7. It pastes the text as `[Markdown supports two style of links: inline and reference.](https://daringfireball.net/projects/markdown/syntax#link)`

Pretty cool!


## Install

TODO: link to chrome browser

# License 

TODO: add license
© 2025 Igor Irianto

MIT License.

TODO: clean up old references to selectForObsidian
TODO: add MIT license in the repo?
