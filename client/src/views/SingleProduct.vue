<template>
  <div style="background-color:rgb(245, 246, 242)" class="single px-5">
    <div class="row">
      <div style="padding:60px;" class="col-sm-6 col-md-6 col-xs-12 px-5 py-5">
        <div class="titlesingle row">{{singleProduct.name}}</div>
        <div class="descsingle row">{{singleProduct.description}}</div>
        <hr>
        <div class="row">
          <div class="col-lg-6 col-md-12 sm-12 py-2">
            <div
              v-if="singleProduct.price"
              class="border-right pricesingle row"
            >IDR {{singleProduct.price.toLocaleString()}}</div>
          </div>
          <div class="col-lg-6 col-md-12 sm-12">
            <div class="stocksingle py-2 px-3 row">Stock : {{singleProduct.stock}}</div>
          </div>

          <button @click.prevent="decQty()" style="border-right:0px;" class="btn btnsingle incdec">
            <i class="fas fa-minus"></i>
          </button>
          <div class="text-align-center incdecmid">
            <span class="inc text-center">{{total}}</span>
          </div>
          <button @click.prevent="incQty()" style="border-left:0px;" class="btn incdec">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 sm-12 px-0 py-2">
            <button @click.prevent="addToCart" class="btn btn-dark atc">Add To Cart</button>
          </div>
        </div>
      </div>
      <div v-if="singleProduct.image" class="col-sm-6 col-md-6 col-xs-12">
        <img :src="singleProduct.image" class="card-img" alt="...">
      </div>
    </div>
    <div class="row" style="height:10vh; ;background-color:rgb(245, 246, 242)">

    </div>
  </div>
</template>

<script>
export default {
  props: [],
  created() {
    if (this.$route.params.id != undefined) {
      this.fetchOneProduct(this.$route.params.id);
      console.log("HHEHEHEHEHEHE ya cek dpt satu he");
      console.log(this.$route.params.id);
    }
  },
  data() {
    return {
      singleProduct: {},
      total: 0
    };
  },
  methods: {
    fetchOneProduct(id) {
      this.axios
        .get(`/products/${id}`)
        .then(({ data }) => {
          console.log(data, "????");

          this.singleProduct = data;
          this.$router.push(`/products/${id}`);
        })
        .catch(err => {});
    },
    incQty() {
      console.log("woi?");

      if (this.total < this.singleProduct.stock) {
        this.total++;
      }
    },
    decQty() {
      if (this.total > 0) {
        this.total--;
      }
    },
    addToCart() {
      let productId = this.$route.params.id;
      this.axios
        .post(
          "carts",
          {
            userId: localStorage.getItem("userId"),
            productId,
            amount: this.total
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.swal.fire(
            "Added to cart",
            "You may continue shopping",
            "success"
          );
        })
        .catch(err => {
          this.swal.fire(
            "Something is wrong",
            "Please reload the page",
            "warning"
          );

          console.log(err, "errr bagian add to cart?");
        });
    }
  },

  watch: {
    $route() {
      if (this.$route.params.id != undefined) {
        this.fetchOneProduct(this.$route.params.id);
        console.log("HHEHEHEHEHEHE ya cek dpt satu he");
        console.log(this.$route.params.id);
      }
    }
  }
};
</script>

<style>


.inc {
  margin-top: 5rem;
}
.titlesingle {
  height: 7rem;
  font-family: "Vollkorn", serif;
  font-weight: 600;
  font-size: 50px;
}
.descsingle {
  height: 7rem;
  font-weight: 400;
  font-family: "Lato", sans-serif;
  font-size: 15px;
  letter-spacing: 0.17em;
}

.pricesingle {
  height: 4rem;
  font-weight: 600;
  font-family: "Lato", sans-serif;
  font-size: 20px;
  letter-spacing: 0.1em;
}
.stocksingle {
  height: 4rem;
  font-family: "Lato", sans-serif;
}

.atc {
  border-radius: 0px;
  color: white;
  letter-spacing: 0.19em;
  text-transform: uppercase;
}

.incdecmid {
  background-color: white;
  border-top: 2px darkgray solid;
  border-bottom: 2px darkgray solid;
}
.incdec {
  background-color: white;
  border-radius: 0px;
  border: 2px darkgray solid;
  color: darkgray;
}
</style>
