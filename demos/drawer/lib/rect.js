/* -------------- 可拖动和缩放矩形类 -------------- */
import { Polygon } from './polygon.js';
import { DrawHelper } from './draw-helper.js';

export class DragableAndScalableRect extends Polygon {
  minWidth = 0;
  minHeight = 0;
  constructor(geometry) {
    super();
    this.geometry = DrawHelper.checkGeometry(geometry);
    this.minWidth = 'minWidth' in geometry ? geometry.minWidth : this.minWidth;
    this.minHeight = 'minHeight' in geometry ? geometry.minHeight : this.minHeight;
    this.points = this.getPoints();
    this.cornerPoint = null;
    this.dragable = true;
    this.scalable = true;
  }

  // 判断点击位置是否在图形内部
  isInPath(point, geometry) {
    const { x, y, width, height } = geometry || this.geometry;
    return (
      point.x >= x - width / 2 &&
      point.x <= x + width / 2 &&
      point.y >= y - height / 2 &&
      point.y <= y + height / 2
    );
  }

  // 判断点击位置是否在四个角
  isInCornerPath(point) {
    const [rectPoints, ...cornerPoints] = this.points;
    const { cornerWidth } = this.geometry;
    for (let i = 0; i < rectPoints.length; i++) {
      if (this.isInPath(point, { ...rectPoints[i], width: cornerWidth, height: cornerWidth })) {
        this.cornerPoint = i;
        return true;
      }
    }
    this.cornerPoint = null;
    return false;
  }

  // 根据点阵绘制图形
  draw() {
    this.points.forEach((pointArray) => {
      if (Array.isArray(pointArray)) {
        DrawHelper.drawPoints(this.ctx, pointArray);
      }
    });
  }

  // 销毁图形
  destroy() {
    const { width, height, cornerWidth } = this.geometry;
    const [rectPoints, ...cornerPoints] = this.points;
    const leftTopPoint = rectPoints[0];
    DrawHelper.clearRect(this.ctx, leftTopPoint.x - 1, leftTopPoint.y - 1, width + 2, height + 2);
    cornerPoints.forEach((cPoint) => {
      DrawHelper.clearRect(
        this.ctx,
        cPoint[0].x - 1,
        cPoint[0].y - 1,
        cornerWidth + 2,
        cornerWidth + 2
      );
    });
  }

  updateWhenDraging(point) {
    const { prePoint } = this;
    this.geometry.x = this.geometry.x + (point.x - prePoint.x);
    this.geometry.y = this.geometry.y + (point.y - prePoint.y);
    this.points = this.getPoints();
    this.prePoint = point;
  }

  updateWhenScaling(point) {
    const { prePoint } = this;
    const xDistance = point.x - prePoint.x;
    const yDistance = point.y - prePoint.y;
    const newGeometry = { ...this.geometry };

    switch (this.cornerPoint) {
      case 0:
        newGeometry.x = this.geometry.x + xDistance / 2;
        newGeometry.y = this.geometry.y + yDistance / 2;
        newGeometry.width = this.geometry.width - xDistance;
        newGeometry.height = this.geometry.height - yDistance;
        break;
      case 1:
        newGeometry.x = this.geometry.x + xDistance / 2;
        newGeometry.y = this.geometry.y + yDistance / 2;
        newGeometry.width = this.geometry.width + xDistance;
        newGeometry.height = this.geometry.height - yDistance;
        break;
      case 2:
        newGeometry.x = this.geometry.x + xDistance / 2;
        newGeometry.y = this.geometry.y + yDistance / 2;
        newGeometry.width = this.geometry.width + xDistance;
        newGeometry.height = this.geometry.height + yDistance;
        break;
      case 3:
        newGeometry.x = this.geometry.x + xDistance / 2;
        newGeometry.y = this.geometry.y + yDistance / 2;
        newGeometry.width = this.geometry.width - xDistance;
        newGeometry.height = this.geometry.height + yDistance;
        break;
      default:
        return;
    }

    if (newGeometry.width < this.minWidth || newGeometry.height < this.minHeight) {
      return;
    }
    this.geometry = newGeometry;
    this.points = this.getPoints();
    this.prePoint = point;
  }

  // 实时更新点阵坐标
  update(point) {
    switch (this.status) {
      case 'draging':
        this.updateWhenDraging(point);
        break;
      case 'scaling':
        this.updateWhenScaling(point);
        break;
      default:
        break;
    }
  }

  // 获取矩形四个角
  getPointFromGeometry(x, y, width, height) {
    return {
      leftTopPoint: {
        x: x - width / 2,
        y: y - height / 2,
      },
      rightTopPoint: {
        x: x + width / 2,
        y: y - height / 2,
      },
      leftBottomPoint: {
        x: x - width / 2,
        y: y + height / 2,
      },
      rightBottomPoint: {
        x: x + width / 2,
        y: y + height / 2,
      },
    };
  }

  // 获取几何图形点阵
  getPoints() {
    const { x, y, width, height, cornerWidth } = this.geometry;
    const rectPosition = this.getPointFromGeometry(x, y, width, height);
    const leftTopPoint = rectPosition.leftTopPoint;
    const rightTopPoint = rectPosition.rightTopPoint;
    const leftBottomPoint = rectPosition.leftBottomPoint;
    const rightBottomPoint = rectPosition.rightBottomPoint;

    const leftTopRectPosition = this.getPointFromGeometry(
      leftTopPoint.x,
      leftTopPoint.y,
      cornerWidth,
      cornerWidth
    );
    const rightTopRectPosition = this.getPointFromGeometry(
      rightTopPoint.x,
      rightTopPoint.y,
      cornerWidth,
      cornerWidth
    );
    const rightBottomRectPosition = this.getPointFromGeometry(
      rightBottomPoint.x,
      rightBottomPoint.y,
      cornerWidth,
      cornerWidth
    );
    const leftBottomRectPosition = this.getPointFromGeometry(
      leftBottomPoint.x,
      leftBottomPoint.y,
      cornerWidth,
      cornerWidth
    );

    const leftTopRect = [
      leftTopRectPosition.leftTopPoint,
      leftTopRectPosition.rightTopPoint,
      leftTopRectPosition.rightBottomPoint,
      leftTopRectPosition.leftBottomPoint,
    ];
    const rightTopRect = [
      rightTopRectPosition.leftTopPoint,
      rightTopRectPosition.rightTopPoint,
      rightTopRectPosition.rightBottomPoint,
      rightTopRectPosition.leftBottomPoint,
    ];
    const rightBottomRect = [
      rightBottomRectPosition.leftTopPoint,
      rightBottomRectPosition.rightTopPoint,
      rightBottomRectPosition.rightBottomPoint,
      rightBottomRectPosition.leftBottomPoint,
    ];
    const leftBottomRect = [
      leftBottomRectPosition.leftTopPoint,
      leftBottomRectPosition.rightTopPoint,
      leftBottomRectPosition.rightBottomPoint,
      leftBottomRectPosition.leftBottomPoint,
    ];

    return [
      [leftTopPoint, rightTopPoint, rightBottomPoint, leftBottomPoint],
      leftTopRect,
      rightTopRect,
      rightBottomRect,
      leftBottomRect,
    ];
  }
}
