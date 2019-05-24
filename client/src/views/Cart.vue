<template>
  <div class="d-flex justify-content-center">
    <b-container fluid class="px-0">
      <b-row>
        <b-col>

        </b-col>
      </b-row>
      <b-row>
        <b-col cols="8" class="p-2">
          <!-- left div -->
          <!-- card here -->
          <b-row>
            <b-col style="font-size: 20px">
            <strong>{{username}}'s Cart</strong>
            </b-col>
          </b-row>
          <CartCard
          v-for="item in cart"
          :item="item"
          :key="item._id"/>
        </b-col>

        <!-- right div -->
        <b-col cols="4" class="px-3 py-2">
          <CartCheckout />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CartCard from '@/components/CartCard.vue';
import CartCheckout from '@/components/CartCheckout';

export default {
  props: ['item'],
  name: 'Cart',
  components: {
    CartCard,
    CartCheckout,
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      this.$store.dispatch('fetchUserData', localStorage._id);
    },
  },
  computed: {
    cart() {
      return this.$store.state.user.cart;
    },
    username() {
      return localStorage.name;
    },
  },
};
</script>

<style>
</style>
