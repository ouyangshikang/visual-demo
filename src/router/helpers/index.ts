import type { RouteRecordRaw } from 'vue-router';

/**
 * 自动加载 views 目录下的 index.vue 作为页面，生成路由配置。
 * - name: 使用路径用下划线连接，如 test_test-1
 * - path: 保持与 views 下文件夹结构一致，如 /test/test-1
 */

export function loadViewRoutes(): RouteRecordRaw[] {
  const pageModules = import.meta.glob('@/views/**/index.vue');

  const routes = Object.entries(pageModules)
    .map(([filePath, component]) => {
      const match = filePath.match(/\/views\/(.+)\/index\.vue$/);
      if (!match) return;

      // 得到路径, 如: test/test-1, _system/xxx, test/components/xxx
      // 过滤掉包含 "_开头" 或 "components" 的目录
      const rawPath = match[1];
      const segments = rawPath.split('/');
      const shouldIgnore = segments.some((seg) => seg.startsWith('_') || seg === 'components');
      if (shouldIgnore) return;

      const path = '/' + rawPath;
      const name = rawPath.replace(/\//g, '_');

      return {
        path,
        name,
        component,
        meta: {
          title: pageMetaMap[name]?.title || name
        }
      };
    })
    .filter(Boolean) as RouteRecordRaw[];

  const constantRoutes = [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/_system/home/index.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/:pathMatch(.*)*', // 通配符路由：匹配不到时重定向到 /404
      name: 'NotFound',
      component: () => import('@/views/_system/404/index.vue'),
      meta: {
        title: '未找到'
      }
    }
  ];

  return [...constantRoutes, ...routes];
}

/**
 * 页面元数据映射表
 * 用于在路由配置中设置页面标题
 */
export const pageMetaMap: Record<string, { title?: string }> = {
  home: { title: '首页' },
  mask: { title: '蒙版功能' }
};
