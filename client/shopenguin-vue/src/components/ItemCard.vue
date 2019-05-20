<template>
  <div>
    <div class="container my-3">
      <div class="row">
        <div class="col-3" v-for="item in allItems" :key="item._id">
          <router-link :to="`/item/${item._id}`">
            <b-card
              :title="item.name"
              :img-src="item.image"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2 item-card"
            >
              <b-card-text class="price-color">{{ priceFormat(item.price) }}</b-card-text>
            </b-card>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "item-card",
  created() {
    this.getAllItems();
  },
  methods: {
    ...mapActions(["getAllItems"]),
    clearAllItems() {
      this.$store.commit("clearAllItems");
    },
    priceFormat(price) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });

      return formatter.format(price);
    }
  },
  computed: {
    ...mapState(["allItems"])
  }
};
</script>

<style>
.item-card {
  border: 0;
}

.item-card:hover {
  border: 3px solid rgba(0, 64, 107, 0.438);
}

.price-color {
  color: rgb(173, 1, 1);
}

</style>
