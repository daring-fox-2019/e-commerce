<template>
  <div>
    <header class="navbar d-flex justify-content-around " style="background-color: #D2D1FF; margin-bottom: 50px;" >
      <ul>
        <a href="#" @click="displayProducts('anything')" style="color: #130831">
          <li style="font-size: 25px;padding: 10px;">All</li>
        </a>
        <a href="#" @click="displayProducts('Ships')" style="color: #130831">
          <li style="font-size: 25px;padding: 10px;">Ships</li>
        </a>
        <a href="#" @click="displayProducts('Helmets')" style="color: #130831">
          <li style="font-size: 25px;padding: 10px;">Helmets</li>
        </a>
        <a href="#" @click="displayProducts('Suits')" style="color: #130831">
          <li style="font-size: 25px;padding: 10px;">Suits</li>
        </a>
        <a href="#" @click="displayProducts('Gloves')" style="color: #130831">
          <li style="font-size: 25px;padding: 10px;">Gloves</li>
        </a>
        <a href="#" @click="displayProducts('Boots')" style="color: #130831">
          <li style="font-size: 25px;padding: 10px;">Boots</li>
        </a>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    displayProducts(category) {
      console.log(category);
      this.$store.commit('displayProducts', category);
    },
  },
};
</script>

<style>
</style>
