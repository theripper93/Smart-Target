function drawDefault(token, fillColor, p, aw, h, hh, w, hw, ah) {

    token.targetArrows.beginFill(fillColor, 1.0)
    .lineStyle(1, 0x000000)
    .drawPolygon([-p, hh, -p - aw, hh - ah, -p - aw, hh + ah])
    .drawPolygon([w + p, hh, w + p + aw, hh - ah, w + p + aw, hh + ah])
    .drawPolygon([hw, -p, hw - ah, -p - aw, hw + ah, -p - aw])
    .drawPolygon([hw, h + p, hw - ah, h + p + aw, hw + ah, h + p + aw]);

}

function drawCrossHairs1(token, fillColor, p, aw, h, hh, w, hw, ah) {
let borderColor = 0x000000;
let rw = 10; // rect width
let rh = 30; // rect length
let r = hh; // radius
let topX = hw - rw / 2;
let topY = 0 - rh / 2;
let rightX = w - rh / 2;
let rightY = hh - rw / 2;
let botX = hw - rw / 2;
let botY = h - rh / 2;
let leftX = 0 - rh / 2;
let leftY = hh - rw / 2;
token.targetArrows
    .beginFill(borderColor, 0).lineStyle(10, borderColor).drawCircle(hw, hh, r).endFill()
    .beginFill(fillColor, 0).lineStyle(6, fillColor).drawCircle(hw, hh, r).endFill()
    .beginFill(fillColor).lineStyle(2, borderColor).drawRect(topX, topY, rw, rh).endFill() // top bar
    .beginFill(fillColor).lineStyle(2, borderColor).drawRect(rightX, rightY, rh, rw).endFill() // right bar
    .beginFill(fillColor).lineStyle(2, borderColor).drawRect(botX, botY, rw, rh).endFill() // bottom bar
    .beginFill(fillColor).lineStyle(2, borderColor).drawRect(leftX, leftY, rh, rw).endFill(); // tleft bar
}

function drawCrossHairs2(token, fillColor, p, aw, h, hh, w, hw, ah) {
let borderColor = 0x000000;
let rw = 10; // rect width
let rh = 50; // rect length
let r = hh; // radius
let topX = hw - rw / 2;
let topY = 0 - rh / 2;
let rightX = w - rh / 2;
let rightY = hh - rw / 2;
let botX = hw - rw / 2;
let botY = h - rh / 2;
let leftX = 0 - rh / 2;
let leftY = hh - rw / 2;
token.targetArrows
    .beginFill(borderColor, 1).lineStyle(8, borderColor).drawCircle(hw, hh, 2).endFill()
    .beginFill(fillColor, 1).lineStyle(6, fillColor).drawCircle(hw, hh, 2).endFill()
    .beginFill(fillColor).lineStyle(2, borderColor).drawRect(topX, topY, rw, rh).endFill() // top bar
    .beginFill(fillColor).lineStyle(2, borderColor).drawRect(rightX, rightY, rh, rw).endFill() // right bar
    .beginFill(fillColor).lineStyle(2, borderColor).drawRect(botX, botY, rw, rh).endFill() // bottom bar
    .beginFill(fillColor).lineStyle(2, borderColor).drawRect(leftX, leftY, rh, rw).endFill(); // tleft bar
}

function drawBullsEye1(token, fillColor, p, aw, h, hh, w, hw, ah) {
let borderColor = 0x000000;
token.targetArrows
    .beginFill(borderColor, 0).lineStyle(6, borderColor).drawCircle(hw, hh, hh).endFill()
    .beginFill(fillColor, 0).lineStyle(4, fillColor).drawCircle(hw, hh, hh).endFill() // stop here for outer ring
    .beginFill(borderColor, 0).lineStyle(6, borderColor).drawCircle(hw, hh, hh - 40).endFill()
    .beginFill(fillColor, 0).lineStyle(4, fillColor).drawCircle(hw, hh, hh - 40).endFill();
}

function drawBullsEye2(token, fillColor, p, aw, h, hh, w, hw, ah) {
let borderColor = 0x000000;
token.targetArrows
    .beginFill(borderColor, 0).lineStyle(6, borderColor).drawCircle(hw, hh, hh).endFill()
    .beginFill(fillColor, 0).lineStyle(4, fillColor).drawCircle(hw, hh, hh).endFill() // stop here for outer ring
    .beginFill(borderColor, 0).lineStyle(6, borderColor).drawCircle(hw, hh, hh - 20).endFill()
    .beginFill(fillColor, 0).lineStyle(4, fillColor).drawCircle(hw, hh, hh - 20).endFill()
    .beginFill(fillColor, 1).lineStyle(8, fillColor).drawCircle(hw, hh, 2).endFill();

}

function drawBetterTarget(token, fillColor, p, aw, h, hh, w, hw, ah) {
let size = token.w;
// Constrain dimensions to the shortest axis
if (size > token.h) {
  size = token.h;
}
const padding = size / 8;
const stroke = size / 16;
const vmid = token.h / 2;
const hmid = token.w / 2;
const crossLen = (size / 2) - (padding * 1.5);
// TODO: Remove this when core PIXI.js graphics-smooth version >= v0.0.17
const smoothGraphicsHack = 0.999;
token.targetArrows
    .beginFill(0x000000, 0.0).lineStyle(stroke + 2, 0x000000)
    .drawCircle(hmid, vmid, (size / 2) - padding - (stroke / 2))
    .endFill()
    .beginFill(0x000000, 0.0).lineStyle(stroke, fillColor)
    .drawCircle(hmid, vmid, (size / 2) - padding - (stroke / 2))
    .endFill()
    .beginFill(fillColor, 1.0).lineStyle(1, 0x000000)
    .drawRoundedRect(hmid - (stroke / 2), vmid - stroke - (padding / 2) - crossLen, stroke, crossLen, stroke / 2 * smoothGraphicsHack)
    .drawRoundedRect(hmid - (stroke / 2), vmid + (padding * 1.5) - stroke, stroke, crossLen, stroke / 2 * smoothGraphicsHack)
    .drawRoundedRect(hmid - stroke - (padding / 2) - crossLen, vmid - (stroke / 2), crossLen, stroke, stroke / 2 * smoothGraphicsHack)
    .drawRoundedRect(hmid + (padding * 1.5) - stroke, vmid - (stroke / 2), crossLen, stroke, stroke / 2 * smoothGraphicsHack)
    .endFill();
}
