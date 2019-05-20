<template>
  <v-card dark>
    <v-parallax :src="require(`@/assets/game/${pic}-1.jpg`)">
      <v-layout fill-height align-center pa-3>
        <v-flex xs12 md5 offset-md7 class="overlay-text">
          <h1 class="display-3 font-weight-black text-uppercase">{{ percentage }}% OFF</h1>
          <div
            class="subheading font-weight-medium text-uppercase pl-2 mb-4"
          >For {{ name }}</div>
          <v-btn color="primary" depressed round :to="'/games/' + id">View Details</v-btn>
        </v-flex>
      </v-layout>
    </v-parallax>
  </v-card>
</template>

<script>
export default {
  props: ['games'],
  data() {
    return {
      pic: '',
      id: '',
      name: '',
      percentage: 0
    }
  },
  created() {
    // buat balik ke aco
    this.pic = 'aco'
    this.id = '5cdf9df24d3c5945f8872538'
    this.name = 'Assassin\'s Creed Odyssey'
    let data = [
      'aco', 'swbf', 'acor', 'gta5', 'lis2', 'lmsh', 'terra', 'wdogs', 'witcher', 'dota'
    ]
    let rand = Math.round(Math.random() * (this.games.length - 1))
    if(this.games.length > 0) {
      this.pic = this.games[rand].shortkey
      this.id = this.games[rand]._id
      this.name = this.games[rand].name
    }
    this.percentage = (Math.round(Math.random() * 3) + 4) * 10
  }
}
</script>

<style>
.overlay-text {
  background-color: rgba(10, 10, 10, 0.9);
  border-radius: 5px;
  padding: 30px;
}
</style>
