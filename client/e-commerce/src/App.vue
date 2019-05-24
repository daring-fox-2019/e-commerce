<template>
  <div id="app">
    <b-modal hide-footer title="Shopping Cart" ref="my-modal">
      <div class="d-block text-center">
        <ul class="list-group" v-if="carts.length > 0">
          <li
            v-for="item in carts"
            :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <img v-bind:src="item.image" style="width:50px; height:50px">
            {{item.name}}
            <br>
            total $ {{item.amount}} - {{item.total}} item
            <br>
            price $ {{item.price}} per ring
            <b-button @click="removeItem(item.id)">remove</b-button>
          </li>
        </ul>
        <h3 v-if="carts.length < 1">Your cart is empty</h3>
      </div>
      <b-button class="mt-2" variant="outline-secondary" block @click="hideModalCart">Close</b-button>
      <b-button
        v-if="carts.length > 0 && checkoutStat === false"
        class="mt-2"
        variant="outline-success"
        block
        @click="co"
      >Checkout</b-button>
      <div v-if="checkoutStat">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            v-model="userDetail.email"
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          >
        </div>
        <div class="form-group">
          <label for="phonenumber">Phone Number</label>
          <input
            v-model="userDetail.phonenumber"
            type="text"
            class="form-control"
            id="phonenumber"
            placeholder="Enter phone number"
          >
        </div>
        <div class="form-group">
          <label for="address">Addres</label>
          <input
            v-model="userDetail.address"
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter shipping address"
          >
        </div>
        <b-button class="mt-2" variant="outline-success" block @click="checkout">Order</b-button>
      </div>
    </b-modal>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <ul class="navbar-nav mr-auto">
        <li class="navbar-brand">
          Jewelries
          <i class="far fa-gem"></i>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
        <li class="nav-item" v-if="isLogin === true && userId !== 'no user'">
          <router-link class="nav-link" to="/transactions">Transactions</router-link>
        </li>
        <li class="nav-item" v-if="userId !== '5ce158d52edb972b1e4dc5c4'">
          <a class="nav-link" @click="showModalCart">
            Cart
            <span class="badge badge badge-light">{{cartItems}}</span>
          </a>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            v-if="isLogin === false && userId === 'no user'"
            to="/join"
          >join us to start shopping</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-if="isLogin === true" @click="logout">Log Out</a>
        </li>
      </ul>
    </nav>
    <div>
      <router-view
        @deleteitem="deleteitem"
        @populateitems="populate"
        @updateitem="upd"
        :items="items"
        v-on:atc="atc"
        v-on:login="login"
        :isLogin="isLogin"
        :userId="userId"
        :isAdmin="isAdmin"
      />
    </div>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isLogin: false,
      userId: "no user",
      userDetail: {
        address: "",
        phonenumber: "",
        email: localStorage.getItem("email")
      },
      carts: [],
      cartItems: 0,
      isAdmin: false,
      checkoutStat: false,
      items: []
    };
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    upd(product) {
      if (product.image === "") {
        this.$axios({
          method: "put",
          url: "http://35.240.223.244/product/" + product._id,
          headers: {
            token: localStorage.getItem("token"),
            id: localStorage.getItem("user")
          },
          data: {
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description
          }
        })
          .then(({ response }) => {
            this.$swal(
              "Product Updated",
              "produc successfully updated",
              "success"
            );
            this.populate();
          })
          .catch(({ response }) => {
            this.$swal(
              "Error Status : " + String(response.status),
              response.data.message,
              "error"
            );
            this.populate();
          });
      } else if (
        this.product.name === "" ||
        this.product.image === "" ||
        this.product.price === null ||
        this.product.price <= 0 ||
        this.product.stock === null ||
        this.product.stock < 0 ||
        this.product.description === ""
      ) {
        this.$swal("Please input valid product info");
      } else {
        swal("Upload Your Image...", {
          buttons: false,
          timer: 3500
        });
      }
    },
    deleteitem(e) {
      console.log(e);
      this.$axios({
        method: "delete",
        url: "http://35.240.223.244/product/" + e,
        headers: {
          token: localStorage.getItem("token"),
          id: localStorage.getItem("user")
        }
      })
        .then(({ data }) => {
          swal("Successfully delete product", {
            icon: "success"
          });
          this.populate(true);
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          this.$swal(`Error`, `error`, "error");
        });
    },
    populate(e) {
      this.$axios({
        method: "get",
        url: "http://35.240.223.244/products",
        headers: {
          id: localStorage.getItem("user"),
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.items = data;
          this.$forceUpdate();
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          this.$swal("error", "internal server", "error");
        });
    },
    sumCart() {
      let total = 0;
      this.carts.forEach(item => {
        total += item.total;
      });
      this.cartItems = total;
    },
    co() {
      this.checkoutStat = true;
    },
    checkout() {
      this.hideModalCart();
      let amount = 0;
      let total = 0;
      this.carts.forEach(item => {
        amount += item.amount;
        total += item.total;
      });
      let transaction = {
        products: this.carts,
        amount: amount,
        total: total,
        transfer: "",
        status: "wait for payment",
        userId: localStorage.getItem("user"),
        userDetail: this.userDetail
      };
      this.$axios({
        method: "post",
        url: "http://35.240.223.244/cart",
        headers: {
          id: localStorage.getItem("user"),
          token: localStorage.getItem("token")
        },
        data: transaction
      })
        .then(({ data }) => {
          this.carts = [];
          this.updateCart("wkwk");
          this.userDetail = {
            address: "",
            phonenumber: "",
            email: localStorage.getItem("email")
          };
          this.$swal(
            "Order submitted",
            "Transfer to 123456789 and sent the transfer receipt in the transactions dashboard, click the transaction menu on the navbar and upload your picture",
            "success"
          );
        })
        .catch(({ response }) => {
          this.$swal(response.status, response.data.message, "error");
        });
    },
    updateCart(i) {
      this.$axios({
        method: "put",
        url: "http://35.240.223.244/user/" + this.userId,
        headers: {
          token: localStorage.getItem("token"),
          id: localStorage.getItem("user")
        },
        data: {
          cart: this.carts
        }
      })
        .then(({ data }) => {
          if (i === "add") {
            this.$swal("Addedd to cart", `Added item to cart`, "success");
          } else if (i === "upd") {
            this.$swal("Item deleted", `Deleted item from cart`, "success");
          } else {
          }
          this.sumCart();
        })
        .catch(err => {
          this.$swal("Error", `${err}`, "error");
        });
    },
    atc(e) {
      if (this.carts.length < 1) {
        this.carts.push(e);
        this.carts[0].total = 1;
        this.carts[0].amount = e.price;
      } else {
        let exist = false;
        let yo = this.carts.length;
        for (let i = 0; i < this.carts.length; i++) {
          if (this.carts[i]._id === e._id) {
            this.carts[i].total += 1;
            this.carts[i].amount += e.price;
            exist = true;
          }
        }
        if (exist === false) {
          this.carts.push(e);
          this.carts[yo].total = 1;
          this.carts[yo].amount = e.price;
        }
      }
      this.updateCart("add");
      console.log(this.carts);
    },
    login(data) {
      this.isLogin = data.isLogin;
      this.userId = data.userId;
      this.cart = data.cart;
      this.checkLogin();
    },
    logout() {
      this.carts = [];
      this.isLogin = false;
      this.userId = "no user";
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("_id");
      this.checkLogin();
      this.$router.push("/");
    },
    showModalCart() {
      this.$refs["my-modal"].show();
    },
    hideModalCart() {
      this.$refs["my-modal"].hide();
      this.checkoutStat = false;
    },
    getCartItem() {
      this.$axios({
        method: "get",
        url: "http://35.240.223.244/user/" + this.userId,
        headers: {
          id: localStorage.getItem("user"),
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.carts = data.cart;
          this.sumCart();
        })
        .catch(({ response }) => {
          console.log(response);
          this.$swal(
            `Error Status : ${response.status}`,
            `${response.data.message}`,
            "error"
          );
        });
    },
    checkLogin() {
      if (localStorage.getItem("token")) {
        this.isLogin = true;
        this.userId = localStorage.getItem("user");
        let id = localStorage.getItem("user");
        this.getCartItem();
        if (id === "5ce158d52edb972b1e4dc5c4") {
          this.isAdmin = true;
        }
      } else {
        this.isLogin = false;
        this.isAdmin = false;
        this.userId = "no user";
      }
    },
    removeItem(id) {
      let carts = this.carts;
      carts.forEach((element, i) => {
        if (element.id === id) {
          carts.splice(i, 1);
        }
      });
      this.carts = carts;
      this.updateCart("del");
    }
  }
};
</script>
