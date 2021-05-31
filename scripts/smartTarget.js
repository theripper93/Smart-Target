function _refreshTarget() {
  this.target.clear();
  if (!this.targeted.size) return;

  // Determine whether the current user has target and any other users
  const [others, user] = Array.from(this.targeted).partition(
    (u) => u === game.user
  );
  const userTarget = user.length;

  // For the current user, draw the target arrows
  if (userTarget) {
    let textColor = game.settings.get("smarttarget", "crossairColor") ? game.settings.get("smarttarget", "crossairColor").replace("#","0x") : 0xff9829;
    
    if (game.settings.get("smarttarget",'use-player-color')) {
      textColor = colorStringToHex(game.user['color']);
    }
    
    let p = game.settings.get("smarttarget", "crossairSpread") ? -10 : 4;
    let aw = 12;
    let h = this.h;
    let hh = h / 2;
    let w = this.w;
    let hw = w / 2;
    let ah = canvas.dimensions.size / 3;

    let selectedIndicator = game.settings.get("smarttarget","target-indicator");
    switch (selectedIndicator) {
      case "0":
          drawDefault(this, textColor, p, aw, h, hh, w, hw, ah);
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
  if(game.settings.get("smarttarget", "portraitPips")){
    for (let [i, u] of others.entries()) {
      let color = colorStringToHex(u.data.color);
      let circleR = game.settings.get("smarttarget", "pipScale") || 12;
      let circleOffsetMult = game.settings.get("smarttarget", "pipOffset") || 16;
      let scaleMulti = game.settings.get("smarttarget", "pipImgScale") || 1;
      let texture = u.isGM
        ? new PIXI.Texture.from(u.avatar)
        : new PIXI.Texture.from(
            u.character.data.img || u.character.token.data.img
          );
      let newTexW = scaleMulti * (2 * circleR);
      let newTexH = scaleMulti * (2 * circleR);
      let borderThic = game.settings.get("smarttarget", "borderThicc");
      let portraitCenterOffset =
        scaleMulti >= 1 ? (16 + circleR / 12) * Math.log2(scaleMulti) : 0;
      portraitCenterOffset +=
        game.settings.get("smarttarget", "pipOffsetManualY") || 0;
      let portraitXoffset =
        game.settings.get("smarttarget", "pipOffsetManualX") || 0;
      let matrix = new PIXI.Matrix(
        (scaleMulti * (2 * circleR + 2)) / texture.width,
        0,
        0,
        (scaleMulti * (2 * circleR + 2)) / texture.height,
        newTexW / 2 + 4 + i * circleOffsetMult + portraitXoffset,
        newTexH / 2 + portraitCenterOffset
      );
      this.target
        .beginFill(color)
        .drawCircle(2 + i * circleOffsetMult, 0, circleR)
        .beginTextureFill({
          texture: texture,
          alpha: 1,
          matrix: matrix,
        })
        .lineStyle(borderThic, 0x0000000)
        .drawCircle(2 + i * circleOffsetMult, 0, circleR)
        .endFill()
        .lineStyle(borderThic / 2, color)
        .drawCircle(2 + i * circleOffsetMult, 0, circleR);
    }
  }else{
    for ( let [i, u] of others.entries() ) {
      let color = colorStringToHex(u.data.color);
      this.target.beginFill(color, 1.0).lineStyle(2, 0x0000000).drawCircle(2 + (i * 8), 0, 6);
    }
  }
  
  
}

Hooks.on("hoverToken", (token, hovered) => {
  if (game.settings.get("smarttarget", "altTarget")) {
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
});

Hooks.on("hoverToken", (token, hovered) => {
  if (game.settings.get("smarttarget", "alwaysTarget")) {
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


/**
 * Adds the clear targets/selection button to the menu.
 * @param {array} controls -- the current controls hud array
 */
function  getSceneControlButtonsHandler(controls) {

  let control = controls.find(c => c.name === "token") || controls[0];

  control.tools.push({
      name: "cancelTargets",
      title: "Clear Targets/Selection",
      icon:"fa fa-times-circle",
      //visible: game.settings.get(MODULE_NAME, "XXX"),
      button:true,
      onClick: () => {
          control.activeTool = "select";
          Hooks.call("clearTokenTargets",game.user,clearTokenTargetsHandler(game.user, null));
          return;
      },
      layer: "TokenLayer"
  });
}

/**
 * Button Handler to clear token targets & selections
 * @param {User} user              -- the user clearing the targets
 * @param {TokenLayer} tokenlayer  -- token layer
*/
function clearTokenTargetsHandler(user, tokenlayer) {
  user.targets.forEach(t => t.setTarget(false, {
      user: user,
      releaseOthers: true,
      groupSelection: false
  }));
  game.user.targets.clear();
  return true;
}