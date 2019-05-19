<template class='card'>

  <b-card
    tag="article"
    style="max-width: 20rem;height: 300px;"
    class=""
  >
  <div style="height: 55px; overflow:hidden" class='mb-2'>
    <router-link :to='{name: "product details", params:{id: product._id}}' class='title'>
      <b-card-title>{{ product.title }}</b-card-title>
    </router-link>
  </div>
  <router-link :to='{name: "product details", params:{id: product._id}}'>
    <div style="height: 100px" class='row'>
      <b-card-img :src="product.image" class="rounded-0" style="max-height:100%;object-fit:contain"></b-card-img>
    </div>
  </router-link>
  <div slot="footer">
    <div class="d-flex justify-content-between">
      <div class='d-flex justify-content-between' style="height:10px">
        <p class='pt-1'>Rp.</p>
        <h6 text-muted class='pt-2'>{{ product.formatPrice }}</h6>
      </div>
      <router-link :to='{name: "product details", params:{id: product._id}}'>
        <b-button size='sm' variant='light'>Details</b-button>
      </router-link>
    </div>
  </div>
  </b-card>


</template>

<script>
import axios from '@/api/server/axios'
export default {
  name: 'productCard',
  data(){
    return {

    }
  },
  props: ['product'],
  methods:{
    addCart(){
      axios
        .post('/carts', {
          productId: this.product._id
        },{
          headers: {token: localStorage.token}
        })
        .then(({ data })=>{
          this.$emit('update')
          this.$router.push({name: 'cart'})
        })
    }
  },
}
</script>

<style scoped>
.card:hover{
  text-decoration: none
}
.title:hover{
  text-decoration: none;
  color:cadetblue
}
.title{
  color:black;
}
.card {
  color : black
}
</style>

