<template>
   <div
      id = 'detail'
      class="jumbotron jumbotron d-flex justify-content-center"
      style="background-color:#F8F1BD; "
    >
      <div class="col">
        
        <img
        v-bind:src= "item.image"
          style
          class="img-fluid"
          alt
        >
      </div>
      <div class="col">
        <div class="container">
          <h2 class="display">{{ item.title }}</h2>
          <p class="lead">
            {{ item.description }}
          </p>
          <footer class="blockquote-footer"><h3>Rp. {{ item.price }}</h3></footer>
          <h5>Stock Available : {{ item.stock }}</h5>
        </div>
      <button v-on:click.prevent= "addCart(item)" type="button" class="btn btn-warning mt-2 ml-3"><i class="fas fa-shopping-cart">add to cart</i></button>
        <div v-show= "successAddCart" class="alert alert-success mt-2" role="alert">
          This item added to cart
        </div>
      </div>
    </div>
</template>

<script>
import axios from "@/api/server.js"
export default {
    name: 'detail',
    data () {
      return {
        item : {},
        successAddCart : false
      }
    },
    methods : {
      fetchItem () {
        axios.get(`/items/${this.$route.params.id}`)
        .then( ({ data }) =>{
          this.item = data
        })
        .catch(err =>{
          console.log(err)
        })
      },
      addCart (item) {
        if(!this.$store.getters.getLogin) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Please login',
          })
          this.$router.push('/login')
        }else {
          axios.post('/cart', item, {
            headers : { token : localStorage.getItem('token')}
          })
          .then(({ data }) =>{
            this.successAddCart = true
            setTimeout(() => {
              this.successAddCart = false
            }, 1000);
          })
          .catch(err =>{
            console.log(err)
          })
        }
      }
    },
    mounted () {
      this.fetchItem() 
    },
    watch : {
        $route() {
            this.fetchItem()
        }
    }
    
}
</script>
<style>

#detail {
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
}
</style>
