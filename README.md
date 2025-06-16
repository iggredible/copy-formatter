# Copy Formatter

_Format your copy-pasted text._

## Download

[Chrome Web Store - Copy Formatter](https://chromewebstore.google.com/detail/copy-formatter/aaohndppjeceojnoajddihklghhmokbe)

## Why did I create this?

I use [Obsidian](https://obsidian.md/) and every time I want to create an external link, I have to:
1. select the text that I want to copy
2. copy it
3. get the URL
4. copy it
5. paste the text and surround it with `[]`
6. paste the URL and surround it with `()`

Only after running the above 6 steps I'd end up with `[text](some_url.com)`. The steps that I took are repetitive and can be automated. So I decided to create this browser extension so people no longer have to go through the same ordeal as I did.

I personally use this for taking Obsidian markdown notes, however if you:
- take markdown notes
- regularly need to format your copied text in a programmatic way

...then Copy Formatter may be perfect for you!

## What it does

Copy Formatter lets you format your recently copied text when you paste it.

### How to use Copy Formatter

1. Select the text you want to copy
2. Right click on the page, look for "Copy Formatter". It will show a list of available templates.
3. Select from one of the templates. For example, if you choose "Copy as Markdown Link" (one of the default templates), when you paste the text, it will be pasted as a markdown link.

### Using Copy Formatter mouseless for a complete mouseless note taking experience with Vimium

I am a Vim user and prefer to do things from my keyboard. I also use [Vimium](https://github.com/philc/vimium) to browse the web. In Vim, you can use registers with `"` (`:h quote` in Vim). Just as you can store many texts in different registers, I figure you should be able to select one of the templates using `"`. I made Copy Formatter callable with `"` in addition to right click. This (hopefully) gives you a more Vim-like experience!

Suppose that you're browsing a website: `https://daringfireball.net/projects/markdown/syntax#link`.  You see a body of text that you want to add to your notes. Let's say that you want to create an external link for the text: "Markdown supports two styles of links: inline and reference". Assuming you have Vimium installed, here's how you can take notes seamlessly without touching your mouse:

1. Search with Vimium's search operator (`/`).
2. Search for that text: `/Markdown supports two styles`.
3. Switch to [visual mode](https://github.com/philc/vimium/wiki/Visual-Mode) (`v`) + go to the end of the line (`$`), or you can just use the visual line mode (`V`).
4. Exit the visual mode (Copy Formatter doesn't work while you're still in Vimium's visual mode).
5. Press `"`. It will display a popup on the browser, showing a list of all different formats you can use to paste your text. You can traverse the list with the up/down arrows or `Ctrl-p` / `Ctrl-n`.
6. Choose the first one: "Copy as Markdown Link".
7. The text will be formatted in your clipboard as `[Markdown supports two styles of links: inline and reference.](https://daringfireball.net/projects/markdown/syntax#link)`. Neat!

## Add / Edit / Remove templates

Copy Formatter comes with predefined templates. They're configured for [Obsidian syntax](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown), but you can add / edit / remove them as needed. To do that, click on the Copy Formatter extension icon, select "Configure". You should see a list of all the available templates.

# License 

[MIT LICENSE](LICENSE)
