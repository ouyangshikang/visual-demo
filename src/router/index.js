import PersonBlog from '../components/personBlog';
import Javascript from '../components/Javascript';
import canvasDemo from '../components/canvas-demo';

import canvasStar from '../page/canvas-star';

const routes = [{
    path: '/',
    redirect: '/blog'
}, {
    path: '/blog',
    component: PersonBlog
}, {
    path: '/js',
    component: Javascript
}, {
    path: '/canvas-demo',
    component: canvasDemo,
    children: [{
        path: 'canvasStar',
        component: canvasStar
    }]
}];

export default routes;
