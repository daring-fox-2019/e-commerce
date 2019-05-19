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
        sent to -> {{data.address}} <br>
        phone number -> {{data.phonenumber}} <br>
        status -> {{data.status}} <br>
        </div>
        <input v-if="isAdmin === false && data.status === 'wait for payment'" type="file" class="form-control" @change="previewFile" id="addproductimage">
        <button v-if="isAdmin === false && data.status === 'wait for payment'" class="btn btn-secondary">upload transfer</button><br>
        <button v-if="isAdmin && data.status === 'wait for payment'" class="btn btn-danger" >reject</button>
        <button v-if="isAdmin === true && data.status === 'paid'" class="btn btn-primary">send order</button>
        <button v-if="isAdmin === false && data.status === 'shipped'" class="btn btn-primary">send order</button>
        <!-- <b-button</b-button> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "History",
  props: ["isLogin", "userId", "isAdmin"],
  data: function() {
    return {
      tfimage : "",
      transactions: []
    };
  },
  mounted() {
    this.populate()
  },
  methods : {
    populate () {
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
    uploadtransfer(){

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
