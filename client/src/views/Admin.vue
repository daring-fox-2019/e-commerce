<template>
  <v-container>
    <v-progress-linear v-show="loading" color="teal" :indeterminate="true"></v-progress-linear>
    <v-btn
      color="teal"
      dark
      @click.stop="formWindow = true"
    >
      POST A PRODUCT
    </v-btn>
    <v-dialog
      v-model="formWindow"
      max-width="30%"
    >
      <ProductForm @close="formWindow = !formWindow"/>
    </v-dialog>
  </v-container>
</template>

<script>
import ProductForm from '@/components/ProductForm.vue';
import { mapState } from 'vuex';

export default {
  name: 'admin',
  components: {
    ProductForm,
  },
  computed: {
    ...mapState([
      'isLogin',
      'role',
      'loading',
    ]),
  },
  watch: {
    isLogin() {
      this.checkLog();
    },
  },
  created() {
    this.checkLog();
  },
  data() {
    return {
      formWindow: false,
    };
  },
  methods: {
    checkLog() {
      if (!this.isLogin || this.role !== 'admin') {
        this.$router.push('/');
      }
    },
  },
};
</script>
