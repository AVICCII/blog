import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
    if (store.state.username && to.path.startsWith('/admin')) {
        initAdminMenu(router, store)
    }
        if (to.meta.requireAuth) {
            if (store.state.user) {
                axios.get('/authentication').then(resp => {
                    if (resp) next()
                })
            } else {
                next({
                    path: 'login',
                    query: {redirect: to.fullPath}
                })
            }
        } else {
            next()
        }
    }
)

const initAdminMenu = (router, store) => {
    // 防止重复触发加载菜单操作
    if (store.state.adminMenus.length > 0) {
        return
    }
    axios.get('/menu').then(resp => {
        if (resp && resp.status === 200) {
            var fmtRoutes = formatRoutes(resp.data.result)
            router.addRoutes(fmtRoutes)
            store.commit('initAdminMenu', fmtRoutes)
        }
    })
}

const formatRoutes = (routes) => {
    let fmtRoutes = []
    routes.forEach(route => {
        if (route.children) {
            route.children = formatRoutes(route.children)
        }

        let fmtRoute = {
            path: route.path,
            component: resolve => {
                require(["./components/admin/" + route.component + '.vue'], resolve)
            },
            name: route.name,
            nameZh: route.nameZh,
            iconCls: route.iconCls,
            meta: {
                requireAuth: true
            },
            children: route.children
        }
        fmtRoutes.push(fmtRoute)
    })
    return fmtRoutes
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    components: { App },
    template: '<App/>'
})
