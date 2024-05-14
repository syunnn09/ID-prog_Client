<template>
  <div class="login">
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

export default {
  data () {
    return {
      username: '',
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
    }
  }
}
</script>
