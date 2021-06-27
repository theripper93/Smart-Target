const SmartTarget = {

	getTemplateShape: function (template) {
		let shape = template.data.t;
		shape = shape[0].toUpperCase() + shape.substring(1);

		const fn = MeasuredTemplate.prototype[`_get${shape}Shape`];
		const dim = canvas.dimensions;
		let {direction, distance, angle, width} = template.data;

		distance *= (dim.size / dim.distance);
		width *= (dim.size / dim.distance);
		direction = Math.toRadians(direction);

		switch (shape) {
			case 'Circle': return fn.apply(template, [distance]);
			case 'Cone': return fn.apply(template, [direction, angle, distance]);
			case 'Rect': return fn.apply(template, [direction, distance]);
			case 'Ray': return fn.apply(template, [direction, distance, width]);
		}
	},

  init : function() {
    SmartTarget.releaseOthersMap = new WeakMap();
  },

  releaseOthersMap : {},

  tokenSetTarget : function (wrapped, ...args) {
    const releaseOthers = SmartTarget.releaseOthersMap.get(this);
    if (releaseOthers !== undefined) {
      args[1].releaseOthers = releaseOthers;
    }

    return wrapped(...args);
  },

  tokenOnClickLeft : function (wrapped, ...args) {
    const [ event ] = args;
    const oe = event.data.originalEvent;
    const tool = ui.controls.control.activeTool;

    if (oe.altKey) {
      ui.controls.control.activeTool = 'target';
    }

    if (ui.controls.control.activeTool === 'target') {
      SmartTarget.releaseOthersMap.set(this, SmartTarget.releaseBehaviour(oe));
    }

    wrapped(...args);

    SmartTarget.releaseOthersMap.delete(this);

    ui.controls.control.activeTool = tool;
  },

  tokenCanControl : function (wrapped, ...args) {
    const [, event] = args;

    if (!event) {
      return wrapped(...args);
    }

    const oe = event.data.originalEvent;
    const tool = ui.controls.control.activeTool;

    if (oe.altKey) {
      ui.controls.control.activeTool = 'target';
    }

    const canControl = wrapped(...args);

    ui.controls.control.activeTool = tool;

    return canControl;
  },

  tokenLayerTargetObjects : function (wrapped, ...args) {
    const releaseOthers = SmartTarget.releaseOthersMap.get(this);

    if (releaseOthers !== undefined) {
      args[1].releaseOthers = releaseOthers;
    }

    return wrapped(...args);
  },

  canvasOnClickLeft : function (wrapped, ...args) {
    const [ event ] = args;
    const oe = event.data.originalEvent;
    const tool = ui.controls.control.activeTool;
    const selectState = event.data._selectState;

    if (oe.altKey) {
      ui.controls.control.activeTool = 'target';
    }

    wrapped(...args);

    if (oe.altKey && selectState !== 2) {
      const {x: ox, y: oy} = event.data.origin;
      const templates = canvas.templates.objects.children.filter(template => {
        const {x: cx, y: cy} = template.center;
        return template.shape.contains(ox - cx, oy - cy);
      });

      SmartTarget.targetTokensInArea(templates, SmartTarget.releaseBehaviour(oe));
    }

    ui.controls.control.activeTool = tool;
  },

  canvasOnDragLeftDrop : function (wrapped, ...args) {
    const [ event ] = args;
    const oe = event.data.originalEvent;
    const tool = ui.controls.control.activeTool;
    const layer = canvas.activeLayer;

    if (oe.altKey) {
      ui.controls.control.activeTool = 'target';
    }

    if (ui.controls.control.activeTool === 'target') {
      SmartTarget.releaseOthersMap.set(layer, SmartTarget.releaseBehaviour(oe));
    }

    wrapped(...args);

    SmartTarget.releaseOthersMap.delete(layer);

    ui.controls.control.activeTool = tool;
  },

  templateLayerOnDragLeftDrop : function (wrapped, ...args) {
    const [ event ] = args;
    const object = event.data.preview;
    const oe = event.data.originalEvent;

    wrapped(...args);

    if (oe.altKey) {
      const template = new MeasuredTemplate(object.document);
      template.shape = SmartTarget.getTemplateShape(template);
      SmartTarget.targetTokensInArea([template], SmartTarget.releaseBehaviour(oe));
    }
  },

  keyboardManagerOnKeyC : function (wrapped, ...args) {
    const [,, modifiers] = args;

    if (!modifiers.isShift) {
      wrapped(...args);
    }
  },

	releaseBehaviour: function (oe) {
		const mode = game.settings.get(SMARTTARGET_MODULE_NAME, 'release');
		if (mode === 'sticky') {
			return !oe.shiftKey && !oe.altKey;
		}

		return !oe.shiftKey;
	},

	targetTokensInArea: function (templates, releaseOthers) {
		if (releaseOthers) {
			game.user.targets.forEach(token =>
				token.setTarget(false, {releaseOthers: false, groupSelection: true}));
		}

		canvas.tokens.objects.children.filter(token => {
			const {x: ox, y: oy} = token.center;
			return templates.some(template => {
				const {x: cx, y: cy} = template.center;
				return template.shape.contains(ox - cx, oy - cy);
			});
		}).forEach(token => token.setTarget(true, {releaseOthers: false, groupSelection: true}));
		game.user.broadcastActivity({targets: game.user.targets.ids});
	},

  /**
   * Adds the clear targets/selection button to the menu.
   * @param {array} controls -- the current controls hud array
   */
  getSceneControlButtonsHandler : function(controls) {

    let control = controls.find(c => c.name === 'token') || controls[0];

    control.tools.push({
        name: 'cancelTargets',
        title: 'Clear Targets/Selection',
        icon:'fa fa-times-circle',
        //visible: game.settings.get(SMARTTARGET_MODULE_NAME, 'XXX'),
        button:true,
        onClick: () => {
            control.activeTool = 'select';
            Hooks.call('clearTokenTargets',game.user,SmartTarget.clearTokenTargetsHandler(game.user, null));
            return;
        },
        layer: 'TokenLayer'
    });
  },

  /**
   * Button Handler to clear token targets & selections
   * @param {User} user              -- the user clearing the targets
   * @param {TokenLayer} tokenlayer  -- token layer
  */
  clearTokenTargetsHandler : function (user, tokenlayer) {
    user.targets.forEach(t => t.setTarget(false, {
        user: user,
        releaseOthers: true,
        groupSelection: false
    }));
    game.user.targets.clear();
    return true;
  },

  /**
   * Returns the selected token
   */
  getSelectedTokens : function() {
    // Get first token ownted by the player
    let selectedTokens = canvas.tokens.controlled;
    if(!selectedTokens || selectedTokens.length == 0){
      return null;
    }
    return selectedTokens;
  },

  /**
   * Creates a sprite from the selected avatar and positions around the container
   * @param {User} u -- the user to get
   * @param {int} i  -- the current row count
   * @param {Token} token -- PIXI.js container for height & width (the token)
   */
  getNPCIcon : function(u, i, token, target){

      let color = colorStringToHex(u.data.color); // Todo maybe we can add a new module settings for set the color of the npc hostile, neutral, friendly like in the module border control
      let circleR = game.settings.get(SMARTTARGET_MODULE_NAME, 'pipScale') || 12;
      let circleOffsetMult = game.settings.get(SMARTTARGET_MODULE_NAME, 'pipOffset') || 16;
      let scaleMulti = game.settings.get(SMARTTARGET_MODULE_NAME, 'pipImgScale') || 1;
      let insidePip = game.settings.get(SMARTTARGET_MODULE_NAME, 'insidePips') ? circleR : 0;
      let pTex = token.data.img;
      let texture = new PIXI.Texture.from(pTex);
      let newTexW = scaleMulti * (2 * circleR);
      let newTexH = scaleMulti * (2 * circleR);
      let borderThic = game.settings.get(SMARTTARGET_MODULE_NAME, 'borderThicc');
      let portraitCenterOffset =
        scaleMulti >= 1 ? (16 + circleR / 12) * Math.log2(scaleMulti) : 0;
      portraitCenterOffset +=
        game.settings.get(SMARTTARGET_MODULE_NAME, 'pipOffsetManualY') || 0;
      let portraitXoffset =
        game.settings.get(SMARTTARGET_MODULE_NAME, 'pipOffsetManualX') || 0;
      let matrix = new PIXI.Matrix(
        (scaleMulti * (2 * circleR + 2)) / texture.width,
        0,
        0,
        (scaleMulti * (2 * circleR + 2)) / texture.height,
        newTexW / 2 + 4 + i * circleOffsetMult + portraitXoffset+insidePip,
        newTexH / 2 + portraitCenterOffset+insidePip
      );
      target
        .beginFill(color)
        .drawCircle(2 + i * circleOffsetMult+insidePip, 0+insidePip, circleR)
        .beginTextureFill({
          texture: texture,
          alpha: 1,
          matrix: matrix,
        })
        .lineStyle(borderThic, 0x0000000)
        .drawCircle(2 + i * circleOffsetMult+insidePip, 0+insidePip, circleR)
        .endFill()
        .lineStyle(borderThic / 2, color)
        .drawCircle(2 + i * circleOffsetMult+insidePip, 0+insidePip, circleR);
    },

    _refreshTarget : function() {
      this.target.clear();
      if (!this.targeted.size) return;
    
      // Determine whether the current user has target and any other users
      const [others, user] = Array.from(this.targeted).partition(
        (u) => u === game.user
      );
      const userTarget = user.length;
    
      // For the current user, draw the target arrows
      if (userTarget) {
        let textColor = game.settings.get(SMARTTARGET_MODULE_NAME, 'crossairColor') ? game.settings.get(SMARTTARGET_MODULE_NAME, 'crossairColor').replace('#','0x') : 0xff9829;
    
        if (game.settings.get(SMARTTARGET_MODULE_NAME,'use-player-color')) {
          textColor = colorStringToHex(game.user['color']);
        }
    
        let p = game.settings.get(SMARTTARGET_MODULE_NAME, 'crossairSpread') ? -10 : 4;
        let aw = 12;
        let h = this.h;
        let hh = h / 2;
        let w = this.w;
        let hw = w / 2;
        let ah = canvas.dimensions.size / 3;
    
        let selectedIndicator = game.settings.get(SMARTTARGET_MODULE_NAME,'target-indicator');
        switch (selectedIndicator) {
          case '0':
              drawDefault(this, textColor, p, aw, h, hh, w, hw, ah);
              break;
          case '1':
              drawCrossHairs1(this, textColor, p, aw, h, hh, w, hw, ah);
              break;
          case '2':
              drawCrossHairs2(this, textColor, p, aw, h, hh, w, hw, ah);
              break;
          case '3':
              drawBullsEye1(this, textColor, p, aw, h, hh, w, hw, ah);
              break;
          case '4':
              drawBullsEye2(this, textColor, p, aw, h, hh, w, hw, ah);
              break;
          case '5':
              drawBetterTarget(this, textColor, p, aw, h, hh, w, hw, ah);
              break;
          default:
              drawDefault(this, textColor, p, aw, h, hh, w, hw, ah);
              break;
        }
    
      }
    
      // For other users, draw offset pips
      if(game.settings.get(SMARTTARGET_MODULE_NAME, 'portraitPips')){

        let index = 0;

        for (let [i, u] of others.entries()) {
          let color = colorStringToHex(u.data.color);
          let circleR = game.settings.get(SMARTTARGET_MODULE_NAME, 'pipScale') || 12;
          let circleOffsetMult = game.settings.get(SMARTTARGET_MODULE_NAME, 'pipOffset') || 16;
          let scaleMulti = game.settings.get(SMARTTARGET_MODULE_NAME, 'pipImgScale') || 1;
          let insidePip = game.settings.get(SMARTTARGET_MODULE_NAME, 'insidePips') ? circleR : 0
          let pTex 
          if(!u.isGM) pTex = game.settings.get(SMARTTARGET_MODULE_NAME, "useToken") ? u.character.data.token.img || u.character.data.img : u.character.data.img || u.character.data.token.img
          let texture = u.isGM
            ? new PIXI.Texture.from(u.avatar)
            : new PIXI.Texture.from(
              pTex
              );
          let newTexW = scaleMulti * (2 * circleR);
          let newTexH = scaleMulti * (2 * circleR);
          let borderThic = game.settings.get(SMARTTARGET_MODULE_NAME, 'borderThicc');
          let portraitCenterOffset =
            scaleMulti >= 1 ? (16 + circleR / 12) * Math.log2(scaleMulti) : 0;
          portraitCenterOffset +=
            game.settings.get(SMARTTARGET_MODULE_NAME, 'pipOffsetManualY') || 0;
          let portraitXoffset =
            game.settings.get(SMARTTARGET_MODULE_NAME, 'pipOffsetManualX') || 0;
          let matrix = new PIXI.Matrix(
            (scaleMulti * (2 * circleR + 2)) / texture.width,
            0,
            0,
            (scaleMulti * (2 * circleR + 2)) / texture.height,
            newTexW / 2 + 4 + i * circleOffsetMult + portraitXoffset+insidePip,
            newTexH / 2 + portraitCenterOffset+insidePip
          );
          this.target
            .beginFill(color)
            .drawCircle(2 + i * circleOffsetMult+insidePip, 0+insidePip, circleR)
            .beginTextureFill({
              texture: texture,
              alpha: 1,
              matrix: matrix,
            })
            .lineStyle(borderThic, 0x0000000)
            .drawCircle(2 + i * circleOffsetMult+insidePip, 0+insidePip, circleR)
            .endFill()
            .lineStyle(borderThic / 2, color)
            .drawCircle(2 + i * circleOffsetMult+insidePip, 0+insidePip, circleR);

            index = i;
        }
    
        let arrayTokens = SmartTarget.getSelectedTokens();
        if(arrayTokens){

          index = index + 1;

          for ( let [i, u] of arrayTokens.entries() ) {
            index = index + i;
            SmartTarget.getNPCIcon(game.user, index, u, this.target);
          }
        }
    
      }else{
        for ( let [i, u] of others.entries() ) {
          let color = colorStringToHex(u.data.color);
          this.target.beginFill(color, 1.0).lineStyle(2, 0x0000000).drawCircle(2 + (i * 8), 0, 6);
        }
      }   
    }

};




