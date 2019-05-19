<template>
<div class="table-responsive">
    <table id="overview" class="table table-hover ">
  <thead>
    <tr>
      <th scope="col">Number</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Image</th>
      <th scope="col">Stock</th>
      <th scope="col">Category</th>
      <th scope="col">Price</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody v-bind:product-list="productList">
    <tr v-for="(item, index) in productList" :key="index">
      <th scope="row">{{index + 1}}</th>
      <td>{{item.name}}</td>
      <td>{{truncate(item.description)}}</td>
      <td><img style="max-width:8vh;" :src="item.image"></td>
      <td>{{item.stock}}</td>
      <td>{{item.category.name}}</td>
      <td>{{item.price}}</td>
      <td>
          <button v-on:click="getEditPage(item._id)" class="btnaction btn mx-1 my-1"> Edit </button>
          <button v-on:click="deleteProduct(item._id)" class="btnaction btn mx-1 my-1"> Delete</button>
      </td>

    </tr>
  </tbody>
</table> 
</div>
    
</template>

<script>
export default {
    props : ['productList'],
     data() {
        return {
            
            
        }
    },
    methods: {
        truncate(content) {
            if (content.length > 55) {
                return content.substring(0,55).concat('...')
            } else {
                return content
            }
        },
        deleteProduct(id) {
            this.axios.delete(`/products/${id}`, {
                headers : {'token' : localStorage.getItem('token')}
            })
            .then(({data}) => {
                this.swal.fire(`${data.name} has been deleted`, "You may proceed", "success");
                this.$emit('successdelete')
            })
            .catch(err => {
                this.swal.fire(`Something is wrong`, "Please reload", "error");
            })
        },

        getEditPage(id) {
            this.$emit('geteditpage', id)
        }
    },
   
}
</script>

<style>
#overview {
    font-size: 13px;
}

.btnaction {
    border-style: 1px solid black !important;
  margin: 2px;
  display: inline-block;
  width: 130px;
  font-size: 12px;
  color: darkgrey;
  letter-spacing: 0.15em;
  text-transform: uppercase ;
}

.btnaction:hover {
  opacity: 0.6;
}


</style>
