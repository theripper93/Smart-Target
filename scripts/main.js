const SMARTTARGET_MODULE_NAME = "smarttarget";

Hooks.on("init", () => {
  game.smartTarget = {
    altModifier : false,
  };
  game.settings.register(SMARTTARGET_MODULE_NAME, "targetingMode", {
    name: game.i18n.localize("smarttarget.settings.targetingMode.name"),
    hint: game.i18n.localize("smarttarget.settings.targetingMode.hint"),
    scope: "client",
    config: true,
    default: 1,
    type: Number,
    choices: {
      0: game.i18n.localize("smarttarget.settings.targetingMode.opt0"),
      1: game.i18n.localize("smarttarget.settings.targetingMode.opt1"),
      2: game.i18n.localize("smarttarget.settings.targetingMode.opt2"),
    },
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "release", {
		name: game.i18n.localize("smarttarget.settings.releaseBehaviour.name"),
		hint: game.i18n.localize("smarttarget.settings.releaseBehaviour.hint"),
		scope: "client",
		config: true,
		default: 0,
		type: Number,
		choices: {
			0: game.i18n.localize("smarttarget.settings.releaseBehaviour.choice0.Standard"),
			1: game.i18n.localize("smarttarget.settings.releaseBehaviour.choice0.Sticky")
		}
  });
  
  game.settings.register(SMARTTARGET_MODULE_NAME, "templateTargeting", {
    name: game.i18n.localize("smarttarget.settings.templateTargeting.name"),
    hint: game.i18n.localize("smarttarget.settings.templateTargeting.hint"),
    scope: "world",
    config: true,
    default: true,
    type: Number,
    choices: {
      0: game.i18n.localize("smarttarget.settings.templateTargeting.choice0.No"),
      1: game.i18n.localize("smarttarget.settings.templateTargeting.choice1.Half"),
      2: game.i18n.localize("smarttarget.settings.templateTargeting.choice2.Any")
    }
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

  game.settings.register(SMARTTARGET_MODULE_NAME, "useTokenGm", {
    name: game.i18n.localize("smarttarget.settings.useTokenGm.name"),
    hint: game.i18n.localize("smarttarget.settings.useTokenGm.hint"),
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: game.i18n.localize("smarttarget.settings.useTokenGm.opt0"),
      1: game.i18n.localize("smarttarget.settings.useTokenGm.opt1"),
      2: game.i18n.localize("smarttarget.settings.useTokenGm.opt2"),
    },
  });

  game.settings.register(SMARTTARGET_MODULE_NAME, "pipPosition", {
    name: game.i18n.localize("smarttarget.settings.pipPosition.name"),
    hint: game.i18n.localize("smarttarget.settings.pipPosition.hint"),
    scope: "world",
    config: true,
    default: "topleft",
    type: String,
    choices: {
      "topleft": game.i18n.localize("smarttarget.settings.pipPosition.topleft"),
      "topright": game.i18n.localize("smarttarget.settings.pipPosition.topright"),
      "bottomleft": game.i18n.localize("smarttarget.settings.pipPosition.bottomleft"),
      "bottomright": game.i18n.localize("smarttarget.settings.pipPosition.bottomright"),
      "centertop": game.i18n.localize("smarttarget.settings.pipPosition.centertop"),
      "centerbottom": game.i18n.localize("smarttarget.settings.pipPosition.centerbottom"),
      "random": game.i18n.localize("smarttarget.settings.pipPosition.random"),
    },
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

  game.settings.register(SMARTTARGET_MODULE_NAME, "crossairColor", {
    name: game.i18n.localize("smarttarget.settings.crossairColor.name"),
    hint: game.i18n.localize("smarttarget.settings.crossairColor.hint"),
    scope: "client",
    config: true,
    type: String,
    default: "",
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
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  libWrapper.register(SMARTTARGET_MODULE_NAME,"Token.prototype._refreshTarget", SmartTarget._refreshTarget, "MIXED");
  libWrapper.register(SMARTTARGET_MODULE_NAME, "Token.prototype._onClickLeft", SmartTarget._tokenOnClickLeft, "MIXED");
  libWrapper.register(SMARTTARGET_MODULE_NAME, "TokenLayer.prototype._onClickLeft", SmartTarget.canvasOnClickLeft, "WRAPPER");
  libWrapper.register(SMARTTARGET_MODULE_NAME, "Token.prototype._canControl", SmartTarget._canControl, "MIXED");
  
  Hooks.on("getSceneControlButtons", function(controls) {

    let control = controls.find(c => c.name === 'token') || controls[0];

    control.tools.push({
        name: 'clearTargets',
        title: game.i18n.localize("smarttarget.controls.cleartargets.name"),
        icon:'fa fa-times-circle',
        button:true,
        onClick: () => {
          canvas.tokens.placeables[0]?.setTarget(false, { releaseOthers: true });
        },
        layer: 'TokenLayer'
    });
  },);

  const {SHIFT, CONTROL, ALT} = KeyboardManager.MODIFIER_KEYS;
  game.keybindings.register(SMARTTARGET_MODULE_NAME, "altKey", {
    name: game.i18n.localize("smarttarget.keybindings.altkey"),
    editable: [
      {key: "AltLeft"},
      {key: "AltRight"},
    ],
    onDown: () => {game.smartTarget.altModifier = true;},
    onUp: () => {game.smartTarget.altModifier = false;},
});

game.keybindings.register(SMARTTARGET_MODULE_NAME, "clearAllTargets", {
  name: game.i18n.localize("smarttarget.keybindings.clearAllTargets"),
  editable: [
    {key: "KeyC", modifiers: [ ALT ]}
  ],
  onDown: () => {canvas.tokens.placeables[0]?.setTarget(false, { releaseOthers: true });},
});


});

