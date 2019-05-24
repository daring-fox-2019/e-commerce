<template>
  <section>
    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex xs12>
          <banner :games="games"></banner>
        </v-flex>
        <game-card v-for="(game, index) in games" :key="index" :game="game" @view-game="viewGame"></game-card>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import banner from "@/components/banner.vue";
import gameCard from '../components/gameCard'

export default {
  props: ["isLoggedIn", "games"],
  components: {
    banner, gameCard
  },
  data() {
    return {};
  },
  methods: {
    viewGame(id) {
      this.$router.push(`/games/${id}`)
    }
  },
  created() {
    // console.log(this.games)
  }
};
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>