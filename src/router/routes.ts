import { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    },
    {
        path: '/snippets-form',
        name: 'snippets-form',
        component: () =>
            import(
                /* webpackChunkName: "snippets-form" */ '../views/SnippetForm.vue'
            ),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () =>
            import(
                /* webpackChunkName: "profile" */ '../views/UserManagement.vue'
            ),
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import(
                /* webpackChunkName: "profile" */ '../views/RegisterForm.vue'
            ),
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import(/* webpackChunkName: "profile" */ '../views/LoginForm.vue'),
    },
]

export default routes
