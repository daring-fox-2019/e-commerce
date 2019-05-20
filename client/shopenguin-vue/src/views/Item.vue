<template>
  <div class="item">
    <Navbar1/>
    <Navbar2/>
    <div class="container my-3">
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="currentItem.image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body>
              <div>
                <h2 style="margin-bottom: 0;">{{ currentItem.name }}</h2>
              </div>
              <div class="mb-2">
                <span style="font-size: 85%;">by {{ currentItem.sellerId.fullName }}</span>
              </div>
              <b-card-text>
                <div class="row">
                  <div class="col price-color">{{ priceFormat(currentItem.price) }}</div>
                </div>

                <b-button variant="primary">
                  <i class="fas fa-shopping-cart"></i> Add to Cart
                </b-button>
                <b-button variant="outline-success">
                  <i class="fas fa-edit"></i> Edit
                </b-button>
                <b-button variant="outline-danger">
                  <i class="fas fa-trash-alt"></i> Delete
                </b-button>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import Navbar1 from "@/components/Navbar1.vue";
import Navbar2 from "@/components/Navbar2.vue";

export default {
  name: "item-card",
  components: {
    Navbar1,
    Navbar2,
  },
  created() {
    this.getCurrentItem(this.$route.params.id);
    console.log(this.$route.params);
  },
  methods: {
    ...mapActions(["getCurrentItem", "deleteItem"]),
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
    ...mapState(["currentItem"])
  }
};
</script>
