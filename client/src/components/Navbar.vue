<template>
  <div>
    <header class="navbar">
      <ul>
        <li>
          <a @click="goHome" href="#" style="color: #D2D1FF">
            <img src="../assets/space.gif">
          </a>
        </li>
        <a @click="goHome" href="#" style="color: #D2D1FF">
          <li style="font-weight: bold; font-size: 20px">Planetarium</li>
        </a>
      </ul>

      <button
        v-if="userRole === 'admin'"
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target="#createProductForm"
        data-whatever="@mdo"
      >
        <h6 style="margin: 0;">Add new product</h6>
      </button>

      <div
        class="modal fade"
        id="createProductForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">New product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label class="col-form-label">Name:</label>
                  <input v-model="name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                  <label class="col-form-label">Description:</label>
                  <textarea v-model="description" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <label class="col-form-label">Image:</label>
                  <input type="file" v-on:change="uploadImage" required>
                </div>
                <div class="form-group">
                  <label class="col-form-label">Price:</label>
                  <input v-model="price" type="number" class="form-control" required>
                </div>
                <div class="form-group">
                  <label class="col-form-label">Stock:</label>
                  <input v-model="stock" type="number" class="form-control" required>
                </div>
                <div class="form-group">
                  <label class="col-form-label">Category:</label>
                  <select v-model="category" required>
                    <option>Ships</option>
                    <option>Helmets</option>
                    <option>Suits</option>
                    <option>Gloves</option>
                    <option>Boots</option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button
                    @click="create"
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                  >Create new product</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ul>
        <li id="logout">
          <a @click="toCart" href="#">
            <i v-if="userRole === 'customer'" style="color: " class="fas fa-shopping-cart"></i>
          </a>
          <a @click="logout" href="#">
            <i v-if="isLogin" class="fas fa-sign-out-alt"></i>
          </a>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import myServer from '@/api/myServer';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      name: '',
      description: '',
      price: '',
      image: '',
      stock: '',
      category: '',
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    userRole() {
      console.log(this.$store.state.currentUser);
      return this.$store.state.currentUser.role;
    },
  },
  methods: {
    uploadImage(event) {
      this.image = event.target.files[0];
    },
    create() {
      this.$router.push('/loading');
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('image', this.image);
      formData.append('price', this.price);
      formData.append('stock', this.stock);
      formData.append('category', this.category);
      myServer.defaults.headers.common.token = localStorage.token;
      this.$store.dispatch('addProduct', formData);
      this.name = '';
      this.description = '';
      this.price = '';
      this.image = '';
      this.stock = '';
      this.category = '';
    },
    logout() {
      this.$store.commit('setLogout');
      this.$router.push('/login');
    },
    goHome() {
      this.$router.push('/');
    },
    toCart() {
      this.$router.push('/cart');
    },
  },
};
</script>

<style>
header {
  background-color: #130831;
}

.navbar {
  padding: 0;
}

header ul li img {
  height: 75px;
  width: 75px;
  transform: scaleX(-1);
}

header ul {
  color: #d2d1ff;
  list-style: none;
  padding: 0;
  margin: 0;
  font-style: italic;
}

header ul li {
  display: inline-block;
}

header ul li i {
  font-size: 50px;
  color: #d2d1ff;
  margin-right: 25px;
}
</style>
