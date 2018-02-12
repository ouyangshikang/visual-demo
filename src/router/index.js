const PersonBlog = require('components/personBlog.vue');
const Javascript = require('components/Javascript.vue');

const routes = [
    {path: '/', redirect: '/blog'},
    {path: '/blog', component: PersonBlog},
    {path: '/js', component: Javascript}
];

export default routes;
