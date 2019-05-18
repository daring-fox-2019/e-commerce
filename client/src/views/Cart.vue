<template>
  <div class="d-flex justify-content-center">
    <b-container fluid class="px-0">
      <b-row>
        <b-col cols="8" class="p-2">
          <!-- left div -->
          <!-- card here -->
          <CartCard
          v-for="(card, index) in 4"
          :key="index"/>
        </b-col>

        <!-- right div -->
        <b-col cols="4" class="px-3 py-2">
          <div>
            <b-container fluid class="border">
              <b-row >
                <b-col class="px-0 border"><div>Checkout</div></b-col>
              </b-row>
              <b-row>
                <b-col class="px-0 border">{List item}</b-col>
              </b-row>
              <b-row>
                <b-col class="px-0 border">{Total}</b-col>
              </b-row>
              <b-row class="p-2">
                <b-button block variant="primary" class="py-1">Block Level Button</b-button>
              </b-row>
            </b-container>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CartCard from '@/components/CartCard.vue';

export default {
  name: 'Cart',
  components: {
    CartCard,
  },
};
</script>

<style>
</style>
