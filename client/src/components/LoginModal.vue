<template>
    <div>
    <b-nav-item v-b-modal.modal-login>Sign in</b-nav-item>
        <b-modal id="modal-login" title="Login"  centered ref="modal-login">
            <b-form @submit.prevent="submitLogin">
                <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                >
                    <b-form-input
                    id="input-1"
                    type="email"
                    required
                    placeholder="Enter email"
                    v-model="login.email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                    <b-form-input
                    type="password"
                    id="input-2"
                    required
                    placeholder="Enter password"
                    v-model="login.password"
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary" @submit.prevent="submitLogin" hidden>Login</b-button>
            </b-form>


            <div slot="modal-footer">
                <b-button type="submit" variant="primary" @click.prevent="submitLogin">Login</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
  name: 'modal-login',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    };
  },
  created() {

  },
  methods: {
    submitLogin() {
      const { email, password } = this.login;
      const login_obj = { email, password };
      this.$store.dispatch('submitLogin', login_obj);
      this.hideModal();
    },
    showModal() {
      this.$refs['modal-login'].show();
    },
    hideModal() {
      this.$refs['modal-login'].hide();
    },
  },

};
</script>

<style>

</style>
