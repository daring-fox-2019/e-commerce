<template>
  <v-hover>
    <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="300">
      <v-img :aspect-ratio="16/9" :src="product.image">
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >$14.99</div>
        </v-expand-transition>
      </v-img>
      <v-card-text class="pt-4" style="position: relative;">
        <v-btn absolute color="yellow" class="grey--text" fab large right top>
          <v-icon>shopping_cart</v-icon>
        </v-btn>
        <div class="font-weight-light grey--text title mb-2">Fiqh</div>
        <h3 class="grey--text mb-2">Sifat Shalat Nabi</h3>
        <div class="font-weight-light black--text mb-2 text-truncate">
          Our Vintage kitchen utensils delight any chef.Made of bamboo by hand
        </div>
      </v-card-text>
      <v-layout row v-if="$store.state.user && $store.state.user.role === 'admin'">
        <v-flex>
          <v-btn color="blue" small>Update</v-btn>
          <v-btn color="red" small>Delete</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-hover>
</template>
<script>
export default {
    props: ['product']
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>


