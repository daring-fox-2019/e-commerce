<template>
  <div>
    <div class="container animated fadeIn" style="margin-top:120px">
      <b-nav>
        <b-nav-item
          v-if="role != 'admin'"
          :class="`border ${mode ? 'background-change' : ''} mr-2`"
          @click="changeMode(true)"
        >
          <i class="fas fa-shopping-bag"></i>
          <b>BUY</b>
        </b-nav-item>
        <b-nav-item
          v-if="role != 'admin'"
          :class="`border ${!mode ? 'background-change' : ''}`"
          @click="changeMode(false)"
        >
          <i class="fas fa-money-bill-alt"></i>
          <b>SELL</b>
        </b-nav-item>
      </b-nav>
      <hr>
    </div>

    <div>
      <b-modal ref="my-modal" hide-footer title="Payment">
        <div class="d-block text-center">
          <h3>Finish Your Payment</h3>
        </div>
        <div>
          <b-form-group label="Shipping Number" label-for="shippingNumber" description>
            <b-form-input
              id="shippingNumber"
              type="text"
              required
              placeholder
              v-model="shippingNumber"
            ></b-form-input>
          </b-form-group>
        </div>
        <b-button variant="success" block @click="updateShippingNumber" v-if="shippingNumber">Add</b-button>
        <b-button class="mt-2" variant="outline-secondary" block @click.prevent="hideModal">Close Me</b-button>
      </b-modal>
    </div>

    <!-- <div slot="table-busy" class="text-center text-success my-5">
        <b-spinner class="align-middle"></b-spinner>
    </div>-->
    <div class="transaction-detail container" id="buy" v-if="role == 'admin'">
      <h2 class="p-2">
        All
        <b>transaction</b> detail
      </h2>

      <table class="table mt-4" v-if="isBusy" style="text-align:center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> Transaction Id. </th>
            <th scope="col">Product Name</th>
            <th scope="col"> Buyer </th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Total</th>
            <th scope="col">Seller</th>
            <th scope="col">Shipping</th>
            <th scope="col">Status</th>
            <th scope="col">Shipping Number</th>
            <th colspan="1">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(all, i) in buyList" :key="i">
            <th scope="row">{{ i+1 }}</th>
             <th> {{all._id }} </th>
            <td>{{all.product_id.name }}</td>
            <td>{{all.buyer_id.name }}</td>
            <td>Rp. {{ new Intl.NumberFormat({ style: "currency" }).format(all.product_id.price)}}</td>
            <td>{{all.qty }}</td>
            <td>Rp. {{ new Intl.NumberFormat({ style: "currency" }).format(all.qty *all.product_id.price) }}</td>
            <td>{{all.product_id.seller_id.name }}</td>
            <td>{{all.shipping.courier }} | {{all.shipping.service.text }}</td>
            <td v-if="all.status != 'done'">{{all.status == 'pay' ? 'already paid' : 'delivered'}}</td>
            <td v-if="all.status == 'done'">{{all.status == 'done' ? 'transaction done' : ''}}</td>
            <td>{{all.resi }}</td>
            <td>
              <b-button
                size="sm"
                variant="secondary"
                style="width:100%"
                @click="deleteTransaction(all._id)"
              >Delete</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="transaction-detail container" id="buy" v-if="mode && role != 'admin'">
      <h2 class="p-2">
        Buy
        <b>transaction</b> detail
      </h2>

      <table class="table mt-4" v-if="isBusy" style="text-align:center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Total</th>
            <th scope="col">Seller</th>
            <th scope="col">Shipping</th>
            <th scope="col">Status</th>
            <th scope="col">Shipping Number</th>
            <th colspan="1">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(buy, i) in buyList" :key="i">
            <th scope="row">{{ i+1 }}</th>
            <td>{{ buy.product_id.name }}</td>
            <td>Rp. {{ new Intl.NumberFormat({ style: "currency" }).format(buy.product_id.price)}}</td>
            <td>{{ buy.qty }}</td>
            <td>Rp. {{ new Intl.NumberFormat({ style: "currency" }).format( buy.qty * buy.product_id.price) }}</td>
            <td>{{ buy.product_id.seller_id.name }}</td>
            <td>{{ buy.shipping.courier }} | {{ buy.shipping.service.text }}</td>
            <td v-if="buy.status != 'done'">{{ buy.status == 'pay' ? 'already paid' : 'delivered'}}</td>
            <td v-if="buy.status == 'done'">{{ buy.status == 'done' ? 'transaction done' : ''}}</td>
            <td>{{ buy.resi }}</td>
            <td>
              <b-button
                size="sm"
                variant="success"
                style="width:100%"
                :disabled="!(buy.status == 'delivered')"
                @click="confirmDone(buy._id)"
              >Confirm as Done</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="transaction-detail container" id="sell" v-if="!mode && role != 'admin'">
      <h2 class="p-2">
        Sell
        <b>transaction</b> detail
      </h2>

      <table class="table mt-4" v-if="isBusy" style="text-align:center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Total</th>
            <th scope="col">Buyer</th>
            <th scope="col">Shipping</th>
            <th scope="col">Status</th>
            <th scope="col">Shipping Number</th>
            <th colspan="1">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sell, i) in sellList" :key="i">
            <th scope="row">{{ i+1 }}</th>
            <td>{{ sell.product_id.name }}</td>
            <td>Rp. {{ new Intl.NumberFormat({ style: "currency" }).format(sell.product_id.price)}}</td>
            <td>{{ sell.qty }}</td>
            <td>Rp. {{ new Intl.NumberFormat({ style: "currency" }).format( sell.qty * sell.product_id.price) }}</td>
            <td>{{ sell.product_id.seller_id.name }}</td>
            <td>{{ sell.shipping.courier }} | {{ sell.shipping.service.text }}</td>
            <td
              v-if="sell.status != 'done'"
            >{{ sell.status == 'pay' ? 'already paid' : 'delivered'}}</td>
            <td v-if="sell.status == 'done'">{{ sell.status == 'done' ? 'transaction done' : ''}}</td>
            <td>{{ sell.resi }}</td>
            <td>
              <b-button
                v-if="sell.status == 'pay'"
                size="sm"
                variant="success"
                style="width:100%"
                @click="showModal(sell)"
              >Add Shipping Number</b-button>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  </div>
</template>

<script>
import axios from "@/database/axios";

export default {
  data() {
    return {
      mode: false,
      isBusy: false,
      buyList: [],
      sellList: [],
      sellItem: {},
      shippingNumber: null,
      role: localStorage.getItem("role")
    };
  },
  mounted() {
    this.getTransactionBuy();
    this.getTransactionSell();
  },
  methods: {
    confirmDone(id) {
      axios
        .patch(
          `/transactions/${id}`,
          { status: "done" },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.buyList.map((el, i) => {
            if (el._id == id) {
              this.buyList[i].status = "done";
            }
          });
          this.$swal("Yash", "transaction done", "success");
        })
        .catch(err => {
          this.$swal(":(", `${err.response.data.message}`, "error");
        });
    },
    toggleBusy() {
      this.isBusy = !this.isBusy;
    },
    hideModal() {
      this.sellItem = {};
      this.$refs["my-modal"].hide();
    },
    showModal(item) {
      this.sellItem = item;
      this.$refs["my-modal"].show();
    },
    changeMode(status) {
      this.mode = status;
    },
    deleteTransaction(id){
      axios.delete(`/transactions/${id}`, { headers: {token: localStorage.getItem('token')}})
      .then(({data}) => {
        this.$swal('Yay', 'delete transaction success', 'info')
      })
      .catch( err => {
        this.$swal(':(', `${err.response.data.message}`, 'error')
      })
    },
    updateShippingNumber() {
      axios
        .patch(
          `/transactions/${this.sellItem._id}`,
          { status: "delivered", resi: this.shippingNumber },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
         
          this.sellList.map((el, i) => {
            if (el._id == this.sellList._id) {
              (this.sellList[i].status = "delivered"),
                (this.sellList[i].resi = this.shippingNumber);
            }
          });
          this.shippingNumber = null;
          this.hideModal();
          this.$swal("Yasshh", "Wait for confirmation from customer", "info");
        })
        .catch(err => {
          this.$swal(":(", `${err.response.data.message}`, "error");
        });
    },
    getTransactionBuy() {
      axios
        .get("/transactions", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
       
          this.toggleBusy();
          this.buyList = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTransactionSell() {
      axios
        .get("/transactions/sell", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.sellList = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
a {
  color: black;
}
.background-change {
  background: #f6f5f5;
}
</style>
