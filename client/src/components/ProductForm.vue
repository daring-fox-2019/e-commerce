<template>
  <v-layout column>
    <v-flex xs12 lg8>
      <v-layout>
        <v-spacer/>
        <v-btn small color="yellow light black--text" v-if="type == 'add'">Submit</v-btn>
        <v-btn small color="yellow light black--text" v-else>Save Changes</v-btn>
        <v-btn small color="error" to="/products">Cancel</v-btn>
      </v-layout>
    </v-flex>
    <v-flex xs12 lg8>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="$emit('${type}', product)">
        <v-text-field v-model="product.title" :rules="titleRules" label="Title" required></v-text-field>
        <v-textarea
          box
          auto-grow
          v-bind:value="product.description"
          placeholder="Enter your product description"
        ></v-textarea>

        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn small :disabled="!valid" color="success" @click="validate">Validate</v-btn>

        <v-btn small color="error" @click="reset">Reset Form</v-btn>

        <v-btn small color="warning" @click="resetValidation">Reset Validation</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: ["type"],
  data: () => ({
    valid: true,
    product: {
        title: '',
        description: '',
        image: '',
        stock: 0,
    },
    titleRules: [v => !!v || "Title is required"],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

