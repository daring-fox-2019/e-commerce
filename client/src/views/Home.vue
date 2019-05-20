<template>
  <div class="home">
    <Carousel />

    <b-container fluid class="px-0">
      <b-row>
        User Transaction List
      </b-row>
      <b-row 
        v-for="(transaction, index) in userTransactions"
        :key="transaction._id">
        <b-col cols=1>
          {{index+1}}
        </b-col>
        <b-col cols=3>
          {{transaction._id}}
        </b-col>
        <b-col cols=3>
          {{transaction.status}}
        </b-col>
        <b-col>
          <div v-if="transaction.status == 'paid'">
            Paid: xxxxxxxxxxx
          </div>
          <div v-else>
            Total to be paid: xxxxxxxxxxx
          </div>
        </b-col>
        <b-col cols=2>
          <button 
            type="button" 
            class="btn btn-info" 
            v-if="transaction.status == 'paid'"
            @click="confirmDelivery(transaction._id)">Confirm Delivery</button>
        </b-col>
        
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue';

export default {
  name: 'home',
  components: {
    Carousel,
  },
  created() {
    this.fetchUserTransactions()
  },
  methods: {
    fetchUserTransactions() {
      this.$store.dispatch('fetchUserTransactions')
    },
    confirmDelivery(transaction_id) {
      this.$store.dispatch('confirmDelivery', transaction_id)
    }
  },
  computed: {
    userTransactions() {
      return this.$store.state.userTransactions
    }
  }
};
</script>
