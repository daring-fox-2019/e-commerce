<template>
  <div class="px-5">
    <div class="row">
      <div class="admin-left col-md-2 col-lg-2">
        <router-link to="/admin/"><button class="adminbtn btn">Panel</button></router-link>
        <router-link to="/admin/add"> <button class="adminbtn btn">Add</button></router-link>
       <router-link to="/admin/overview"> <button class="adminbtn btn">Overview</button></router-link>
      </div>
    <div class="col-8 pl-5">
        <h1>Hello this is admin page buat tanda aja</h1>
      <router-view 
      v-bind:current-product="currentProduct"
      v-on:geteditpage="geteditpage"
      v-bind:product-list="productList"
      v-bind:category-list="categoryList"
      v-on:successdelete="successdelete"
      v-on:successeditproduct="successeditproduct"
      v-on:successaddproduct="successaddproduct"
      >
      </router-view>
    </div>
    <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
export default {
    props : ['categoryList', 'productList'],
    data() {
        return {
            currentProduct : {}
        }
    },
    methods : {
        successdelete() {
            this.$emit('successdelete')
        },
         successaddproduct() {
            this.$emit('successaddproduct')
        },
        successeditproduct() {
            this.$emit('successeditproduct')
        },
        fetchOneProduct(id) {
            this.axios.get(`/products/${id}`)
            .then(({data}) => {
                this.currentProduct = data
                console.log(data, 'dapet apa ya');
                
            })
            .catch(err=> {
                this.swal.fire(`Something is wrong`, "Please reload", "error");

            })

        },
        geteditpage(id) {
            this.axios.get(`/products/${id}`, {
                headers : {'token' : localStorage.getItem('token')}
            })
            .then(({data}) => {
                this.currentProduct = data
                this.$router.push(`/admin/edit/${id}`)
            })
            .catch(err =>{
                this.swal.fire(`Something is wrong`, "Please reload", "error");

            })
        }
    },
    watch: {
    $route() {        
      if (this.$route.params.id != undefined) {
          this.fetchOneProduct(this.$route.params.id )
          console.log('HHEHEHEHEHEHE');
          console.log(this.$route.params.id);
          
      }
    }
  },
};
</script>

<style>
.admin-left {
  border-right: 1px solid grey;
}

.adminbtn {
  margin: 2px;
  display: inline-block;
  width: 130px;
  font-size: 16px;
  color: grey;
  border-style: 1px solid grey !important;
  border-radius: 22px;
  letter-spacing: 0.18em;
  text-transform: uppercase ;
}


.adminbtn:hover {
  opacity: 0.6;
}
</style>
