import * as firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: process.env.VUE_APP_apiKey,
    authDomain: process.env.VUE_APP_authDomain,
    databaseURL: process.env.VUE_APP_databaseURL,
    projectId: process.env.VUE_APP_projectId,
    storageBucket: process.env.VUE_APP_storageBucket,
    appId: process.env.VUE_APP_appId
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

var db = firebase.firestore()
export default db