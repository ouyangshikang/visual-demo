/* -------------- 绘制辅助类 -------------- */
export class DrawHelper {
  // 执行绘制
  static drawPoints(ctx, points) {
    const firstPoint = points[0];
    ctx.strokeStyle = 'black';
    ctx.beginPath();

    ctx.moveTo(firstPoint.x, firstPoint.y);
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.stroke();
  }

  // 获取鼠标位置
  static getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left * (canvas.width / rect.width);
    const y = event.clientY - rect.top * (canvas.height / rect.height);

    return { x, y };
  }

  // 清除矩形区域
  static clearRect(ctx, x, y, width, height) {
    ctx.clearRect(x, y, width, height);
  }

  // 检查参数 geometry
  static checkGeometry(geometry) {
    const keys = Object.keys(geometry);
    for (let i = 0; i < keys.length; i++) {
      if (geometry[keys[i]] < 0) {
        throw new Error(`geometry: value of ${keys[i]} is no less than 0!`);
      }
    }
    return geometry;
  }

  static drawRect() {}
}
