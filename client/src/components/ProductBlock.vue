<template>
<div>
  <div class="my-2 addproduct productpic producttext border-0 card bg-dark text-white">
    <img :src="product.image" class="card-img " alt="...">
    <div  v-on:click.prevent="getSinglePage(product._id)" class="ovl px-3 py-3 card-img-overlay">
      <div class="row no-gutters">
        <div class="col-9">
          <h5 class="producttext text-dark card-title">{{product.name}}</h5>
          <br>
          <p class="producttext text-dark card-text">{{product.price}}</p>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  props : ['product'],
  data() {
    return {
      
    }
  },
  methods: {
    getSinglePage(id) {
      this.$emit('getsinglepage', id)
      // this.$router.push(`/products/${id}`)
    }
  },
  name: "ProductBlock"
};
</script>

<style>

#circleswatch {
  margin: 0;
  border-radius: 50%;
	list-style: none;
	background-image: url("../assets/dummy1.jpg");
	background-repeat: no-repeat;
	background-position: left center;
	background-size: 40px;
  /* list-style-type: none !important;
  list-style-image: url('../assets/dummy1.jpg') */

  /* background: url('') no-repeat left top; */
}

#addproduct {
  width : 50%;
  border-style : 1px solid rgb(214, 210, 210) !important;
  border-radius : 22px;
}

.productpic:hover button{
  background-color: rgb(214, 208, 208);
}

.productpic:hover h5 p{
  text-transform: underline;
}

.productpic:hover {
  transition: 0.4s all;
  opacity: 0.9;
}

.productpic:hover img {
    background: url("../assets/dummy2.jpg");
}

.producttext {
    list-style: none;
    display: inline-block;
}

.producttext {
    position: relative;
    font-size: 20px;
    font-weight: 500;
    overflow: hidden;
    transition: 0.4s all;
}

.producttext:before {
    content: '';
    width: 60px;
    position: absolute;
    border-bottom: 2px solid #313131;
    bottom: 0;
    right: 350px;
    transition: 0.4s all;
}

.producttext:hover:before {
    right: 0;
}
</style>
