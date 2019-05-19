<template>
  <div>
    <div v-if="items.length === 0">
      Product Is Not Exists
    </div>
    <div v-if="items.length !== 0">
      <div class="row" style="align-items: stretch;">
        <div v-for="item in items" :key="item._id" class="col-sm-6 col-md-3 col-lg-2-">
          <div  class="card">
            <!-- <h3 class="card-header">Card header</h3> -->
            <div class="card-body">
              <h5 class="card-title">{{item.name}}</h5>
              <h6 class="card-subtitle text-muted"> ${{item.price}}</h6>
            </div>
            <img
              style="height: 200px; width: 100%; display: block;"
              v-bind:src="item.image"
              alt="Card image"
            >
            <div class="card-body">
              <p
                class="card-text"
              >{{item.description}}</p>
              <p v-if="item.stock > 0"
                class="card-text"
              > {{item.stock}} left </p>
              <p v-if="item.stock <= 0"
                class="card-text"
              > Stock Empty </p>
            </div>
            <div class="card-body" v-if="isAdmin === false">
              <a href="#" v-if="isLogin" @click.prevent="atc(item)" class="card-link">Add to Cart</a>
              <router-link v-if="isLogin === false" to="/join" class="card-link">Shop Now</router-link>
            </div>
            <div v-if="isAdmin === true" class="card-footer text-muted">
              <a href="#" class="card-link" @click.prevent="del(item._id)">Delete</a>
              <a href="#" class="card-link" @click.prevent="upd(item)">Edit</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listitems',
  props: ['isLogin','isAdmin', 'items'],
  data: function () {
    return {}
  },
  mounted () {},
  methods: {
    atc (item) {
      this.$emit('atc', item)
    },
    del (id) {
      this.$emit('deleteItem', id)
    },
    upd (item) {
      this.$emit('updateItem', item)
    }
  }
}
</script>
