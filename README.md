# Chrome Extension Manager

Created by: Preet Patel

## Description
A Chrome extension that allows users to enable or disable other extensions via keyboard shortcuts

## Features
- Toggle extensions on and off using keyboard shortcuts
    - Default: `Ctrl+Shift+E`
- User-friendly popup for managing extension IDs

## Installation
1. Clone this repository
2. Go to `chrome://extensions/` in Chrome
3. Enable "Developer Mode"
4. Click "Load unpacked" and select the extension directory

## Usage
1. Determine which extension you would like to toggle on/off
2. Copy the `Extension ID` to clipboard
    - the extension ID is visible with "Developer Mode" and is a 32 character string
3. On Chrome, click the "Puzzle Icon" to bring up Chrome Extensions Menu
4. Paste the `Extension ID` into the prompt
5. Test to see if operational
    - In `chrome://extensions/`, utitlize the keyboard shortcut, `Ctrl+Shift+E` by default
    - The chosen extension's "Toggle Icon" should be toggling
6. If you wish to stop using the Extension Manager, simply turn off the extension off in `chrome://extensions/` by toggling the "Toggle Icon" underneath `Extension Manager`