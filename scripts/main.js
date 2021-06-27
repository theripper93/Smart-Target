const SMARTTARGET_MODULE_NAME = "smarttarget";

// Import JavaScript modules

// Import TypeScript modules

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.on("init", () => {
  game.settings.register(SMARTTARGET_MODULE_NAME, "altTarget", {
    name: game.i18n.localize("smarttarget.settings.altTarget.name"),
    hint: game.i18n.localize("smarttarget.settings.altTarget.hint"),
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
  });

  // hotkeys.registerShortcut({
	// 	name: SMARTTARGET_MODULE_NAME+".customHotKeyTarget", // <- Must be unique
	// 	label: game.i18n.localize("smarttarget.settings.customHotKeyTarget.name"),
	// 	get: () => game.settings.get(SMARTTARGET_MODULE_NAME, "customHotKeyTarget"),
	// 	set: async value => await game.settings.set(SMARTTARGET_MODULE_NAME, "customHotKeyTarget", value),
  //   scope: "client",
  //   config: true,
	// 	default: () => { return { key: null, alt: true, ctrl: false, shift: false }; },
	// 	onKeyDown: self => { customRefreshTarget(false); },
  //   type: String,
	// });

  // hotkeys.registerShortcut({
	// 	name: SMARTTARGET_MODULE_NAME+".customHotKeyTargetMulti", // <- Must be unique
	// 	label: game.i18n.localize("smarttarget.settings.customHotKeyTargetMulti.name"),
	// 	get: () => game.settings.get(SMARTTARGET_MODULE_NAME, "customHotKeyTargetMulti"),
	// 	set: async value => await game.settings.set(SMARTTARGET_MODULE_NAME, "customHotKeyTargetMulti", value),
  //   scope: "client",
  //   config: true,
	// 	default: () => { return { key: null, alt: true, ctrl: false, shift: true }; },
	// 	onKeyDown: self => { customRefreshTarget(true); },
  //   type: String,
	// });

  game.settings.register(SMARTTARGET_MODULE_NAME, "alwaysTarget", {
    name: game.i18n.localize("smarttarget.settings.alwaysTarget.name"),
    hint: game.i18n.localize("smarttarget.settings.alwaysTarget.hint"),
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "portraitPips", {
    name: game.i18n.localize("smarttarget.settings.portraitPips.name"),
    hint: game.i18n.localize("smarttarget.settings.portraitPips.hint"),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "useToken", {
    name: game.i18n.localize("smarttarget.settings.useToken.name"),
    hint: game.i18n.localize("smarttarget.settings.useToken.hint"),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "insidePips", {
    name: game.i18n.localize("smarttarget.settings.insidePips.name"),
    hint: game.i18n.localize("smarttarget.settings.insidePips.hint"),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "pipImgScale", {
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

  game.settings.register(SMARTTARGET_MODULE_NAME, "pipOffsetManualY", {
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

  game.settings.register(SMARTTARGET_MODULE_NAME, "pipOffsetManualX", {
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

  game.settings.register(SMARTTARGET_MODULE_NAME, "pipScale", {
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

  game.settings.register(SMARTTARGET_MODULE_NAME, "pipOffset", {
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

  game.settings.register(SMARTTARGET_MODULE_NAME, "borderThicc", {
    name: game.i18n.localize("smarttarget.settings.borderThicc.name"),
    hint: game.i18n.localize("smarttarget.settings.borderThicc.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: {
      min: 0,
      max: 10,
      step: 1,
    },
    default: 2,
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "crossairSpread", {
    name: game.i18n.localize("smarttarget.settings.crossairSpread.name"),
    hint: game.i18n.localize("smarttarget.settings.crossairSpread.hint"),
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "crossairColor", {
    name: game.i18n.localize("smarttarget.settings.crossairColor.name"),
    hint: game.i18n.localize("smarttarget.settings.crossairColor.hint"),
    scope: "client",
    config: true,
    type: String,
    default: "#ff9829",
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "target-indicator", {
    name: game.i18n.localize("smarttarget.settings.target-indicator.name"),
    hint: game.i18n.localize("smarttarget.settings.target-indicator.hint"),
    scope: "client",
    config: true,
    default: "0",
    type: String,
    choices: {
      0: game.i18n.localize("smarttarget.settings.target-indicator-choices-0"),
      1: game.i18n.localize("smarttarget.settings.target-indicator-choices-1"),
      2: game.i18n.localize("smarttarget.settings.target-indicator-choices-2"),
      3: game.i18n.localize("smarttarget.settings.target-indicator-choices-3"),
      4: game.i18n.localize("smarttarget.settings.target-indicator-choices-4"),
      5: game.i18n.localize("smarttarget.settings.target-indicator-choices-5"),
    },
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "use-player-color", {
    name: game.i18n.localize("smarttarget.settings.use-player-color.name"),
    hint: game.i18n.localize("smarttarget.settings.use-player-color.hint"),
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "release", {
		name: game.i18n.localize("smarttarget.settings.releaseBehaviour.name"),
		hint: game.i18n.localize("smarttarget.settings.releaseBehaviour.hint"),
		scope: "user",
		config: true,
		default: "sticky",
		type: String,
		choices: {
			"sticky": game.i18n.localize("smarttarget.settings.releaseBehaviour.choice0.Sticky"),
			"standard": game.i18n.localize("smarttarget.settings.releaseBehaviour.choice0.Standard")
		}
	});

  SmartTarget.init();

  libWrapper.register(SMARTTARGET_MODULE_NAME,"Token.prototype._refreshTarget", SmartTarget._refreshTarget, "OVERRIDE");

  libWrapper.register(SMARTTARGET_MODULE_NAME, "Token.prototype.setTarget", SmartTarget.tokenSetTarget, "WRAPPER");
  libWrapper.register(SMARTTARGET_MODULE_NAME, "Token.prototype._onClickLeft", SmartTarget.tokenOnClickLeft, "WRAPPER");
  libWrapper.register(SMARTTARGET_MODULE_NAME, "Token.prototype._canControl", SmartTarget.tokenCanControl, "WRAPPER");
  libWrapper.register(SMARTTARGET_MODULE_NAME, "TokenLayer.prototype.targetObjects", SmartTarget.tokenLayerTargetObjects, "WRAPPER");
  libWrapper.register(SMARTTARGET_MODULE_NAME, "Canvas.prototype._onClickLeft", SmartTarget.canvasOnClickLeft, "WRAPPER");
  libWrapper.register(SMARTTARGET_MODULE_NAME, "Canvas.prototype._onDragLeftDrop", SmartTarget.canvasOnDragLeftDrop, "WRAPPER");
  libWrapper.register(SMARTTARGET_MODULE_NAME, "TemplateLayer.prototype._onDragLeftDrop", SmartTarget.templateLayerOnDragLeftDrop, "WRAPPER");
  libWrapper.register(SMARTTARGET_MODULE_NAME, "KeyboardManager.prototype._onKeyC", SmartTarget.keyboardManagerOnKeyC, "MIXED");
  
  Hooks.on("getSceneControlButtons",  SmartTarget.getSceneControlButtonsHandler);
});

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once("setup", function () {
  // Do anything after initialization but before ready
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once("ready", () => {
  // Do anything once the module is ready
	if (!game.modules.get("lib-wrapper")?.active && game.user.isGM){
    ui.notifications.error(`The "${SMARTTARGET_MODULE_NAME}" module requires to install and activate the "libWrapper" module.`);
    return;
  }
  // if (!game.modules.get("lib-df-hotkey")?.active && game.user.isGM){
  //   ui.notifications.error(`The "${SMARTTARGET_MODULE_NAME}" module requires to install and activate the "lib-df-hotkey" module.`);
  //   return;
  // }
});

// Add any additional hooks if necessary

Hooks.on("hoverToken", (token, hovered) => {
  if (game.settings.get(SMARTTARGET_MODULE_NAME, "altTarget")) {
    if (keyboard._downKeys.has("Alt") && hovered) {
      if (ui.controls.control.activeTool != "target"){
        token.smarttargetPrev = ui.controls.control.activeTool;
      }
      ui.controls.control.activeTool = "target";
    } else if (!hovered) {
      if (token.smarttargetPrev) {
        ui.controls.control.activeTool = token.smarttargetPrev;
        token.smarttargetPrev = null;
      }
    }
  }

  if (game.settings.get(SMARTTARGET_MODULE_NAME, "alwaysTarget")) {
    if (!token.isOwner && hovered) {
      if (ui.controls.control.activeTool != "target"){
        token.smarttargetPrev = ui.controls.control.activeTool;
      }
      ui.controls.control.activeTool = "target";
    } else if (!hovered) {
      if (token.smarttargetPrev) {
        ui.controls.control.activeTool = token.smarttargetPrev;
        token.smarttargetPrev = null;
      }
    }
  }
});

document.addEventListener("keydown", event => {
	if ((event.altKey && event.key === "C") || (event.ctrlKey && event.key === "C")) {
		game.user.targets.forEach(token =>
			token.setTarget(false, {releaseOthers: false, groupSelection: true}));
		game.user.broadcastActivity({targets: game.user.targets.ids});
	}
});