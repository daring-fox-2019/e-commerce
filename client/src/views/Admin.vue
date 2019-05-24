<template>
  <b-row>
    <b-container fluid>
      <b-row class>
        <b-col class="mt-5"></b-col>
      </b-row>
      <b-row>
        <b-col class="px-0">
          <!-- first tab -->
          <b-tabs content-class="mt-3" class="mx-0">
            <b-tab title="Transactions List" active>
              <b-container>
                <b-row>
                  <b-col cols="7" class="">
                    <!-- transaction card header -->
                    <div class="row text-center">
                      <b-col cols="1" class="border px-0">No</b-col>
                      <b-col cols="4" class="border px-0">Transaction ID</b-col>
                      <b-col cols="3" class="border px-0">Status</b-col>
                      <b-col cols="2" class="border px-0">Order by</b-col>
                      <b-col cols="2" class="border px-0">
                        Action
                      </b-col>
                    </div>
                    <!-- transaction card -->
                    <TransactionListCard
                      v-for="(transaction,index) in adminTransactions"
                      :transaction="transaction"
                      :index="index"
                      :key="transaction._id"
                    />
                  </b-col>
                  <b-col cols="5" class="">
                    <div class="row">
                      <!-- transaction detail -->
                      <TransactionDetail/>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </b-tab>
            <!-- second tab -->
            <b-tab title="Add New Item">
              <b-container fluid>
                <b-row>
                  <!-- col kiri -->

                  <b-col class="border">
                    <b-container fluid>
                      <b-row>Item List</b-row>
                      <b-row class="border d-flex justify-content-between align-items-center">
                        <b-col cols="1" class="border px-1 justify-content-end d-flex">No</b-col>
                        <b-col cols="4" class="border">Item</b-col>
                        <b-col cols="3" class="border">Available Stock</b-col>
                        <b-col cols="2" class="border">Price</b-col>
                        <b-col cols="2" class="border">Action</b-col>
                      </b-row>
                      <ProductListCard
                        v-for="(product, index) in productList"
                        :index="index"
                        :product="product"
                        :key="product._id"
                      />
                    </b-container>
                  </b-col>
                  <!-- col kanan -->

                  <b-col cols="3" class="border">
                    <AddItemForm/>
                  </b-col>
                </b-row>
              </b-container>
            </b-tab>


          </b-tabs>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col>test lagi</b-col>
      </b-row> -->
    </b-container>
  </b-row>
  <!-- <div>

  </div>-->
</template>

<script>
import AddItemForm from '@/components/AddItemForm.vue';
import ProductListCard from '@/components/ProductListCard.vue';
import TransactionDetail from '@/components/TransactionDetail.vue';
import TransactionListCard from '@/components/TransactionListCard.vue';

export default {
  name: 'Admin',
  components: {
    AddItemForm,
    ProductListCard,
    TransactionListCard,
    TransactionDetail,
  },
  data() {
    return {};
  },
  created() {
    this.fetchProductData();
    this.fetchTransactionDataAdmin();
  },
  methods: {
    fetchProductData() {
      this.$store.dispatch('fetchProductData');
    },
    fetchTransactionDataAdmin() {
      // console.log('fetching transaction data')
      this.$store.dispatch('fetchTransactionDataAdmin');
    },
  },
  computed: {
    productList() {
      return this.$store.state.productList;
    },
    adminTransactions() {
      return this.$store.state.adminTransactions;
    },
  },
};
</script>

<style>
</style>
