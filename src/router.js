import Vue from 'vue'
import Router from 'vue-router'

// 导入刚才编写的组件
import AppIndex from '@/components/home/Appindex'
import Login from '@/components/Login'
import Home from '@/components/Home'
import LibraryIndex from "@/library/LibraryIndex";
import Register from "@/components/Register";

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
            path: '/',
            name: 'index',
            redirect: '/index',
            component: AppIndex,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('../src/components/admin/AdminIndex'),
            meta: {
                requireAuth: true
            },
            // children: [
            //     {
            //         path: '/admin/dashboard',
            //         name: 'Dashboard',
            //         component: () => import('../src/components/admin/dashboard/admin/index'),
            //         meta: {
            //             requireAuth: true
            //         }
            //     }
            // ]
        },
    ]
})

// 用于创建默认路由
// eslint-disable-next-line no-unused-vars
export const createRouter = routes => new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Default',
            redirect: '/home',
            component: Home
        },
        {
            // home页面并不需要被访问，只是作为其它组件的父组件
            path: '/home',
            name: 'Home',
            component: Home,
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'AppIndex',
                    component: () => import('../src/components/home/Appindex')
                },
                // {
                //     path: '/jotter',
                //     name: 'Jotter',
                //     component: () => import('../src/components/jotter/Articles')
                // },
                // {
                //     path: '/jotter/article',
                //     name: 'Article',
                //     component: () => import('../components/jotter/ArticleDetails')
                // },
                // {
                //     path: '/admin/content/editor',
                //     name: 'Editor',
                //     component: () => import('../src/components/admin/content/ArticleEditor'),
                //     meta: {
                //         requireAuth: true
                //     }
                // },
                {
                    path: '/library',
                    name: 'Library',
                    component: () => import('../src/library/LibraryIndex')
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../src/components/Login')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('../src/components/Register')
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('../src/components/admin/AdminIndex'),
            meta: {
                requireAuth: true
            },
            // children: [
            //     {
            //         path: '/admin/dashboard',
            //         name: 'Dashboard',
            //         component: () => import('../src/components/admin/dashboard/admin/index'),
            //         meta: {
            //             requireAuth: true
            //         }
            //     }
            // ]
        },
        // {
        //     path: '*',
        //     component: () => import('../src/components/pages/Error404')
        // }
    ]
})
