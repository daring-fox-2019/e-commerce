<template>
  <div>
    <h1>GUNDAM STORE</h1>
    <button class="btn btn-danger" v-if="!isCart" @click.prevent="opencart">
      <i class="fas fa-shopping-cart" style="font-size:25px"></i>
    </button>
    <div v-if="isCart" class="container">
      <Cart
        v-bind:iDUser="iDUser"
        v-on:checkoutcart="checkoutUpdate"
        v-on:hapuscart="deletecart"
        v-bind:carts="carts"
        v-on:backhome="closeCart"
      />
    </div>
    <div v-if="!isCart" class="container" style="height:300px; width:500px">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide
          caption="First slide"
          img-src="https://i.pinimg.com/originals/d7/a0/91/d7a0914daee5e57e759981a4fa72a6dc.jpg"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Second Slide"
          img-src="http://livedoor.blogimg.jp/hacchaka/imgs/e/b/ebe9b581.jpg"
        ></b-carousel-slide>
        <b-carousel-slide caption="Third Slide" img-src="https://picsum.photos/1024/480/?image=22"></b-carousel-slide>
      </b-carousel>
    </div>

    <h2 v-if="!isCart" class="text-center">OUR PRODUCT</h2>

    <div v-if="!isCart" class="container">
      <div class="row">
        <div class="col-3 mt-3" v-for="(gundam, index) in gundams" :key="index" :gundam="gundam">
          <CardProduct v-on:addcart="createCart" :gundam="gundam"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ecommerce from "@/api/e-commerceApi";
import CardProduct from "@/components/CardProduct.vue";
import Cart from "@/views/Cart.vue";
import Swal from "sweetalert2";
export default {
  name: "home",
  components: {
    CardProduct,
    Cart
  },
  data() {
    return {
      userEmail: "",
      iDUser: "",
      isCart: false,
      gundams: [],
      carts: []
    };
  },
  created() {
    this.fetchData();

    if (localStorage.token) {
      ecommerce.defaults.headers.common["token"] = localStorage.token;
      ecommerce
        .get("/decode")
        .then(({ data }) => {
          this.userEmail = data.email;
          this.iDUser = data.id;
          this.fetchCart();
          if (data.role === "admin") {
            this.$router.push("/admin");
          } else {
            this.$router.push("/");
          }
        })
        .catch(err => {
           Swal.fire({
            title: "ERORR",
            text: `Something Wrong`,
            type: "error",
            confirmButtonText: "Cool"
          });
        });
    } else {
    }
  },
  methods: {
    opencart() {
      this.isCart = true;
    },
    closeCart() {
      this.isCart = false;
    },
    fetchData() {
      ecommerce
        .get("/")
        .then(({ data }) => {
          this.gundams = [];
          for (const gundam of data) {
            this.gundams.push(gundam);
          }
        })
        .catch(err => {
          Swal.fire({
            title: "ERORR",
            text: `Something Wrong`,
            type: "error",
            confirmButtonText: "Cool"
          });
        });
    },
    createCart(state) {
      ecommerce
        .post("/cart", {
          idUser: this.iDUser,
          productId: state.productId,
          quantity: state.quantity
        })
        .then(({ data }) => {
          Swal.fire({
            title: "Add To Cart Success",
            text: `Please hit red Cart button`,
            type: "success",
            confirmButtonText: "Cool"
          });
        })
        .catch(err => {
           Swal.fire({
            title: "ERORR",
            text: `Something Wrong`,
            type: "error",
            confirmButtonText: "Cool"
          });
        });
    },
    fetchCart() {
      ecommerce
        .get(`/cart/${this.iDUser}`)
        .then(({ data }) => {
          this.carts = [];
          for (const cart of data) {
            this.carts.push(cart);
          }
          
        })
        .catch(err => {
           Swal.fire({
            title: "ERORR",
            text: `Something Wrong`,
            type: "error",
            confirmButtonText: "Cool"
          });
        });
    },
    deletecart(id) {
      ecommerce
        .delete(`/cart/${id}`)
        .then(({ data }) => {
          Swal.fire({
            title: "delete Success",
            type: "success",
            confirmButtonText: "Cool"
          });
          this.fetchCart();
        })
        .catch(err => {
          Swal.fire({
            title: "ERORR",
            text: `Something Wrong`,
            type: "error",
            confirmButtonText: "Cool"
          });
        });
    },
    checkoutUpdate(id) {
      ecommerce
        .patch(`/cart/${id}`)
        .then(({ data }) => {
          Swal.fire({
            title: "Checkout Success",
            text: `Thank You For Shopping`,
            type: "success",
            confirmButtonText: "Cool"
          });
          this.fetchCart();
        })
        .catch(err => {
           Swal.fire({
            title: "ERORR",
            text: `Something Wrong`,
            type: "error",
            confirmButtonText: "Cool"
          });
        });
    }
  }
};
</script>
