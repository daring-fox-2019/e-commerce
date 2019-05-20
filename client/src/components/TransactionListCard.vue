<template>
    <div class="row border">
        <b-col cols=1 class="border d-flex justify-content-end px-1">
            {{index+1}}
        </b-col>
        <b-col cols=4 class="border px-0">
            {{transaction._id}}
        </b-col>
        <b-col cols=3 class="border px-0">
            {{transaction.status}}
        </b-col>
        <b-col cols=2 class="border px-0">
            {{ transaction.user.name }}
        </b-col>
        <b-col cols=2 class="border px-0">
             <b-button 
                variant="outline-success" 
                size="sm" 
                v-if="transaction.status == 'waiting for payment'"
                @click="confirmPaymentAdmin(transaction._id)">Confirm</b-button>
                <b-button 
                variant="outline-danger" 
                size="sm" 
                v-if="transaction.status == 'paid' || transaction.status == 'delivered'"
                @click="revertPaymentAdmin(transaction._id)">Revert</b-button>
        </b-col>
    </div>
</template>

<script>
export default {
  props: ['transaction', 'index'],
  name: 'transaction-list-card',
  created() {
  },
  methods: {
      confirmPaymentAdmin(id) {
        //   console.log(id)
        this.$store.dispatch('confirmPaymentAdmin', id)
      },
      revertPaymentAdmin(id) {
          this.$store.dispatch('revertPaymentAdmin', id)
      }
  }
};
</script>

<style>

</style>
