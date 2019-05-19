<template>
  <v-card>
    <v-container>
      <v-card-title>
        <h1 class="display-1">Post a product</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="upload" v-model="productForm.valid">
          <v-text-field
            color="teal"
            v-model="productForm.email"
            :rules="productForm.emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            color="teal"
            v-model="productForm.password"
            :rules="productForm.passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-layout justify-end row>
            <v-btn type="submit" flat color="green">Login</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'productForm',
  data() {
    return {
      productForm: {
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
        ],
        description: '',
        price: 0,
        priceRules: [
          v => !!v || 'Password is required',
        ],
      },
    };
  },
  methods: {
    resetForm() {
      this.productForm.name = '';
      this.productForm.price = 0;
    },
    login() {
      const { email, password } = this.loginForm;
      this.$store.dispatch('login', { email, password });
      this.$emit('close');
      this.resetForm();
    },
  },
};
</script>
