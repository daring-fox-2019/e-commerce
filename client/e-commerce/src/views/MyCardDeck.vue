<template>
    <div class="container" style="margin-top: 100px">
        <h1 class="p-2"> My <b> Products </b></h1>
        <div class="row">
            <Card v-for="(item, i) in itemUser" :key="i" :item="item"/>
        </div>
    </div>
</template>

<script>
import Card from '@/components/Card.vue';
import axios from '@/database/axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapState(['itemUser']),
  },
  components: {
    Card,
  },
  mounted() {
    // this.fetchDataItems()
    this.$store.dispatch('fetchDataUser');
  },
  methods: {
    // fetchDataUser(){
    //     axios.get('/products/user', { headers : {token: localStorage.getItem('token')}})
    //     .then( ({data}) => {
    //         console.log(data)
    //         this.items = data
    //     })
    //     .catch( err => {
    //         console.log(err)
    //         //this.$swal('Opps...', `${err.response.data.message}`, 'error')
    //     })
    // }
  },
};
</script>
