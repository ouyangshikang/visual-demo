import type { GlobalThemeOverrides } from 'naive-ui';
import { addColorAlpha, getColorPalette } from '@/utils/color';

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error';
type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active';
type ColorKey = `${ColorType}Color${ColorScene}`;
type ThemeColor = Partial<Record<ColorKey, string>>;

interface ColorAction {
  scene: ColorScene;
  handler: (color: string) => string;
}

/** 获取主题颜色的各种场景对应的颜色 */
function getThemeColors(colors: [ColorType, string][]) {
  const colorActions: ColorAction[] = [
    { scene: '', handler: (color) => color },
    { scene: 'Suppl', handler: (color) => color },
    { scene: 'Hover', handler: (color) => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: (color) => getColorPalette(color, 7) },
    { scene: 'Active', handler: (color) => addColorAlpha(color, 0.1) }
  ];

  const themeColor: ThemeColor = {};

  colors.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color;
      const colorKey: ColorKey = `${colorType}Color${action.scene}`;
      themeColor[colorKey] = action.handler(colorValue);
    });
  });

  return themeColor;
}

/** 获取 naive-ui的主题变量配置 */
export function getThemeOverrides(): GlobalThemeOverrides {
  const themeColors = getThemeColors([
    ['primary', '#2254f4'],
    ['info', '#2080f0'],
    ['success', '#18a058'],
    ['warning', '#faad14'],
    ['error', '#f5222d']
  ]);

  return {
    common: {
      ...themeColors
    }
  };
}

/** css 暗黑模式 */
export function handleCssDarkMode() {
  const DARK_CLASS = 'dark';
  function addDarkClass() {
    document.documentElement.classList.add(DARK_CLASS);
  }
  function removeDarkClass() {
    document.documentElement.classList.remove(DARK_CLASS);
  }
  return {
    addDarkClass,
    removeDarkClass
  };
}

/** 是否暗色模式(暂时写死) */
export const darkMode = false;
