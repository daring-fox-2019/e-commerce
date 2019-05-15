<template>
<div>
    <div class="container">
        <b-nav>
            <b-nav-item :class="`border ${mode ? 'background-change' : ''} mr-2`" @click="changeMode(true)"> <i class="fas fa-shopping-bag"></i> <b> BUY </b></b-nav-item>
            <b-nav-item :class="`border ${!mode ? 'background-change' : ''}`" @click="changeMode(false)"> <i class="fas fa-money-bill-alt"></i> <b> SELL </b></b-nav-item>
        </b-nav>
        <hr>
    </div> 

    <div class="transaction-detail container" id="buy" v-if="mode">
        <h2> Buy transaction detail </h2>
        <b-table :items="items" :busy="isBusy" class="mt-3" outlined>
            <div slot="table-busy" class="text-center text-success my-5">
                <b-spinner class="align-middle"></b-spinner>
            </div>
        </b-table>
    </div>

     <div class="transaction-detail container" id="sell" v-if="!mode">
        <h2> Sell transaction detail </h2>
        <b-table :items="items" :busy="isBusy" class="mt-3" outlined>
            <div slot="table-busy" class="text-center text-success my-5">
                <b-spinner class="align-middle"></b-spinner>
            </div>
        </b-table>
    </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        mode : false,
        isBusy: false,
        items: [
          { first_name: 'Dickerson', last_name: 'MacDonald', age: 40 },
          { first_name: 'Larsen', last_name: 'Shaw', age: 21 },
          { first_name: 'Geneva', last_name: 'Wilson', age: 89 },
          { first_name: 'Jami', last_name: 'Carney', age: 38 }
        ]
      }
    },
    methods: {
      toggleBusy() {
        this.isBusy = !this.isBusy
      },
      changeMode(status){
          this.mode = status
      }
    }
  }
</script>
<style scoped>
    a {
        color:black;
    }
    .background-change{
        background: #f6f5f5
    }
</style>

