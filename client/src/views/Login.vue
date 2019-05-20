<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset">
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

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import {mapActions} from 'vuex'


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
      this.login(this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form = {};
      this.show = false;
    },
    ...mapActions(["login"])
  }
};
</script>