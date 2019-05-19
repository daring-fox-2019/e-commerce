<template>
  <div>
    <b-row class="cont">
      <b-col sm="2" lg="2">
      </b-col>
      <b-col class="label" sm="8" lg="8">
        <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators
          background="#ababab" img-width="256" img-height="141"
          style="z-index:5;text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd">
          <!-- Text slides with image -->
          <b-carousel-slide class="w-100" width="256" height="141"
            img-src="https://storage.cloud.google.com/jualeun-qfs/1_iDvsmUwzZQxJSKdL0xzwIA.jpg?_ga=2.15569139.-415458887.1554453586">
          </b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide class="w-100"
            img-src="https://storage.cloud.google.com/jualeun-qfs/Digital%20Campaign%20Promo%20Lucky%20Lunar%20banner%20web-01.jpg?_ga=2.16182387.-415458887.1554453586">
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide class="w-100"
            img-src="https://storage.cloud.google.com/jualeun-qfs/HP-stream-8-slider-banner-promo-.jpg?_ga=2.179278561.-415458887.1554453586">
          </b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
            <img slot="img" class="d-block img-fluid w-100" width="256" height="141"
              src="https://storage.cloud.google.com/jualeun-qfs/depositphotos_138455110-stock-illustration-advertising-and-promo-banner.jpg?_ga=2.179278561.-415458887.1554453586"
              alt="image slot">
          </b-carousel-slide>

          <!-- Slide with blank fluid image to maintain slide aspect ratio -->
          <b-carousel-slide>
            <img slot="img" class="d-block img-fluid w-100" width="256" height="141"
              src="https://storage.cloud.google.com/jualeun-qfs/banner-promo-tahun-baru.png?_ga=2.177756000.-415458887.1554453586"
              alt="image slot">
          </b-carousel-slide>
        </b-carousel>
      </b-col>
      <b-col sm="2" lg="2">
      </b-col>
    </b-row>
    <br>
    <b-container class="d-flex listProduct">
      <b-row v-if="productList" class="listProduct" align-h="center">
        <b-col sm="3" lg="2" class="itemBox" v-for="(list,index) in productList.data" :key="index">
          <b-row>
            <h3 id="productName" class="mb-2"
              style="margin-top: 5px; text-align:center; font-weight: 300; font-family:'sans-serif'
              ; width:100%; border-bottom: 1px solid rgb(207, 49, 49);
              color:brown">
              <strong>{{ list.item }}</strong></h3>
          </b-row>
          <b-row>
            <b-col style="height:180px;"><img :src="list.img" id="imgProduct"
                style="max-width: 90%"><span v-if="list.stock <= 0"
                style="font-size:40px; margin: auto; color: rgb(207, 49, 49); right: 0%;position:absolute ;font-weight: 700">
                <strong>OUT OF STOCK</strong> </span></b-col>
          </b-row>
          <b-row style="margin-bottom:-20px">
            <h5 id="productPrice" style="color:red; font-family:Roboto, 'sans-serif'"><small> Rp
                {{list.price.toLocaleString()}}</small></h5>
          </b-row>
          <b-row>

            <!-- <router-link to='itemdetail/"+list._id"' name="detailproduct">Product Detail</router-link> -->
            <router-link :to="{ name: 'detailproduct', params: { id: list._id }}"><button
                id="detail-btn" class="btn btn-outline-danger" @click="todetail(list)">Product
                Detail</button></router-link>
            <span v-if="list.stock <= 0" style="margin:auto; color: rgb(207, 49, 49); font-weight: 900">
              <strong>OUT OF STOCK</strong> </span>

          </b-row>
        </b-col>
      </b-row>
      <router-view @updateproduct="update" v-if="detail" :info="forDetail"
        v-on:updateStockItem='onstart' />
    </b-container>
  </div>
</template>

<script>
  import axios from '@/api/axios';
  import {
    mapActions,
  } from 'vuex';

  export default {
    name: 'home',
    data() {
      return {
        slide: 0,
        sliding: null,
        productList: null,
        detail: false,
        forDetail: null,
      };
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true;
      },
      ...mapActions([
        'deleteCartFalse', // also supports payload `this.nameOfAction(amount)`
      ]),
      update(val) {
        this.$emit('updateproduct', val);
        console.log(val);
      },
      onSlideEnd(slide) {
        this.sliding = false;
      },
      todetail(data) {
        this.forDetail = data;
        this.detail = true;
      },
      onstart() {
        axios
          .get('products', {
            headers: {
              jwtoken: localStorage.jwtoken,
            },
          })
          .then((productList) => {
            console.log('kop');
            this.productList = productList;
          })
          .catch((err) => {
            console.log(err);
          });
      },

    },
    beforeMount() {
      this.onstart();
    },
    watch: {
      detail(val) {
        this.onstart();
      },
      deleteCart(n, o) {
        if (n) {
          this.onstart();
          this.$store.dispatch('deleteCartFalse');
        }
      },
    },
    computed: {
      deleteCart() {
        return this.$store.state.deleteCart;
      },
    },
  };

</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto|Slabo+27px&display=swap');
  #carousel-1 {
    height: 250px;
    margin: auto;
  }

  .img-fluid {
    height: 250px;
    width: 100%;
  }

  .cont {
    margin: 0;
  }

  .listProduct {
    color: black;
    width: 100%;
    margin: auto;
  }

  .itemBox {
    border: solid 1px rgb(250, 191, 30);
    border: solid 1px rgb(207, 49, 49);
    border-radius: 10px;
    height: auto;
    margin: 20px;
  }

  #productName,
  #productPrice {
    margin: auto;
    margin-bottom: 20px;
  }

  .d-flex.listProduct {
    max-width: 1400px;
    margin: auto;
  }

  #detail-btn {
    margin: 15px;
  }

</style>
