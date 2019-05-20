<template>
  <div>
    <div style="overflow:scroll; height: 50vh">
      <div v-for="(chat,i) in listChat" :key="i">
        <p></p>
      </div>
    </div>
    <b-from @submit.prevent="sendChat">
      <input type="text" v-model="chatText">
      <b-button type="submit">send</b-button>
    </b-from>
  </div>
</template>


<script>
import firebase from "firebase";
import db from "@/database/firebase";

export default {
  data() {
    return {
      listChat: null,
      chatText: null
    };
  },
  mounted() {},
  methods: {
    snapShot() {
      db.collection("rooms")
        .doc(this.roomGame)
        .onSnapshot(querySnapshot => {
          let data = querySnapshot.data();
          this.game = data;
        });
    },
    sendChat() {
        db.collection('chat')
    }
  }
};
</script>

