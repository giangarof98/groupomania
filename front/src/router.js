import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: '/signup',
        name: 'signup',
        component: () => import('./components/Sign')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./components/Log')
    },
    {
        path: '/',
        name: 'home',
        component: () => import('./components/Home')
    },
    {
        path:'/post',
        name: 'post',
        component: () => import('./components/Post')
    },
    {
        path: '/post/:id',
        name: 'postId',
        component: () => import('./components/Single')
    },
    {
        path: '/update/:id',
        name: 'update',
        component: () => import('./components/Modify')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;