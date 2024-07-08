/* -------------- 几何图形类 -------------- */
export class Polygon {
  dragable = false;
  scalable = false;
  status = 'pending';
  prePoint = null;
  constructor() {
    this.ctx = null;
  }

  draw() {}
  destroy() {}

  attach(ctx) {
    this.ctx = ctx;
  }
  detach() {
    this.ctx = null;
  }

  isInPath(point) {
    return false;
  }
  isInCornerPath(point) {
    return false;
  }

  scaleStart(point) {
    this.status = 'scaling';
    this.prePoint = point;
  }
  scale(point) {
    this.destroy();
    this.update(point);
    this.draw();
  }
  scaleEnd(point) {
    this.status = 'pending';
    this.destroy();
    this.update(point);
    this.draw();
    this.prePoint = null;
  }

  dragStart(point) {
    this.status = 'draging';
    this.prePoint = point;
  }
  drag(point) {
    this.destroy();
    this.update(point);
    this.draw();
  }
  dragEnd(point) {
    this.status = 'pending';
    this.destroy();
    this.update(point);
    this.draw();
    this.prePoint = null;
  }
}
