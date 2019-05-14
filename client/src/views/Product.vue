<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <v-layout>
      <v-flex xs4 id="list">
        <v-card v-for="a in 3" :key="a" class="car">
            <v-flex >
              <v-card>
                <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75" left></v-img>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>{{ card_text }}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs8 id="detail">
        <v-card dark color="green darken-2">
          <v-card-text>#2 Im a Shrink Flex</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    // HelloWorld,
  },
};
</script>

<style scoped>
.car {
  margin-bottom:15px;
}

#list{
  padding: 10px;
  height: 100vh;
  overflow: scroll;
  margin-right: 5px;
}

#detail{
  display: fixed;
}
</style>
