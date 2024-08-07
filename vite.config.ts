import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import unocss from '@unocss/vite';

// 项目src路径
const srcPath = `${path.resolve(process.cwd())}/src`;
// 本地svg图标路径
const localIconPath = `${srcPath}/assets/svg-icon`;

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': srcPath
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: 'icon-local-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__'
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        local: FileSystemIconLoader(localIconPath)
      },
      scale: 1,
      defaultClass: 'inline-block'
    }),
    Components({
      dirs: ['src/components'],
      dts: 'src/typings/components.d.ts',
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({ customCollections: 'local', componentPrefix: 'icon' })
      ]
    }),
    unocss()
  ]
});
