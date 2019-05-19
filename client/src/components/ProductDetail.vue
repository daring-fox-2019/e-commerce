<template>
  <!-- BEGIN PRODUCTS -->
  <div class="container">
    <div class="product">
      <div class="img-container">
        <img
          :src="productDetail.image_url"
        >
      </div>
      <div class="product-info">
        <div class="product-content">
          <h1>{{ productDetail.name }}</h1>
          <p>{{ productDetail.description }}</p>
          <div class="buttons">
            <a class="button add" @click.prevent="masukKeranjang()">Add to Cart</a>
            <span class="button" id="price">Rp. {{ productDetail.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- BEGIN PRODUCTS -->
</template>

<script>
import Swal from 'sweetalert2';
import serverapi from "@/api/serverapi";

export default {
  data() {
    return {
      productDetail: '',
    };
  },
  methods: {
    fetchProducts() {
      serverapi
        .get('/products',{
          headers: {
            token:localStorage.getItem('token')
          }
        })
        .then((data) => {
          data.data.forEach(element => {
          if(element._id === this.$route.params.id){
              this.productDetail = element
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response}`,
          });
        });
    },
    masukKeranjang() {
      serverapi
        .post('/carts',{
          headers: {
            token:localStorage.getItem('token')
          },
          member : localStorage.getItem('id'),
          items : this.$route.params.id,
        })
        .then((newCart)=>{
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Added to Cart',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err)=>{
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${err.response}`,
          });
        })
    },
    addcart(data) {
      this.$store.commit('addToCart', data)
    },
  },
  props: ['id'],
  created() {
    this.fetchProducts()
  },
  watch: {
    $route(){
      this.fetchProducts();
    },
  },
};
</script>

<style scoped>
body {
  padding: 1em;
  background: #fff;
  background: whitesmoke;
}

.container {
  width: 100%;
  height: 100%;
}
.container .product {
  width: 680px;
  height: 450px;
  display: flex;
  margin: 1em 0;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 0px 21px 3px rgba(0, 0, 0, 0.15);
  transition: all .1s ease-in-out;
}
.container .product:hover {
  box-shadow: 0px 0px 21px 3px rgba(0, 0, 0, 0.11);
}
.container .product .img-container {
  flex: 2;
}
.container .product .img-container img {
  object-fit: cover;
  width: 250px;
  height: 250px;
}
.container .product .product-info {
  background: #fff;
  flex: 3;
}
.container .product .product-info .product-content {
  padding: .2em 0 .2em 1em;
}
.container .product .product-info .product-content h1 {
  font-size: 1.5em;
}
.container .product .product-info .product-content p {
  color: #636363;
  font-size: .9em;
  font-weight: bold;
  width: 90%;
}
.container .product .product-info .product-content ul li {
  color: #636363;
  font-size: .9em;
  margin-left: 0;
}
.container .product .product-info .product-content .buttons {
  padding-top: .4em;
}
.container .product .product-info .product-content .buttons .button {
  text-decoration: none;
  color: #5e5e5e;
  font-weight: bold;
  padding: .3em .65em;
  border-radius: 2.3px;
  transition: all .1s ease-in-out;
}
.container .product .product-info .product-content .buttons .add {
  border: 1px #5e5e5e solid;
}
.container .product .product-info .product-content .buttons .add:hover {
  border-color: #6997b6;
  color: #6997b6;
}
.container .product .product-info .product-content .buttons .buy {
  border: 1px #5e5e5e solid;
}
.container .product .product-info .product-content .buttons .buy:hover {
  border-color: #6997b6;
  color: #6997b6;
}
.container .product .product-info .product-content .buttons #price {
  margin-left: 4em;
  color: #5e5e5e;
  font-weight: bold;
  border: 1px solid rgba(137, 137, 137, 0.2);
  background: rgba(137, 137, 137, 0.04);
}
</style>
