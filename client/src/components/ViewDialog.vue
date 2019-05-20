<template>
  <div id="modal">
    <button type="button" class="btn btn-dark" data-toggle="modal" :data-target="dataTarget">View</button>
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
            <h5 class="modal-title" id="exampleModalLongTitle">{{name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <img :src="image" alt="" width="300" height="300">
              <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
            <h3>Price : {{price}}</h3>
            <h3>Available Stock : {{stock}}</h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-dark">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "image", "price", "stock"],
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    dataTarget: function() {
      let value = `#` + this.name
      return value.replace(/\s/g,'');
    },
    idTarget:function(){
      return this.name.replace(/\s/g,'')
    }
  }
};
</script>

<style>
</style>
