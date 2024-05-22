<template>
  <div class="login d-flex justify-content-center">
    <div class="mb-3">
      <div class="w-100">
        <div class="text">
          <p v-if="text">{{ text }}</p>
        </div>
        <main class="form-signin w-100 m-auto">
          <div class="form-floating my-3">
            <input type="text" class="form-control" id="username" v-model="username" @keyup.enter="signin">
            <label for="username">メールアドレス</label>
          </div>
          <div class="form-floating my-3">
            <input type="password" class="form-control" id="password" v-model="password" @keyup.enter="signin">
            <label for="password">パスワード</label>
          </div>
          <button class="btn btn-primary w-100 mb-3 py-2" @click="signin">ログイン</button>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
</script>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      user: null,
      text: null,
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      console.log(user);
      if (this.user !== null) {
        this.$router.push('/');
      }
    });
    if (this.$route.query.logout === 'true') {
      this.text = 'ログアウトしました。';
    } else {
      this.text = '';
    }
  },
  methods: {
    signin() {
      if (this.username === '' || this.password === '') return;
      const auth = getAuth();
      this.text = null;
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch(err => this.text = 'ログイン失敗');
    },
  }
}
</script>
