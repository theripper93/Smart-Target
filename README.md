# Smart-Target

![Latest Release Download Count](https://img.shields.io/github/downloads/theripper93/Smart-Target/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge) [![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fsmarttarget&colorB=03ff1c&style=for-the-badge)](https://forge-vtt.com/bazaar#package=smarttarget) ![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftheripper93%2FSmart-Target%2Fmain%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange&style=for-the-badge) [![alt-text](https://img.shields.io/badge/-Patreon-%23ff424d?style=for-the-badge)](https://www.patreon.com/theripper93) [![alt-text](https://img.shields.io/badge/-Discord-%235662f6?style=for-the-badge)](https://discord.gg/F53gBjR97G)

## Features

1. Target with Alt+Click
2. For players, target by just left clicking a non-owned token (Alt+Click to target owned token)
3. Target all tokens in a template by Alt+Clicking the template (shift modifier and standard\sticky behaviour apply)
4. Show portraits instead of colored pips to indicate targets, positioning\offset and size of the icons can be configured in the module settings
5. Customize color\shape of the targeting reticule

<img src="./wiki/smartTarget.jpg" width="300" height="300"><img src="./wiki/targetoptions.jpg" height="300">

## Installation

It's always easiest to install modules from the in game add-on browser.

To install this module manually:
1.  Inside the Foundry "Configuration and Setup" screen, click "Add-on Modules"
2.  Click "Install Module"
3.  In the "Manifest URL" field, paste the following url:
`https://raw.githubusercontent.com/theripper93/Smart-Target/main/module.json`
4.  Click 'Install' and wait for installation to complete
5.  Don't forget to enable the module in game using the "Manage Module" button

## Settings

- **Targeting Mode:** 
  - Default: Default foundry behaviour. 
  - Alt-click: Target tokens by pressing Alt+Click, add Shift to target multiple. 
  - Always Target: Clicking on non-owned tokens automatically targets them"

-  **Release Behaviour:** This setting determines how refresh target behaves when clicking multiple tokens. 
   -  'Sticky' mode will target each clicked token without un-targeting anything, and you must click a token again to un-target it. 
   -  'Standard' mode more closely matches the standard foundry behaviour where all previous tokens are automatically un-targeted when clicking a new token, and you must hold Shift while clicking in order to target multiple tokens.

- **Show indicator portraits instead of colors:** Uses avatar for GM, defaults to Token for players if no avatar is found for the assigned actor (requires refresh)

- **Use Tokens instead of Avatars:** Use tokens instead of avatars for players target indicators

- **Gm image:** The image to use on indicator portraits for the GM
  - Player Avatar
  - Token Portrait
  - Token Image

- **Keep target indicators inside the token:** Move the target indicators in a way that they remain inside the token border

- **Target Icon Image Scale:** Set the scale for the image used by the target icons (default: 1)

- **Target Image Y Offset:** Add a flat offset to the image in pixels (default: 0)

- **Target Image X Offset:** Add a flat offset to the image in pixels (default: 0)

- **Target Icon Size:** Set the size for the target icon in pixels (default: 12)

- **Target Icon Offset:** Set the distance between icons in pixels (default: 16)

- **Border Thickness:** Set the thickness of the border in pixels (default: 2)

- **Bring Targeting Arrows Closer Together:** Bring the targeting arrows closer together so that they are inside the token frame

- **Targeting Arrows Color:** Hex color for the targeting arrows (default: #ff9829)

- **Target indicator:** Select the indicator for a targeted token
  - Default Foundry Indicator
  - CrossHair 1
  - CrossHair 2
  - BullsEye 1
  - BullsEye 2
  - Better Target

- **Use player color for target indicator:** Use player color for target indicator

### libWrapper

This module uses the [libWrapper](https://github.com/ruipin/fvtt-lib-wrapper) library for wrapping core methods. It is a hard dependency and it is recommended for the best experience and compatibility with other modules.

## [Changelog](https://github.com/theripper93/Smart-Target/releases/)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/theripper93/Smart-Target/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## Credit

Thanks to anyone who helps me with this code! I appreciate the user community's feedback on this project!

- [Better Target](https://github.com/sPOiDar/fvtt-module-better-target) thanks to [sPOiDar](https://github.com/sPOiDar/fvtt-module-better-target)
- [Target Enhancements](https://github.com/eadorin/target-enhancements) thanks to [eadorin](https://github.com/eadorin)