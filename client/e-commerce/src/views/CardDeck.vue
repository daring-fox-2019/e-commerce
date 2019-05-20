<template>
    <div class="container" style="margin-top: 100px">
        <div class="row">
            <Card v-for="(item, i) in itemAll" :key="i" :item="item"/>
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
  components: {
    Card,
  },
  computed: {
    ...mapState(['itemAll']),
  },
  mounted() {
    this.$store.dispatch('fetchDataItems');
  },
  methods: {
    // fetchDataItems(){
    //     axios.get('/products')
    //     .then( ({data}) => {
    //         this.items = data
    //     })
    //     .catch( err => {
    //         this.$swal('Opps...', `${err.response.data.message}`, 'error')
    //     })
    // }
  },
};
</script>
