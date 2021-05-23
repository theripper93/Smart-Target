/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module
 */

const MODULE_NAME = 'smarttarget';

// Import JavaScript modules

// Import TypeScript modules

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.on("init", () => {

  game.settings.register("smarttarget", 'altTarget', {
  name: game.i18n.localize("smarttarget.settings.altTarget.name"),
  hint: game.i18n.localize("smarttarget.settings.altTarget.hint"),
  scope: 'client',
  config: true,
  default: true,
  type: Boolean,
});

  game.settings.register("smarttarget", 'portraitPips', {
  name: game.i18n.localize("smarttarget.settings.portraitPips.name"),
  hint: game.i18n.localize("smarttarget.settings.portraitPips.hint"),
  scope: 'world',
  config: true,
  default: false,
  type: Boolean,
      onChange: settings => window.location.reload()
});

  game.settings.register("smarttarget", "pipImgScale", {
    name: game.i18n.localize("smarttarget.settings.pipImgScale.name"),
    hint: game.i18n.localize("smarttarget.settings.pipImgScale.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: {
      min: 0.05,
      max: 10,
      step: 0.05,
    },
    default: 1,
  });

  game.settings.register("smarttarget", "pipOffsetManualY", {
      name: game.i18n.localize("smarttarget.settings.pipOffsetManualY.name"),
      hint: game.i18n.localize("smarttarget.settings.pipOffsetManualY.hint"),
      scope: "world",
      config: true,
      type: Number,
      range: {
        min: 0,
        max: 100,
        step: 0.05,
      },
      default: 0,
    });

    game.settings.register("smarttarget", "pipOffsetManualX", {
      name: game.i18n.localize("smarttarget.settings.pipOffsetManualX.name"),
      hint: game.i18n.localize("smarttarget.settings.pipOffsetManualX.hint"),
      scope: "world",
      config: true,
      type: Number,
      range: {
        min: 0,
        max: 100,
        step: 0.05,
      },
      default: 0,
    });

  game.settings.register("smarttarget", "pipScale", {
    name: game.i18n.localize("smarttarget.settings.pipScale.name"),
    hint: game.i18n.localize("smarttarget.settings.pipScale.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: {
      min: 0.05,
      max: 100,
      step: 0.05,
    },
    default: 12,
  });

  game.settings.register("smarttarget", "pipOffset", {
    name: game.i18n.localize("smarttarget.settings.pipOffset.name"),
    hint: game.i18n.localize("smarttarget.settings.pipOffset.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: {
      min: 0.05,
      max: 100,
      step: 0.05,
    },
    default: 16,
  });

  game.settings.register("smarttarget", "borderThicc", {
    name: game.i18n.localize("smarttarget.settings.borderThicc.name"),
    hint: game.i18n.localize("smarttarget.settings.borderThicc.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: {
      min: 2,
      max: 10,
      step: 1,
    },
    default: 2,
  });

  game.settings.register("smarttarget", "crossairSpread", {
    name: game.i18n.localize("smarttarget.settings.crossairSpread.name"),
    hint: game.i18n.localize("smarttarget.settings.crossairSpread.hint"),
    scope: 'client',
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register("smarttarget", "crossairColor", {
    name: game.i18n.localize("smarttarget.settings.crossairColor.name"),
    hint: game.i18n.localize("smarttarget.settings.crossairColor.hint"),
    scope: "client",
    config: true,
    type: String,
    // MOVE TO READY HOOK ???
    //default: colorStringToHex(game.user['color'])
    default: "#ff9829"
  });

  game.settings.register("smarttarget",'target-indicator',{
    name: game.i18n.localize("smarttarget.settings.target-indicator.name"),
    hint: game.i18n.localize("smarttarget.settings.target-indicator.hint"),
    scope: "player",
    config: true,
    default: "0",
    type: String,
    choices: {
        "0" : game.i18n.localize("smarttarget.settings.target-indicator-choices-0"),
        "1" : game.i18n.localize("smarttarget.settings.target-indicator-choices-1"),
        "2" : game.i18n.localize("smarttarget.settings.target-indicator-choices-2"),
        "3" : game.i18n.localize("smarttarget.settings.target-indicator-choices-3"),
        "4" : game.i18n.localize("smarttarget.settings.target-indicator-choices-4"),
        "5" : game.i18n.localize("smarttarget.settings.target-indicator-choices-5"),
    }
  });

  game.settings.register("smarttarget",'use-player-color', {
    name : game.i18n.localize("smarttarget.settings.use-player-color.name"),
    hint : game.i18n.localize("smarttarget.settings.use-player-color.hint"),
    scope: "player",
    config: true,
    default: true,
    type: Boolean
  });

    
  //if(game.settings.get("smarttarget", "portraitPips")){
    libWrapper.register("smarttarget","Token.prototype._refreshTarget", _refreshTarget, "OVERRIDE")
  //}

  Hooks.on("getSceneControlButtons",getSceneControlButtonsHandler);
})

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
	// Do anything after initialization but before ready

});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', () => {
	// Do anything once the module is ready
  
});

// Add any additional hooks if necessary

