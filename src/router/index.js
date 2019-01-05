import canvasDemo from '../components/canvas-demo';

import canvasClock from '../page/canvas-clock';

const routes = [{
    path: '/',
    redirect: '/blog'
}, {
    path: '/canvas-demo',
    component: canvasDemo,
    children: [{
        path: 'canvasClock',
        component: canvasClock
    }]
}];

export default routes;
