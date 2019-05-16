<template>
  <div>
    <v-container fluid fill-height>
      Dalam v-container
      <v-layout justify-center align-center>Dalam v-layout</v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  props: ['isLoggedIn'],
  components: {
    //
  },
};
</script>
