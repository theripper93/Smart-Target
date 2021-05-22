Hooks.on("init", () => {

    game.settings.register('smartTarget', 'altTarget', {
		name: 'Target with Alt-Click',
		hint: 'Target tokens by pressing Alt+Click, add Shift to target multiple',
		scope: 'client',
		config: true,
		default: true,
		type: Boolean,
	});

    game.settings.register('smartTarget', 'portraitPips', {
		name: 'Show portraits instead of colors as player target indicators',
		hint: 'Uses avatar for GM, defaults to Token for players if no avatar is found for the assigned actor (requires refresh)',
		scope: 'world',
		config: true,
		default: false,
		type: Boolean,
        onChange: settings => window.location.reload()
	});

    game.settings.register("smartTarget", "pipImgScale", {
      name: "Target Icon Image Scale",
      hint: "Set the scale for the image used by the target icons (default: 1)",
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

    game.settings.register("smartTarget", "pipOffsetManualY", {
        name: "Target Image Y Offset",
        hint: "Add a flat offset to the image in pixels (default: 0)",
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

      game.settings.register("smartTarget", "pipOffsetManualX", {
        name: "Target Image X Offset",
        hint: "Add a flat offset to the image in pixels (default: 0)",
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

    game.settings.register("smartTarget", "pipScale", {
      name: "Target Icon Size",
      hint: "Set the size for the target icon in pixels (default: 12)",
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

    game.settings.register("smartTarget", "pipOffset", {
      name: "Target Icon Offset",
      hint: "Set the distance between icons in pixels (default: 16)",
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
    
    if(game.settings.get('smartTarget', 'portraitPips'))libWrapper.register("smartTarget","Token.prototype._refreshTarget", _refreshTarget, "OVERRIDE")
})