<template>
  <div class="px-5">
    <div class="row">
      <div class="admin-left col-md-2 col-lg-2">
        <router-link to="/admin/">
          <button v-on:click="togglePanel" class="adminbtn btn">Panel</button>
        </router-link>
        <router-link to="/admin/add">
          <button class="adminbtn btn">Add</button>
        </router-link>
        <router-link to="/admin/overview">
          <button class="adminbtn btn">Overview</button>
        </router-link>
      </div>
      <div class="col-8 pl-5">
        <div class="container-fluid">
          <Visualisation v-if="panel" v-bind:product-list="productList"></Visualisation>
          <br>
          <hr>
          <!-- {text: "Transaction History ID", value: "transactionId"},
        { text: "Customer", value: "customer" },
        { text: "Delivery", value: "delivery" },
        { text: "Products", value: "products" },
        { text: "Transaction Date", value: "createdAt" },
          { text: "Total Price (IDR)", value: "total" },-->

          <h3 class="admintitletbltxt">Transaction Summary</h3>
          <table class="admintabletxt table table-sm">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Products</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in transHistory" :key="index">
                <th>{{index+1}}.</th>
                <th>{{record._id}}</th>
                <td>{{record.userId.name}}</td>
                <td>
                  <ol>
                    <li v-for="(cart, index) in record.carts" :key="index">{{cart.productId.name}}</li>
                  </ol>
                </td>
                <td>{{record.createdAt.split('T')[0] }}</td>
                <td>IDR {{record.total.toLocaleString()}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- <h1>Hello this is admin page buat tanda aja</h1> -->
        <router-view
          v-bind:current-product="currentProduct"
          v-on:geteditpage="geteditpage"
          v-bind:product-list="productList"
          v-bind:category-list="categoryList"
          v-on:successdelete="successdelete"
          v-on:successeditproduct="successeditproduct"
          v-on:successaddproduct="successaddproduct"
        ></router-view>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import Visualisation from "@/components/Visualisation.vue";
export default {
  props: ["categoryList", "productList"],
  data() {
    return {
      currentProduct: {},
      panel: true,
      transHistory: []
    };
  },
  created() {
    this.fetchTransHistory();
  },
  components: { Visualisation },
  methods: {
    togglePanel() {
      this.panel = true;
    },
    successdelete() {
      this.$emit("successdelete");
    },
    successaddproduct() {
      this.$emit("successaddproduct");
    },
    successeditproduct() {
      this.$emit("successeditproduct");
    },
    fetchOneProduct(id) {
      this.axios
        .get(`/products/${id}`)
        .then(({ data }) => {
          this.currentProduct = data;
          console.log(data, "dapet apa ya");
        })
        .catch(err => {
          this.swal.fire(`Something is wrong`, "Please reload", "error");
        });
    },
    geteditpage(id) {
      this.axios
        .get(`/products/${id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.currentProduct = data;
          this.$router.push(`/admin/edit/${id}`);
        })
        .catch(err => {
          this.swal.fire(`Something is wrong`, "Please reload", "error");
        });
    },
    fetchTransHistory() {
      console.log("invoked");

      this.axios
        .get(`/transactions`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.transHistory = data;
        })
        .catch(err => {});
    }
  },
  watch: {
    $route() {
      if (this.$route.params.id != undefined) {
        this.fetchOneProduct(this.$route.params.id);
        this.fetchTransHistory();
        console.log("HHEHEHEHEHEHE");
        console.log(this.$route.params.id);
      } else if (this.$route.path.name == "admin") {
        this.panel = false;
        this.fetchTransHistory();
      }
    }
  }
};
</script>

<style>



.tableadmin {border: 1px soli!important;} 
.table tr, .table td, .table th {border: 0!important;}
.table tr td:nth-child(2), 


.admintitletbltxt {
  height: 2rem;
    font-weight: 600;
    font-family: "Lato", sans-serif;
    font-size: 15px;
    letter-spacing: 0.17em;
    text-transform: uppercase

}

.admintabletxt {
  text-decoration: none;
  position: relative;
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
}

.admintabletxt:before {
  width: 60px;
  position: absolute;
  bottom: 0;
  right: 350px;
}

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
  text-transform: uppercase;
}

.adminbtn:hover {
  opacity: 0.6;
}
</style>
