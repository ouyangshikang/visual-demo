import { Drawer } from './lib/drawer';
import { DragableAndScalableRect } from './lib/rect';

// 创建画板
const drawer = new Drawer('#drawer');
// 创建几何图形
const rect1 = new DragableAndScalableRect({
  x: 500, // 中心点 x 坐标
  y: 300, // 中心点 y 坐标
  width: 200,
  height: 200,
  minWidth: 20,
  minHeight: 20,
  cornerWidth: 20,
});
drawer.addPolygon(rect1);

// const rect2 = new DragableAndScalableRect({
//   x: 100, // 中心点 x 坐标
//   y: 100, // 中心点 y 坐标
//   width: 100,
//   height: 100,
//   cornerWidth: 10,
// });
// drawer.addPolygon(rect2);

window.onresize = () => {
  drawer.onResize();
};
