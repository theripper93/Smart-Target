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
    let p = game.settings.get("smarttarget", "crossairSpread") ? -10 : 4;
    let aw = 12;
    let h = this.h;
    let hh = h / 2;
    let w = this.w;
    let hw = w / 2;
    let ah = canvas.dimensions.size / 3;
    this.target
      .beginFill(textColor, 1.0)
      .lineStyle(1, 0x000000)
      .drawPolygon([-p, hh, -p - aw, hh - ah, -p - aw, hh + ah])
      .drawPolygon([w + p, hh, w + p + aw, hh - ah, w + p + aw, hh + ah])
      .drawPolygon([hw, -p, hw - ah, -p - aw, hw + ah, -p - aw])
      .drawPolygon([hw, h + p, hw - ah, h + p + aw, hw + ah, h + p + aw]);
  }

  // For other users, draw offset pips
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
    let borderThic = game.settings.get("smarttarget", "borderThicc") || 2;
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
}

Hooks.on("hoverToken", (token, hovered) => {
  if (game.settings.get("smarttarget", "altTarget")) {
    if (keyboard._downKeys.has("Alt") && hovered) {
      if (ui.controls.control.activeTool != "target")
        token.smarttargetPrev = ui.controls.control.activeTool;
      ui.controls.control.activeTool = "target";
    } else if (!hovered) {
      if (token.smarttargetPrev) {
        ui.controls.control.activeTool = token.smarttargetPrev;
        token.smarttargetPrev = null;
      }
    }
  }
});
