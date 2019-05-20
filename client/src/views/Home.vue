<template>
  <section>
    <v-container grid-list-xl>
      <!-- fluid fill-height -->
      <v-layout wrap>
        <v-flex xs12>
          <banner :games="games"></banner>
        </v-flex>
        <v-flex xs6 v-for="(game, index) in games" :key="index">
          <v-card tile flat v-bind="$attrs" v-on="$listeners" height="350" class="pointer" @click.prevent="viewGame(game._id)">
            <v-img :src="require(`../assets/game/${game.shortkey}-1.jpg`)" height="100%">
              <v-layout fill-height wrap text-xs-right ma-0>
                <v-flex xs12>
                  <v-chip
                    label
                    class="mx-0 mb-2 text-uppercase"
                    color="grey darken-3"
                    text-color="white"
                    small
                    @click.stop
                  >{{ game.name }}</v-chip>
                  <v-spacer></v-spacer>
                  <v-chip label small class=" font-weight-bold mb-2 mx-0">
                      {{ game.priceStr }}
                  </v-chip>
                  <div class="caption">
                    <!-- {{ game.tags.join(', ') }} -->
                    <br>
                  </div>
                </v-flex>
                <v-flex align-self-end>
                  <v-btn color="primary" depressed small @click.prevent="viewGame(game._id)">View game</v-btn>
                </v-flex>
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import banner from "@/components/banner.vue";

export default {
  props: ["isLoggedIn", "games"],
  components: {
    banner
  },
  data() {
    return {};
  },
  methods: {
    viewGame(id) {
      // console.log({id})
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