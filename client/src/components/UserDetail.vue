<template>
  <v-layout column>
    <h1>Profile</h1>
    <v-layout column>
      <v-flex class="lg6">
        <v-form ref="form" lazy-validation @submit.prevent="updateUserData">
          <v-text-field v-model="userData.firstname" label="First Name" required></v-text-field>
          <v-text-field v-model="userData.lastname" label="Last Name" required></v-text-field>
          <v-layout>
            <v-spacer/>
            <v-btn small type="submit" color="yellow light black--text">Save Changes</v-btn>
          </v-layout>
        </v-form>
      </v-flex>
      <v-flex lg3 ml-2>
        <v-form>
          <input class="mt-3" type="file" @change="onFileChange">
          <v-btn small class="info align-self-center" @click="updateProfilePic">Update Picture</v-btn>
        </v-form>
        <div id="userImagePreview">
          <img :src="profileImage.imageurl">
        </div>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
import { mapState } from "vuex";
import api from "@/api/backend.js";

export default {
  data() {
    return {
      profileImage: {
        imageurl: null,
        name: "",
        data: ""
      },
      userData: {
        firstname: "",
        lastname: ""
      }
    };
  },
  computed: {
    ...mapState(["user"])
  },
  mounted() {
    if (this.user.image) {
      this.profileImage.imageurl = this.user.image;
    }
    this.profileImage.imageurl = "";
    this.userData = { ...this.$store.state.user };
  },
  methods: {
    getCurrentUser() {
      api
        .get("/auth/user/", {
          headers: { Authorization: localStorage.ecomm_token }
        })
        .then(({ data }) => {})
        .catch(({ response }) => {
          swal.fire("Error", response.data, "error");
        });
    },
    updateUserData() {
      api
        .patch(
          "/auth/user",
          {
            firstname: this.userData.firstname,
            lastname: this.userData.lastname
          },
          { headers: { Authorization: localStorage.ecomm_token } }
        )
        .then(({ data }) => {
            this.$store.commit("setUser", data);
            this.$router.push("/user");
        })
        .catch(err => {
          if (err.response) {
            err = err.response.data;
          }
          swal.fire("Error", err, "error");
        });
    },
    updateProfilePic() {
      const formData = this.getFormData();
      api.patch("/auth/user/profpic", formData, { headers: { Authorization: localStorage.ecomm_token } })
        .then(({ data }) => {
            this.$store.commit("setUser", data);
            this.$router.push("/user");
        })
        .catch(err => {
            if (err.response) {
                err = err.response.data;
            }
            swal.fire("Error", err, "error");
        })
    },
    getFormData() {
      const formData = new FormData();
      formData.append("image", this.profileImage.data, this.profileImage.name);
      return formData;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.profileImage.imageurl = URL.createObjectURL(file);
      console.log(this.profileImage);
      this.createFile(file);
    },
    createFile(file) {
      if (!file.type.match("image.*")) {
        console.log("Select an image");
        return;
      }

      var img = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = function(e) {
        vm.image = e.target.result;
        this.image = e.target.result;

        vm.profileImage.data = file;
        vm.profileImage.name = file.name;
      };

      reader.readAsDataURL(file);
    }
  }
};
</script>
<style scoped>
#userImagePreview {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

#userImagePreview img {
  max-width: 100%;
  max-height: 300px;
}
</style>


