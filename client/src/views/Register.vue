<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-name" label="Your Name:" label-for="username">
        <b-form-input id="username" v-model="form.name" required placeholder="Enter name"></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-email"
        label="Email address:"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="password:" label-for="Password">
        <b-form-input type="password" id="password" v-model="form.password" required></b-form-input>
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
        <b-img size="sm" :src="form.image" center fluid block thumbnail alt="Responsive image"></b-img>
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
import { mapActions } from "vuex";

export default {
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
      this.registerNewUser(this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form = {};
      this.show = false;
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
        // self.hasImage = true;
        self.form.image = e.target.result;
        // console.log(self.form.image)
      };
      reader.readAsDataURL(file);
    },
    ...mapActions(["registerNewUser"])
  }
};
</script>