<template>
  <div class="col-lg-3 p-3 col-sm-6 col-xs-12 animated fadeIn" >
    <div class="card">
      <div style="overflow:hidden; height:220px;background-color:#f1f1f1">
        <img class="card-img-top" :src="item.image" width="100%" >
      </div>
        <div class="card-body">
          <h5 class="card-title"> {{ item.displayName }}</h5>
          <p class="card-text"><b>Rp. {{ displayPrice }}</b></p>
        </div>
        <div class="d-flex justify-content-end mr-3 mb-3">
          <b-button class="mr-1" size="sm" variant="success" v-if="!owner && isLogin && role!='admin' " @click="toDetail(item._id)"> Add to cart </b-button>
          <b-button :class="`ml-1 ${owner ? 'mr-2' : ''}`" size="sm" variant="outline-success" @click="toDetail(item._id)" v-if="!isLogin"> see detail </b-button>
          <b-button class="mr-1" size="sm" variant="secondary" v-if=" role=='admin' || owner && isLogin" @click="editProduct(item._id)"> Edit </b-button>
          <b-button class="ml-1" size="sm" variant="outline-secondary" @click="deleteItem(item._id)" v-if="role=='admin' || owner && isLogin"> Delete </b-button>
        </div>
        <div class="card-footer">
          <small class="text-muted"> {{ lastEdited }}</small>
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from '@/database/axios';
import { mapState } from 'vuex';

export default {
  props: ['item'],
  data() {
    return {
      user_id: localStorage.getItem('id'),
    };
  },
  watch: {

  },
  computed: {
    ...mapState(['isLogin', 'role']),
    owner() {
      return this.item.seller_id == this.user_id;
    },
    lastEdited() {
      return moment(this.item.updatedAt).startOf('hour').fromNow();
    },
    displayPrice() {
      return new Intl.NumberFormat({ style: 'currency' }).format(this.item.price);
    },
  },
  methods: {
    editProduct(id) {
      this.$router.push(`/manage-product/${id}`);
    },
    deleteItem(id) {
      axios.delete(`/products/${id}`, { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          this.$swal('Yay...', 'delete item success', 'success');
          this.$store.commit('deleteItem', id);
        })
        .catch((err) => {
          this.$swal('Oopss...', `${err.response.data.message}`, 'error');
        });
    },
    toDetail(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>
