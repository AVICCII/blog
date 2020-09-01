import Vue from 'vue'
import Router from 'vue-router'

// 导入刚才编写的组件
import AppIndex from '@/components/home/Appindex'
import Login from '@/components/Login'
import Home from '@/components/Home'
import LibraryIndex from "@/library/LibraryIndex";


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: Home,
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'AppIndex',
                    component: AppIndex,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/library',
                    name: 'Library',
                    component: LibraryIndex,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})
