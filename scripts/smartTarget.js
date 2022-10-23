class SmartTarget {

  static handleTargeting(token,shift) {
    const isTargeted = token.isTargeted;
    const release = shift ? !SmartTarget.settings().release : SmartTarget.settings().release;
    token.setTarget(!isTargeted, { releaseOthers: release });
  }

  static _tokenOnClickLeft(wrapped, ...args) {
    const mode = SmartTarget.settings().mode;
    switch (mode) {
      case 0:
        return wrapped(...args);
        break;
      case 1:
        if (game.smartTarget.altModifier) {
          SmartTarget.handleTargeting(this,game.keyboard.isModifierActive(KeyboardManager.MODIFIER_KEYS.SHIFT));
          return
        }else{
          return wrapped(...args);
        }
        break;
      case 2:
        if ((!game.user.isGM && !this.isOwner) || (this.isOwner && game.smartTarget.altModifier)) {
          SmartTarget.handleTargeting(this,game.keyboard.isModifierActive(KeyboardManager.MODIFIER_KEYS.SHIFT));
          return
        } else {
          return wrapped(...args);
        }
        break;
    }
    super._onClickLeft(...args);
  }

  static canvasOnClickLeft(wrapped, ...args) {
    const canvasMousePos = args[0].data.origin
    if (game.smartTarget.altModifier){
      let distance = Infinity
      let closestTemplate = null
      for(let template of canvas.templates.placeables){
        if(!template.owner) continue
        const inTemplate = template.shape.contains(canvasMousePos.x-template.x,canvasMousePos.y-template.y)
        const d = Math.sqrt(Math.pow(template.x-canvasMousePos.x,2)+Math.pow(template.y-canvasMousePos.y,2))
        if(inTemplate && d<distance){
          distance = d
          closestTemplate = template
        }
      }
      if(closestTemplate){
        const release = game.keyboard.isModifierActive(KeyboardManager.MODIFIER_KEYS.SHIFT) ? !SmartTarget.settings().release : SmartTarget.settings().release;
        if (release)canvas.tokens.placeables[0]?.setTarget(false, { releaseOthers: true });
        for(let token of canvas.tokens.placeables){
          if(closestTemplate.shape.contains(token.center.x-closestTemplate.x,token.center.y-closestTemplate.y)){
            token.setTarget(!token.isTargeted, { releaseOthers: false });
          }
        }
      }
    }
    return wrapped(...args);
  }

  static _canControl(wrapped,...args){
    if(!args[1]) return wrapped(...args);
    const mode = SmartTarget.settings().mode;
    if(mode==1 && game.smartTarget.altModifier) return true;
    if(mode==2 && !game.user.isGM && !this.isOwner) return true;
    return wrapped(...args);
  }

  static getOffset(token, length) {
    const width = token.w;
    const height = token.h;
    const position = game.settings.get(SMARTTARGET_MODULE_NAME, "pipPosition")
    const circleR = game.settings.get(SMARTTARGET_MODULE_NAME, "pipScale") || 12;
    let circleOffsetMult = game.settings.get(SMARTTARGET_MODULE_NAME, "pipOffset") || 16;
    let insidePip = game.settings.get(SMARTTARGET_MODULE_NAME, "insidePips") ? circleR : 0;
    const totalHeight = circleR*2;
    const totalWidth = (circleR*2)*length - circleOffsetMult*(length-1);
    const offset = {
      x: 0,
      y: 0,
    };
    switch (position) {
      case "topleft":
        break;
      case "topright":
        offset.x = width - totalWidth;
        break;
      case "bottomleft":
        offset.y = height - totalHeight;
        break;
      case "bottomright":
        offset.x = width - totalWidth;
        offset.y = height - totalHeight;
        break;
      case "centertop":
        offset.x = (width - totalWidth) / 2;
        break;
      case "centerbottom":
        offset.x = (width - totalWidth) / 2;
        offset.y = height - totalHeight;
        break;
      case "random":
        offset.x = Math.floor(Math.random() * (width - totalWidth));
        offset.y = Math.floor(Math.random() * (height - totalHeight));
        break;
    }
    return offset;
  }
  /**
   * Creates a sprite from the selected avatar and positions around the container
   * @param {User} u -- the user to get
   * @param {int} i  -- the current row count
   * @param {token} target -- PIXI.js container for height & width (the token)
   */
  static async buildCharacterPortrait(u, i, target, token, totalOffset) {
    let color = Color.from(u.color);
    let circleR = game.settings.get(SMARTTARGET_MODULE_NAME, "pipScale") || 12;
    let circleOffsetMult =
      game.settings.get(SMARTTARGET_MODULE_NAME, "pipOffset") || 16;
    let scaleMulti =
      game.settings.get(SMARTTARGET_MODULE_NAME, "pipImgScale") || 1;
    let insidePip = game.settings.get(SMARTTARGET_MODULE_NAME, "insidePips")
      ? circleR
      : 0;
    let pTex;
    if (!u.isGM) {
      let character = u.character;
      if (!character) {
        character = u.data.character;
      }
      if (character) {
        pTex = game.settings.get(SMARTTARGET_MODULE_NAME, "useToken")
          ? character.prototypeToken.img || character.img
          : character.img || character.prototypeToken.img;
      } else {
        pTex = u.data.avatar;
      }
    }
    const gmTexSetting = game.settings.get(SMARTTARGET_MODULE_NAME, "useTokenGm")
    let gmTexture = gmTexSetting ? token.document.getFlag(SMARTTARGET_MODULE_NAME,"gmtargetimg") || u.avatar : u.avatar
    let texture = u.isGM
      ? await new PIXI.Texture.fromURL(gmTexture)
      : await new PIXI.Texture.fromURL(pTex);
    let newTexW = scaleMulti * (2 * circleR);
    let newTexH = scaleMulti * (2 * circleR);
    let borderThic = game.settings.get(SMARTTARGET_MODULE_NAME, "borderThicc");
    let portraitCenterOffset =
      scaleMulti >= 1 ? (16 + circleR / 12) * Math.log2(scaleMulti) : 0;
    portraitCenterOffset +=
      game.settings.get(SMARTTARGET_MODULE_NAME, "pipOffsetManualY") || 0;
    let portraitXoffset =
      game.settings.get(SMARTTARGET_MODULE_NAME, "pipOffsetManualX") || 0;
    let matrix = new PIXI.Matrix(
      (scaleMulti * (2 * circleR + 2)) / texture.width,
      0,
      0,
      (scaleMulti * (2 * circleR + 2)) / texture.height,
      newTexW / 2 + 4 + i * circleOffsetMult + portraitXoffset + insidePip + totalOffset.x,
      newTexH / 2 + portraitCenterOffset + insidePip + totalOffset.y
    );
    target
      .beginFill(color)
      .drawCircle(2 + i * circleOffsetMult + insidePip + totalOffset.x, 0 + insidePip + totalOffset.y, circleR)
      .beginTextureFill({
        texture: texture,
        alpha: 1,
        matrix: matrix,
      })
      .lineStyle(borderThic, 0x0000000)
      .drawCircle(2 + i * circleOffsetMult + insidePip + totalOffset.x, 0 + insidePip + totalOffset.y, circleR)
      .endFill()
      .lineStyle(borderThic / 2, color)
      .drawCircle(2 + i * circleOffsetMult + insidePip + totalOffset.x, 0 + insidePip + totalOffset.y, circleR);
  }

  // Draw custom crosshair and pips
  static async _refreshTarget(reticule = {}) {
    this.target.clear();
    if (!this.targeted.size) return;

    // Determine whether the current user has target and any other users
    const [others, user] = Array.from(this.targeted).partition(
      (u) => u === game.user
    );
    const userTarget = user.length;

    // For the current user, draw the target arrows
    if (userTarget) {
      let textColor = game.settings.get(
        SMARTTARGET_MODULE_NAME,
        "crossairColor"
      )
        ? game.settings
            .get(SMARTTARGET_MODULE_NAME, "crossairColor")
            .replace("#", "0x")
        : this._getBorderColor({hover: true});

      if (game.settings.get(SMARTTARGET_MODULE_NAME, "use-player-color")) {
        textColor = Color.from(game.user["color"]);
      }

      let p = 4;
      let aw = 12;
      let h = this.h;
      let hh = h / 2;
      let w = this.w;
      let hw = w / 2;
      let ah = canvas.dimensions.size / 3;

      let selectedIndicator = game.settings.get(
        SMARTTARGET_MODULE_NAME,
        "target-indicator"
      );
      switch (selectedIndicator) {
        case "0":
          reticule.color = textColor;
          this._drawTarget(reticule)//{color: textColor})//drawDefault(this, textColor, p, aw, h, hh, w, hw, ah);
          break;
        case "1":
          drawCrossHairs1(this, textColor, p, aw, h, hh, w, hw, ah);
          break;
        case "2":
          drawCrossHairs2(this, textColor, p, aw, h, hh, w, hw, ah);
          break;
        case "3":
          drawBullsEye1(this, textColor, p, aw, h, hh, w, hw, ah);
          break;
        case "4":
          drawBullsEye2(this, textColor, p, aw, h, hh, w, hw, ah);
          break;
        case "5":
          drawBetterTarget(this, textColor, p, aw, h, hh, w, hw, ah);
          break;
        default:
          drawDefault(this, textColor, p, aw, h, hh, w, hw, ah);
          break;
      }
    }

    // For other users, draw offset pips
    if (game.settings.get(SMARTTARGET_MODULE_NAME, "portraitPips")) {
      for (let [i, u] of others.entries()) {
        const offset = SmartTarget.getOffset(this, others.length);
        SmartTarget.buildCharacterPortrait(u, i, this.target,this, offset);
      }
    } else {
      for (let [i, u] of others.entries()) {
        let color = Color.from(u.color);
        this.target
          .beginFill(color, 1.0)
          .lineStyle(2, 0x0000000)
          .drawCircle(2 + i * 8, 0, 6);
      }
    }
  }

  static settings() {
    const settings = {
      mode: game.settings.get(SMARTTARGET_MODULE_NAME, "targetingMode"),
      release: !game.settings.get(SMARTTARGET_MODULE_NAME, "release"),
    };
    return settings;
  }
}

Hooks.on("targetToken", (user,token,targeted) =>{
  const gmTexSetting = game.settings.get(SMARTTARGET_MODULE_NAME, "useTokenGm")
  if(!game.user.isGM || !targeted || !gmTexSetting) return

  let flag
      if(gmTexSetting == 1) flag = _token?.actor?.img || _token?.img
      if(gmTexSetting == 2) flag = _token?.img || _token?.actor?.img 
      flag && flag != token.document.getFlag(SMARTTARGET_MODULE_NAME,"gmtargetimg") && token.document.setFlag(SMARTTARGET_MODULE_NAME,"gmtargetimg",flag)

})
