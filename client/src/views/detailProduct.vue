<template>
  <div>
    <div class="container mt-5">
      <div class="row mb-3">
        <div class="col-lg-4">
          <div class="card">
            <div class="card-img-wrap">
              <img class="card-img-top" :src="image" alt="Card image cap">
            </div>
          </div>
        </div>
        <div class="col-8">
          <h2>{{title}}</h2>
          <p>Price : Rp.{{price}}</p>
          <p>Stock : {{stock}}</p>
          <button type="button" class="btn btn-info" @click="addToCard">Add To Card</button>
        </div>
      </div>
      <div>
        <h4>Descriptions</h4>
        {{description}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios.js";

export default {
  name: "detailProduct",
  data() {
    return {
      idProduct: "",
      valid: true,
      title: "",
      description: "",
      stock: "",
      price: "",
      image: ""
    };
  },
  created() {
    this.idProduct = this.$route.params.id;
    this.getOne();
  },
  wacth() {
    this.getOne();
  },
  methods: {
    getOne() {
      axios
        .get(`products/${this.$route.params.id}`, 
          { headers : { token : localStorage.getItem('token')} }
         )
        .then(({ data }) => {
          console.log(data);
          this.title = data.title;
          this.description = data.description;
          this.stock = data.stock;
          this.image = data.image;
          this.price = data.price;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getImage() {
      this.image = this.$refs.image.files[0];
    },
    addToCard() {
      axios
        .put(`products/${this.$route.params.id}/addCart`,null,
           { headers : { token : localStorage.getItem('token')}})
        .then(({ data }) => {
          this.$router.push({ path : "/cartProduct"})
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.card-img-wrap {
  overflow: hidden;
  position: relative;
}
.card-img-wrap:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
  opacity: 0;
  transition: opacity 0.25s;
}
.card-img-wrap img {
  transition: transform 0.25s;
  width: 100%;
}
.card-img-wrap:hover img {
  transform: scale(1.2);
}
.card-img-wrap:hover:after {
  opacity: 1;
}
</style>
