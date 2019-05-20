import Vue from 'vue'
import Router from 'vue-router'
import SignInForm from '@/components/SignInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'

import Cart from '@/views/Cart.vue'
import Shipment from '@/views/Shipment.vue'
import Checkout from '@/views/Checkout.vue'

import User from '@/views/User.vue'
import UserProfile from '@/components/UserProfile.vue'
import UserTransaction from '@/components/UserTransaction.vue'

import HomePage from '@/views/HomePage.vue'

import Product from '@/views/Product.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ProductCategory from '@/views/ProductCategory.vue'

import AdminSignup from '@/views/AdminSignup.vue'
import AdminListProduct from '@/views/AdminListProduct.vue'
import AdminCreateProduct from '@/views/AdminCreateProduct.vue'
import AdminEditProduct from '@/views/AdminEditProduct.vue'
import AdminOrders from '@/views/AdminOrders.vue'

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
        path: '/admin/edit-product/:id',
        name: 'admin-edit-product',
        component: AdminEditProduct
    },
    {
        path: '/admin/orders',
        name: 'admin-orders',
        component: AdminOrders
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
        path: '/checkout',
        name: 'checkout',
        component: Checkout
    },
    {
        path: '/user/:id',
        component: User,
        children: 
        [
            {
              path: 'profile',
              component: UserProfile
            },
            {
              path: 'transaction',
              component: UserTransaction
            }
        ]
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