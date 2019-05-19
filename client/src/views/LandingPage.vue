<template>
    <div>
        <div class="container-fluid top m-0 py-5 px-5">
            <h1 class="display-5 ml-5">"The All In One"</h1>
            <h1 class="display-5 ml-5"> Digital Publishing Platform</h1>
            <h3 class="h5 ml-5">Get a beautiful design to boost your UI/UX!</h3>
            <br>
            <a href="#" @click.prevent="shop" type="button" class="btn btn-light btn-lg ml-5">Continue Shop</a>
            <img class="pr-5 mr-1" src="https://maxst.icons8.com/_nuxt/ouch/img/landing-art@2x.d256a30.png" alt="" srcset="">
        </div>
        <div class="container">
        </div>
    </div>
</template>

<script>
    export default {
        props : ['isLogin'],
        methods: {
            shop() {
                if (this.isLogin) {
                    this.$router.push('/home')
                } else {
                    this.$swal('You must login to continue','warning')
                }
            }
        },
    }
</script>
<style scoped>
    .container-fluid {
        background-color: #9dada3;
        width: 100%;
        height: 70vh;
    }
    .container-fluid img {
        margin: -5%;
        width: 70%;
        float: right;
    }
     h1, h3 {
        font-family: 'Paytone One', sans-serif;
    }
    .btn {
        background: none;
        font-weight: 400;
        transition: 0.3s;
        border: black 2px solid;
        letter-spacing: -0.2px;
    }
    .btn:hover {
        background: #083232;
        color: white;
        border: black 1px solid;;
    }
</style>
