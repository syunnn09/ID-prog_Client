import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD393qn9jt1_tB5ektLaXNETbfviUYhsDk",
  authDomain: "id-prog.firebaseapp.com",
  projectId: "id-prog",
  storageBucket: "id-prog.appspot.com",
  messagingSenderId: "584003614528",
  appId: "1:584003614528:web:24fa798a4a3924d2c92ca5",
  measurementId: "G-8ZX4JPF0RB"
};

// Initialize Firebase
initializeApp(firebaseConfig);
=======
import store from './store'
>>>>>>> 9d9642f28d952ed1890028a5c4b3bd46424e6cc2

const app = createApp(App)

app.use(router)
<<<<<<< HEAD
=======
app.use(store)

>>>>>>> 9d9642f28d952ed1890028a5c4b3bd46424e6cc2
app.mount('#app')
