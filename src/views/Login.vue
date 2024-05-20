<template>
  <div class="login">
<<<<<<< HEAD
    <div v-if="user === null">
      <input type="text" v-model="username">
      <input type="password" v-model="password">
      <button @click="signin">ログイン</button>
      <button @click="createAccount">新規作成</button>
    </div>
    <div v-else>
      <input type="submit" value="ログアウト" @click="logout">
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

=======
    <div ref="script">
      <meta name="google-signin-client_id" content="584003614528-g88g5pnng7chi1fmpc0ubbok4t7j7vkm.apps.googleusercontent.com">
    </div>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
    <form @submit.prevent="submit">
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
  import { store } from '@/store/index'
</script>

<script>
>>>>>>> 9d9642f28d952ed1890028a5c4b3bd46424e6cc2
export default {
  data () {
    return {
      username: '',
<<<<<<< HEAD
      password: '',
      user: null,
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      console.log(user);
    });
  },
  methods: {
    signin() {
      if (this.username === '' || this.password === '') return;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
        })
        .catch(err => console.log(err));
    },
    createAccount() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.username, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch(err => console.log(err));
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(e => {
          this.user = null;
        })
        .catch(err => console.log(err))
=======
      password: ''
    }
  },
  mounted() {
    let scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', 'https://apis.google.com/js/platform.js');
    scriptEl.async = true;
    scriptEl.defer = true;
    this.$refs.script.appendChild(scriptEl);
  },
  methods: {
    async submit () {
      await store.dispatch('login', {
        username: this.username,
        password: this.password
      });
      if (this.$store.state.user) {
        this.$toast.success('Welcome back!');
        this.$router.push(decodeURIComponent(this.$route.query.next || '/editor'));
      }
>>>>>>> 9d9642f28d952ed1890028a5c4b3bd46424e6cc2
    }
  }
}
</script>
