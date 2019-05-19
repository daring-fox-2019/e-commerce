import Vue from 'vue'
import Router from 'vue-router'
import SignInForm from '@/components/SignInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'

import Cart from '@/views/Cart.vue'
import Shipment from '@/views/Shipment.vue'

import HomePage from '@/views/HomePage.vue'

import Product from '@/views/Product.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ProductCategory from '@/views/ProductCategory.vue'

import AdminSignup from '@/views/AdminSignup.vue'
import AdminListProduct from '@/views/AdminListProduct.vue'
import AdminCreateProduct from '@/views/AdminCreateProduct.vue'

import NotFound from '@/views/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
        path: '/admin/signup',
        name: 'admin-signup',
        component: AdminSignup
    },
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
        path: '/product/category',
        name: 'product-category',
        component: ProductCategory
    },
    {
        path: '/product/:id',
        name: 'product-detail',
        component: ProductDetail
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/cart/shipment',
        name: 'shipment',
        component: Shipment
    },
    {
        path: '/checkout'
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