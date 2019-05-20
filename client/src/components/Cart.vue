<template>
  <div id="modal">
    <button
      type="button"
      class="btn btn-dark"
      data-toggle="modal"
      :data-target="dataTarget"
    >Add to Cart</button>
    <div
      class="modal fade"
      :id="idTarget"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add to Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addtocart">
              <div class="form-group">
                <label for="exampleInput">{{name}}</label>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Quantity</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInput"
                  placeholder="Quantity"
                  v-model="quantity"
                >
                {{quantity}}
              </div>
              <button type="submit" class="btn btn-secondary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "image", "price", "stock","id"],
  data() {
    return {
      dialog: false,
      quantity:''
    };
  },
  methods:{
      addtocart(){
          let token = localStorage.getItem("token");
          console.log(this.quantity)
          this.$axios
          .patch("http://localhost:3000/cart/addToCart", { ProductId:this.id, quantity: this.quantity}, { headers: { token } })
          .then(({data}) => {
              this.$swal(data.message, "add to cart!", "success");
              this.quantity = ''
          })
          .catch(err => {
            this.$swal("Cant process cart"); 
          })
      }
  },
  computed: {
    dataTarget: function() {
      let value = `#` + this.name + 1;
      return value.replace(/\s/g, "");
    },
    idTarget: function() {
      return this.name.replace(/\s/g, "") + 1;
    }
  }
};
</script>

<style>
</style>
