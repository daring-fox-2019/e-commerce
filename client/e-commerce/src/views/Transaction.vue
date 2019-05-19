<template>
  <div><br>
    <h3>TRANSACTION History</h3><br>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-around"
        v-for="data in transactions" :key="data._id"
      >
        <div class="col-4">
        total  ->  {{data.total}} item <br>
        amount -> $ {{data.amount}}<br>
        sent to -> {{data.userDetail.address}} <br>
        phone number -> {{data.userDetail.phonenumber}} <br>
        status -> {{data.status}} <br>
        </div>
        <input v-if="isAdmin === false && data.status === 'wait for payment'" type="file" class="form-control" @change="previewFile" id="addproductimage">
        <button @click="uploadtransfer(data._id)" v-if="isAdmin === false && data.status === 'wait for payment'" class="btn btn-secondary">upload transfer</button><br>
        <button v-if="isAdmin && data.status === 'paid'" class="btn btn-danger" >reject</button>
        <button v-if="isAdmin === false && data.status === 'paid'"> Waiting for shipping. . .</button>
        <button v-if="isAdmin === true && data.status === 'paid'" class="btn btn-primary">reject order</button>
        <button v-if="isAdmin === false && data.status === 'shipped'" class="btn btn-primary">send order</button>
        <!-- <b-button</b-button> -->
      </li>
    </ul>
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  name: "Transaction",
  props: ["isLogin", "userId", "isAdmin"],
  data: function() {
    return {
      tfimage : "",
      transactions: []
    };
  },
  mounted() {
    if(this.isAdmin === false){
      this.populateUser()
    } else {
      // this.populateAdmin()
    }
  },
  methods : {
    populateUser () {
      this.$axios({
        methods: "get",
        url: "http://localhost:3000/cart/"+localStorage.getItem('user'),
        headers: {
          token: localStorage.getItem('token'),
          id: localStorage.getItem('user')
        }
        })
        .then(({data})=>{
          console.log(data)
          this.transactions = data
        })
        .catch(err=>{
          console.log(err.response)
          this.$swal("error","internal server error", "error")
        })
    },
    populateAdmin () {
      this.$axios({
        methods: "get",
        url: "http://localhost:3000/carts",
        headers: {
          token: localStorage.getItem('token'),
          id: localStorage.getItem('user')
        }
        })
        .then(({data})=>{
          console.log(data)
          this.transactions = data
        })
        .catch(err=>{
          console.log(err)
          this.$swal("error","internal server error", "error")
        })
    },
    uploadtransfer(id){
      console.log(id)
      if (this.tfimage === "") {
        this.$swal('Please add product image')
      } else {
        console.log("upload")
        swal('Upload Your Image...', {
          buttons: false,
          timer: 200
        })
        const blob = new Blob([this.tfimage], {
          type: this.tfimage.type
        })
        const formdata = new FormData()
        formdata.append('image', blob)
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/uploadimg',
          headers: {
            token: localStorage.getItem('token'),
            id: localStorage.getItem('user')
          },
          data: formdata
        })
          .then(({ data }) => {
            this.tfimage = data
            console.log("selesai upload")
            swal('Updating your order status...', {
              buttons: false,
              timer: 100
            })
            this.$axios({
              method: 'put',
              url: 'http://localhost:3000/cart/'+id,
              headers: {
                id: localStorage.getItem('user'),
                token: localStorage.getItem('token')
              },
              data: {
                transfer : this.tfimage,
                status : "paid"
              }
            })
              .then(({ data }) => {
                console.log('created => ' + JSON.stringify(data))
                this.tfimage = ""
                this.$swal('Success', 'Your Order Updated', 'success')
                this.populateUser()
              })
              .catch(err => {
                this.tfimage = ""
                this.$swal('Error', 'Internal Server Error', 'error')
                console.log('error di db')
                console.log(err)
              })
          })
          .catch(({ response }) => {
            this.tfimage = ""
            this.$swal(
              'Error Status : ' + String(response.status),
              response.data.message,
              'error'
            )
              console.log("error pas upload image")
          })
      }
    },
    accept () {

    },
    reject () {

    },
    previewFile (e) {
      this.tfimage = e.target.files[0]
    }
  }
};
</script>
