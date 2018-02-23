import PersonBlog from '../components/personBlog';
import Javascript from '../components/Javascript';
import canvasDemo from '../components/canvas-demo';

import canvasClock from '../page/canvas-clock';

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
        path: 'canvasClock',
        component: canvasClock
    }]
}];

export default routes;
