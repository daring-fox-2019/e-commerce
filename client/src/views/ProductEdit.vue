<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-name" label="Your Product Name:" label-for="product_name">
        <b-form-input
          id="product_name"
          v-model="form.name"
          required
          placeholder="Enter Product name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-stock"
        label="stock address:"
        label-for="stock"
        description="enter the amount of product that you want to sell"
      >
        <b-form-input
          id="stock"
          v-model="form.stock"
          type="number"
          required
          placeholder="Enter stock amount"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-price"
        label="price address:"
        label-for="price"
        description="enter the amount of product that you want to sell"
      >
        <b-form-input
          id="price"
          v-model="form.price"
          type="number"
          required
          placeholder="Enter price of this product"
        ></b-form-input>
      </b-form-group>

      <b-form-file
        v-model="form.image"
        :state="Boolean(form.image)"
        placeholder="Choose a file..."
        drop-placeholder="Drop file here..."
        accept="image/*"
        @change="onFileChange"
      ></b-form-file>
      <div class="mt-3">
        <!-- Selected image: {{ form.image ? form.image.name : '' }} -->
        <!-- image keys: {{ form.image ? Object.keys(form.image) : '' }} -->
      </div>
      <div v-if="form.image">
        <b-img
          size="sm"
          :src="form.image"
          center
          fluid
          block
          thumbnail
          alt="Preview image to be uploaded"
        ></b-img>
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "edit-product",
  props: {
    form: {
      type: Object,
      default: function() {
        return {
          // image: `http://icons.iconarchive.com/icons/icons-land/medical/256/People-Patient-Male-icon.png`
        };
      }
    }
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      this.form = {};
      // this.show = false;
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {      
        return;
      }      
      this.createImage(files[0]);
    },
    createImage(file) {
      
      let reader = new FileReader();
      let self = this;
      reader.onload = e => {
        self.form.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>