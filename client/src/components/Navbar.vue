<template>

    <nav >
        <div class="navbar navbar-expand-lg navbar-light bg-white">
            <div style="width: 30em;">
                <router-link class="navbar-brand" to="/" style="width: 2em;">
                    <img src="../assets/icon/baby-icon.png" alt="baby icon" style="width: 100%;"> 
                    <span>richiebaby</span>
                </router-link>
            </div>

            <div class="mr-auto" style="width: 47em;
margin-left: -258px;">
                <form style="display: flex;">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>

            <div v-if="isLoggedIn" class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent" style="justify-content: flex-end !important;">
                <ul class="navbar-nav" >
                <li v-if="!isAdmin" class="nav-item" style="width: 40px; align-self: center;">
                    <router-link to="/cart">
                        <div class="cart">
                            <i class="fas fa-baby-carriage"></i>
                            <span class="count">{{countCart}}</span>
                        </div>
                    </router-link>
                </li>
                
                <li v-if="isAdmin" class="nav-item dropdown">
                    <span 
                        class="nav-link dropdown-toggle cursor-pointer"
                        role="button" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                    >
                    Dashboard Admin
                    </span>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link class="dropdown-item" :to="{ name : 'admin-orders' }">Order List</router-link>
                        <router-link class="dropdown-item" :to="{ name : 'admin-list-product' }">Product List</router-link>
                        <router-link class="dropdown-item" :to="{ name : 'admin-create-product' }">Create Product</router-link>
                        <div class="dropdown-divider"></div>
                        <span 
                            class="dropdown-item" 
                            @click="clickLogout"
                        >Logout</span>
                    </div>
                </li>
                <li  v-if="!isAdmin" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="left: -6em;">
                        
                    <span class="dropdown-item" href="#">Edit Profile</span>
                    <div class="dropdown-divider"></div>
                    <span class="dropdown-item" @click="clickLogout">Logout</span>
                    </div>
                </li>
                
                </ul>
            </div>

            <div v-else class="d-flex justify-content-end">
                <div style="margin-right: 15px;">
                    <router-link to="/signin">Sign In</router-link>
                </div>
                <div>
                    <router-link to="/signup">Sign Up</router-link>
                </div>
            </div>
        </div>

        <div>
            <ul class="sub-nav">
                <router-link to="/">
                    <li>Home</li>
                </router-link>
                <router-link to="/product/category?category=cereal">
                    <li>Cereals</li>
                </router-link>
                <router-link to="/product/category?category=shirt">
                    <li>Shirt</li>
                </router-link>
                <router-link to="/product/category?category=aqiqah">
                    <li>Aqiqah</li>
                </router-link>
                <router-link to="/product/category?category=birthday">
                    <li>Birthday</li>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
import api from '@/api/localapi'

export default {
    data() {
        return { cart: 0 }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.isLoggedIn
        },
        countCart() {
            return this.$store.state.cart
        },
        isAdmin() {
            return this.$store.state.isAdmin
        }
    },
    mounted() {
        this.getCart()
        this.cart = this.$store.state.cart
    },
    methods: {
        clickLogout() {
            this.$emit('click-logout')
        },
        getCart() {
            if(localStorage.token) {
                api.defaults.headers.common['token'] = localStorage.token
        
                api
                .get('/carts')
                .then(({data}) => {
                    console.log('data length: ', data.length);
                    this.$store.dispatch('setCart', data.length)
                })
                .catch(err=> {
                    console.log('err cart: ', err);
                })
            }
        }
    },
}
</script>

<style scoped>
.navbar {
    padding: 11px 7em;
    border-bottom: solid 1px #ededed;
}
.sub-nav {
    display: flex;
    justify-content: space-around;
}
.sub-nav { 
    padding: 10px 0px;
    color: #84ab49;
    font-weight: 500;
    border-bottom: solid 1px #ededed;
}
.sub-nav li {
    list-style: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    flex-shrink: inherit;
    justify-items: self-end;

}
.sub-nav li:hover { cursor: pointer; }
.cart {
    position: relative;
}

.cart >.count {
    border-radius: 50%;
    background-color: #ed591f;
    padding: 1px 6px;
    color: #fff;
    font-size: 14px;
    position: absolute;
    top: -5px;
}
</style>
