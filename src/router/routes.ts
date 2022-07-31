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
]

export default routes
