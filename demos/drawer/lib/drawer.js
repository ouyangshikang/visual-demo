import { DrawHelper } from './draw-helper';

/* -------------- canvas 画板类 -------------- */
export class Drawer {
  constructor(selector) {
    this.polygons = [];
    this.me = document.querySelector(selector);
    this.ctx = null;
    this.target = null; // 单点操作目标

    this.me.onmousedown = this.onMouseDown;
    this.me.onmouseup = this.onMouseUp;
    this.me.onmousemove = this.onMouseMove;

    if (this.me.getContext) {
      this.ctx = this.me.getContext('2d');
      this.resize();
    } else {
      throw new Error('canvas context:2d is not available!');
    }
  }

  onResize() {
    this.resize();
    this.clear();
    this.render();
  }

  resize() {
    const rect = this.me.getBoundingClientRect();
    this.me.width = rect.width * window.devicePixelRatio;
    this.me.height = rect.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  clear() {
    const rect = this.me.getBoundingClientRect();
    this.ctx.clearRect(0, 0, this.me.width, this.me.height);
  }

  render() {
    this.polygons.forEach((polygon) => polygon.draw());
  }

  addPolygon(polygon) {
    this.polygons.push(polygon);
    polygon.attach(this.ctx);
    polygon.draw();
  }

  removePolygon(polygon) {
    const index = this.polygons.indexOf(polygon);
    if (index !== -1) {
      this.polygons[index].destroy();
      this.polygons[index].detach();
      this.polygons.splice(index, 1);
    }
  }

  onMouseDown = (event) => {
    const point = DrawHelper.getMousePosition(this.me, event);
    for (let i = 0; i < this.polygons.length; i++) {
      if (this.polygons[i].isInCornerPath(point) && this.polygons[i].scalable) {
        this.polygons[i].scaleStart(point);
        this.target = this.polygons[i];
        break;
      }
      if (this.polygons[i].isInPath(point) && this.polygons[i].dragable) {
        this.polygons[i].dragStart(point);
        this.target = this.polygons[i];
        break;
      }
    }
  };

  onMouseMove = (event) => {
    const point = DrawHelper.getMousePosition(this.me, event);
    if (!this.target) return;
    switch (this.target.status) {
      case 'draging':
        this.target.drag(point);
        break;
      case 'scaling':
        this.target.scale(point);
        break;
      default:
        break;
    }
  };

  onMouseUp = (event) => {
    const point = DrawHelper.getMousePosition(this.me, event);
    if (!this.target) return;
    switch (this.target.status) {
      case 'draging':
        this.target.dragEnd(point);
        break;
      case 'scaling':
        this.target.scaleEnd(point);
        break;
      default:
        break;
    }
    this.target = null;
  };
}
