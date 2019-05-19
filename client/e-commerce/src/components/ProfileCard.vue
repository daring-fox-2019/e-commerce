<template>
  <b-card
    title='Profile'
  >
  <div class='container'>
    <div class='row d-flex justify-content-center'>
      <b-card-text>Full Name: {{ user.name }}</b-card-text>
    </div>
    <div class='row d-flex justify-content-center'>
      <b-card-text>Email: {{ user.email }}</b-card-text>
    </div>
  </div>
  </b-card>
</template>

<script>
export default {
  props: ['user']
}
</script>
