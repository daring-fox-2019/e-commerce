<template>
<div class="fixed-top container-fluid animated slideInDown" style="padding:100px; background-image: linear-gradient(to right, rgba(0, 0, 0,0.4), rgba(0, 0, 0,0.4))">
  <div class="container" style="z-index:1000">
    <div class="card">
      <div class="row no-gutters">
        <aside class="col-sm-5 border-right">
          <article class="gallery-wrap">
            <div class="img-big-wrap">
              <div>
                  <img :src="item.image" width="100%" style="max-height:520px;overflow:hidden">
              </div>
            </div>
          </article>

        </aside>
        <aside class="col-sm-7">
          <article class="p-5">
            <h3 class="title mb-3">{{ item.name }}</h3>

            <div class="mb-3">
              <var class="price h3 text-warning">
                <span class="currency"> Rp.</span>
                <span class="num"> <b> {{ displayPrice }} </b> </span>
              </var>
            </div>

            <dl>
              <dt>Description</dt>
              <dd>
                <p>
                  {{ item.description }} <br>
                  <b>stock : <i> {{ item.stock }} </i></b>
                </p>
              </dd>
            </dl>
            <dl>
              <dd>
                <div>
                <button class="btn btn-sm btn-outline-secondary mr-2 mb-2" v-for="(tag,i) in item.tags" :key="i"> {{ tag.text }}</button>
                </div>
              </dd>
            </dl>

            <hr>
            <div v-if="item.stock == 0">
              <p> Out Of Stock </p>
            </div>
            <div class="row" v-if="isLogin && item.stock != 0">
              <div class="col-sm-12">
                <dl class="dlist-inline">
                  <dt>Quantity:</dt>
                  <dd>
                    <select class="form-control form-control-sm mt-3" v-model="qty" required>
                      <option v-for="(i) in item.stock" :key="i"> {{ i }} </option>
                    </select>
                  </dd>
                </dl>
              </div>
            </div>
            <hr v-if="isLogin">
            <b-button variant="success" v-if="isLogin" @click="addToCart"> add to cart </b-button>
            <b-button variant="outline-secondary" class="ml-2" @click="toHome"> <i class="fas fa-times"></i>  close </b-button>
          </article>
        </aside>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from '@/database/axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      item: {},
      qty: null,
    };
  },
  computed: {
    displayPrice() {
      return new Intl.NumberFormat({ style: 'currency' }).format(this.item.price);
    },
    ...mapState(['isLogin']),
  },
  mounted() {
    const { id } = this.$route.params;
    this.getItemDetail(id);
  },
  watch: {
    $route() {
      const { id } = this.$route.params;
      this.getItemDetail(id);
    },
  },
  methods: {
    addToCart() {
      if (this.qty == null) {
        this.$swal('Ooopss...', 'quantity must not empty', 'info');
      } else {
        axios.post('/carts',
          { product_id: this.$route.params.id, qty: this.qty },
          { headers: { token: localStorage.getItem('token') } })
          .then(({ data }) => {
            this.$store.commit('setAddCart', data);
            this.$swal('Yay', 'check your cart...', 'success');
          })
          .catch((err) => {
            this.$swal(':(', `${err.response.data.message}`, 'error');
          });
      }
    },
    toHome() {
      this.$router.push('/');
    },
    getItemDetail(id) {
      axios.get(`/products/${id}`, { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          this.item = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
