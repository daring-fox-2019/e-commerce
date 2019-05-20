<template>
    <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-60">
              <a href="#"><img class="card-img-top" :src="product.image" alt="" width="360" height="300"></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#" style="text-decoration:none;color:black;">{{product.name}}</a>
                </h4>
                <h5>${{product.price}}</h5>
                <p class="card-text">Total Stock : {{product.stock}}</p>
               <ViewDialog 
                    v-bind:name="product.name"
                    v-bind:image="product.image"
                    v-bind:price="product.price"
                    v-bind:stock="product.stock"
                ></ViewDialog>
                <br>
                <Cart 
                    v-bind:name="product.name"
                    v-bind:image="product.image"
                    v-bind:price="product.price"
                    v-bind:stock="product.stock"
                    v-bind:id="product._id"
                ></Cart>
              </div>
              <div class="card-footer">
                <small class="text-muted">★ ★ ★ ★ ☆</small>
              </div>
            </div>
     </div>
</template>

<script>
import ViewDialog from "./ViewDialog";
import Cart from "./Cart";
export default {
    props:["product"],
    components: {
    ViewDialog,
    Cart
    }
}
</script>


