<template>
  <div v-if="isLogin">
    <div class="container-fluid">
      <h6 class="my-3 mx-3 font-weight-bold">See Categories</h6>
      <div class="row container">
        <CategoriesCard v-for="(category, index) in categories" :key="index" :category="category"></CategoriesCard>
      </div>
      <a
        @click.prevent="getCategory(item._id)"
        class="mx-4 px-4 text-decoration-none"
        href="#"
        v-for="(item, index) in categories"
        :key="index"
        style="color: black"
      >{{item.name}}</a>
    </div>

    <div class="container mt-5">
      <div v-if="$route.name == 'home'">
        <h5 class="display-4">Top New Designs</h5>
        <h6 class="desc">/ Carefully selected from the most awarded designers</h6>
      </div>
      <div v-if="$route.name == 'category'">
        <h5 class="display-4">By Category</h5>
        <h6 class="desc">/ Mobile UI design will never be boring with these super funny graphics</h6>
      </div>
    </div>

    <div class="row pl-5 justify-content-around" v-if="$route.name == 'home'">
      <div
        class="container pt-5 col-xs-12 col-md-6 col-lg-4"
        v-for="(product, index) in products"
        :key="index"
      >
        <a @click.prevent="getDetails(product._id)" href>
          <ProductsCard :product="product"></ProductsCard>
        </a>
      </div>
    </div>
    <div class="row pl-5 justify-content-around" v-if="$route.name == 'category'">
      <div
        class="container pt-5 col-xs-12 col-md-6 col-lg-4"
        v-for="(product, index) in products"
        :key="index"
      >
        <a @click.prevent="getDetails(product._id)" href>
          <router-view :product="product"></router-view>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsCard from "@/components/ProductsCard.vue";
import CategoriesCard from "@/components/CategoriesCard.vue";
import axios from "../api/localhost.js";

export default {
  name: "home",
  props: ["isLogin", "fetchProducts", "products"],
  data() {
    return {
      categories: [],
      category : ''
    };
  },
  components: {
    ProductsCard,
    CategoriesCard
  },
  methods: {
    getCategory(id) {
      this.$emit("sort-by-category", id);
    },
    getDetails(id) {
      this.$router.push(`/products/${id}`);
    }
  },
  created() {
    axios
      .get("/categories")
      .then(({ data }) => {
        this.categories = data;
        console.log(data);
        
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    $route() {
      axios
        .get("/categories")
        .then(({ data }) => {
          this.categories = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.container-fluid {
  height: 17vh;
  border-bottom: 1px solid #f6f5f5;
}
</style>
