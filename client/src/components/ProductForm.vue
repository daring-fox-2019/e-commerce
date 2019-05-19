<template>
  <v-layout column>
    <v-flex xs12 lg8>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="$emit(`on${type}`, product)"
      >
      <v-layout>
        <v-spacer/>
        <v-btn small type="submit" color="yellow light black--text" v-if="type == 'add'">Submit</v-btn>
        <v-btn small type="submit" color="yellow light black--text" v-else>Save Changes</v-btn>
        <v-btn small color="error" to="/products">Cancel</v-btn>
      </v-layout>
        <v-text-field v-model="product.name" :rules="nameRules" label="Product Name" required></v-text-field>
        <v-textarea
          box
          auto-grow
          v-model="product.description"
          placeholder="Enter your product description"
        ></v-textarea>
        <v-flex xs12 md6 lg4>
            <v-layout>
                <v-flex>
                    <h2 class="mb-2">Stock Quantity</h2>
                    <Quantity :quantity="product.stock" @updatequantity="updateProductStock"></Quantity>
                </v-flex>
                <v-flex lg6>
                    <v-text-field class="mt-3" v-model="product.price" label="Unit Price"></v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex py-3 mb-5>
          <h2>Product Image</h2>
          <v-form>
            <input class="mt-3" type="file" @change="onFileChange">
            <div id="preview" v-if="imageData.imageurl">
                <img :src="imageData.imageurl">
            </div>
            <v-btn class="error align-self-center" v-if="imageData.imageurl" @click="removeFile">Remove</v-btn>
          </v-form>
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
  props: ["type", 'data'],
  components: {
      Quantity,
  },
  data: () => ({
    valid: true,
    imageData: {
        imageurl: null,
        data: null,
        name: '',
    },
    product: {
      name: "",
      description: "",
      image: "",
      stock: 0,
      price: 0,
    },
    nameRules: [v => !!v || "Name is required"],
  }),
  mounted() {
    this.product = { ...this.$props.data };
    this.imageData.imageurl = this.product.image;
    this.$refs.form.resetValidation();
  },
  watch: {
    'data': function() {
      this.product = { ...this.$props.data };
      this.imageData.imageurl = this.product.image;
    },
  },
  methods: {
    updateProductStock(qty) {
        this.product.stock = qty
    },
    onFileChange(e) {
        const file = e.target.files[0];
        this.imageData.imageurl = URL.createObjectURL(file);
        this.createFile(file);
    },
    createFile(file) {
        if (!file.type.match('image.*')) {
            console.log('Select an image');
            return;
        }

        var img = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = function(e) {
            vm.image = e.target.result;
            this.image = e.target.result;

            vm.imageData.data = file
            vm.imageData.name = file.name
            vm.product.image = vm.imageData
        }

        reader.readAsDataURL(file);
    },
    removeFile() {
        this.imageData.imageurl = null;
        this.$refs.imageInput.value = '';
    },
    reset() {
      console.log('reset called...');
      this.$refs.form.reset();
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
  align-content: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>


