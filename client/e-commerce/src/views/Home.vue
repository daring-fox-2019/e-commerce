<template>
  <div class="home">
    
    <InputProduct />
    <Card></Card>
    <ProductDetail></ProductDetail>
    <Login />
    <Register/>
    <Transaction />
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Header from '@/components/Header.vue';
import Card from '@/components/CardDeck.vue';
import ProductDetail from '@/components/ProductDetail.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Transaction from '@/components/Transaction.vue';
import InputProduct from '@/components/InputProduct.vue';

export default {
  name: 'home',
  components: {
    InputProduct,
    Transaction,
    Register,
    Login,
    ProductDetail,
    Card,
    Header,
    HelloWorld,
  },
};
</script>
