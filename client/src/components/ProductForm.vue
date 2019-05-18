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
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="$emit('${type}', product)"
      >
        <v-text-field v-model="product.title" :rules="titleRules" label="Title" required></v-text-field>
        <v-textarea
          box
          auto-grow
          v-bind:value="product.description"
          placeholder="Enter your product description"
        ></v-textarea>
        <v-flex py-3>
            <h2 class="mb-2">Stock Quantity</h2>
            <Quantity :quantity="product.stock" @updatequantity="updateProductStock"></Quantity>
        </v-flex>
        <v-flex py-3>
            <h2>Product Image</h2>
            <input class="mt-3" type="file" @change="onFileChange" />
            <div id="preview">
                <img v-if="imageurl" :src="imageurl" />
            </div>
        </v-flex>
        <v-btn small color="error" @click="reset">Reset Form</v-btn>
        <v-btn small color="warning" @click="resetValidation">Reset Validation</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
import Quantity from '@/components/Quantity.vue'

export default {
  props: ["type"],
  components: {
      Quantity,
  },
  data: () => ({
    valid: true,
    imageurl: '',
    product: {
      title: "",
      description: "",
      image: "",
      stock: 0
    },
    titleRules: [v => !!v || "Title is required"],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),
  methods: {
    updateProductStock(qty) {
        this.product.stock = qty
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.imageurl = URL.createObjectURL(file);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.product= 
      { 
        title: "",
        description: "",
        image: "",
        stock: 0,
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
<style scoped>
#preview {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>


