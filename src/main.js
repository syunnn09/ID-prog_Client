import './assets/main.css'

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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

const app = createApp(App)

app.use(router)
app.mount('#app')
