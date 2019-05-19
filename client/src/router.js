import Vue from 'vue'
import Router from 'vue-router'
import SignInForm from '@/components/SignInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'

import HomePage from '@/views/HomePage.vue'
import Product from '@/views/Product.vue'
import ProductDetail from '@/views/ProductDetail.vue'

import AdminListProduct from '@/views/AdminListProduct.vue'
import AdminCreateProduct from '@/views/AdminCreateProduct.vue'

import NotFound from '@/views/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
        path: '/admin/list-product',
        name: 'admin-list-product',
        component: AdminListProduct
    },
    {
        path: '/admin/create-product',
        name: 'admin-create-product',
        component: AdminCreateProduct
    },
    {
        path: '/signin',
        name: 'signin',
        component: SignInForm,
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUpForm,
    },
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/product',
        name: 'product',
        component: Product,
    },
    {
        path: '/product/:id',
        name: 'product-detail',
        component: ProductDetail,
        props: true
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
        props: true
    },
    {
        path: '*',
        redirect: { name: '404', params: { resource: 'page' } }
    }
  ]
})

export default router