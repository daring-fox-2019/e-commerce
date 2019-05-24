<template>
  <v-flex xs6 >
    <v-card
      tile
      flat
      v-bind="$attrs"
      v-on="$listeners"
      height="350"
      class="pointer"
      @click.prevent="viewGame(game._id)"
    >
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
            <v-chip label small class="font-weight-bold mb-2 mx-0">{{ game.priceStr }}</v-chip>
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
</template>

<script>
export default {
  props: ['game'],
  methods: {
    viewGame(id) {
      this.$emit('view-game', id)
    }
  }
};
</script>

<style>
</style>
