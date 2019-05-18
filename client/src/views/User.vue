<template>
  <div class="container-fluid p-4">
    <div class="container">
      <div class="row px-2">
        <div class="col-3 col-md-3 col-sm-12">
          <UserCart :pic="pic2" :text="text2"></UserCart>
        </div>

        <div class="col-md-9 col-sm-12">
          <div v-if="transList.length == 0">
          <div>
            <h3 class="tls">This page looks empty. You might want to <router-link to="/products">browse</router-link> more products</h3>
        </div>
          </div>
          <div v-else>
            <ul class="list-group mb-6">
              <li
                v-for="(trans, index) in transList"
                :key="index"
                class="list-group-item d-flex justify-content-between lh-condensed"
              >
                <div>
                  <h6 class="tls my-0">{{trans._id}}</h6>
                  <small class="text-muted">Recipient's Name : {{trans.recipientName}}</small>
                  <br>
                  <div v-if="!trans.status">
                    <a
                      href="#"
                      @click.prevent="changeStat(trans._id)"
                      class="conf text-muted"
                    >Confirm Product Arrival</a>
                  </div>
                  <div v-else-if="trans.status">
                    <span href class="conf text-muted">Arrival Confirmed</span>
                  </div>
                </div>
                <span :style="color" class="text-muted">{{getViewStatus(trans.status)}}</span>
                <span class="text-muted">IDR {{trans.total.toLocaleString()}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCart from "@/components/UserCart.vue";
export default {
  components: {
    UserCart
  },
  data() {
    return {
      pic2:
        "https://images.unsplash.com/photo-1531969179221-3946e6b5a5e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      text2: "My Transaction List",
      transList: [],
      color: ""
    };
  },
  created() {
    this.getUserTrans();
    console.log(this.transList);
  },
  methods: {
    getViewStatus(stat) {
      if (stat) {
        this.color = "color:green !important;";
        return "Recieved";
      } else {
        this.color = "color:red !important;";
        return "Awaiting Delivery Confirmation";
      }
    },
    getUserTrans() {
      let uid = localStorage.getItem('userId')
      this.axios
        .get(`/transactions/${uid}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.transList = data;
        })
        .catch(err => {
          console.log(err);

          this.swal.fire(
            "Something is wrong",
            "Please reload the page",
            "warning"
          );
        });
    },
    changeStat(id) {
      this.axios
        .patch(
          `/transactions/${id}`,
          { status: true },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.swal.fire(
            "Your confirmation has been recorded",
            "Thank you for shopping",
            "success"
          );
          this.getUserTrans();
        })
        .catch(err => {
          console.log(err);

          this.swal.fire(
            "Something is wrong",
            "Please reload the page",
            "warning"
          );
        });
    }
  }
};
</script>

<style>
.conf {
  height: 0.2rem;
  font-family: "Lato", sans-serif;
  font-size: 0.8rem;
  color: darkcyan !important;
}

.tls {
  height: 1rem;
  font-family: "Lato", sans-serif;
  font-size: 15px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
</style>
