<template>
  <div class="signupView d-flex justify-content-center align-items-center">
    <div class="signup card mb-3 shadow p-3 bg-body-tertiary">
      <div class="main d-flex justify-content-center">
        <div class="signup-form">
          <h3 class="text-center">アカウント作成</h3>
          <p>Eメールアドレスとパスワードでアカウントを作成しましょう!</p>
          <p v-if="err" class="text-danger">{{ err }}</p>
          <div class="inputs my-3">
            <input type="text" v-model="email" id="email" class="w-100 mb-2" placeholder="sample@gmail.com">
            <input type="password" v-model="password" id="password" class="w-100 mb-2" placeholder="password">
            <input type="submit" @click="create" class="bg-dark text-white w-100 rounded" value="Sign up with email">
          </div>
          <!-- <div class="google">
            <p class="text-center">or continue with</p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
</script>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      err: "",
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        this.$router.push('/');
      }
    })
  },
  methods: {
    create() {
      if (!this.email || !this.password) return;

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user != null) {
            this.$router.push('/');
          }
        })
        .catch((err) => this.invalid(err.message))
    },
    invalid(message) {
      console.log(message);
      if (message.includes('auth/invalid-email')) {
        this.err = '正しいメールアドレスを入力してください。';
        return;
      }
      if (message.includes('auth/weak-password')) {
        this.err = "パスワードを6文字以上にしてください。";
        return;
      }
      if (message.includes('auth/email-already-in-use')) {
        this.err = "このメールアドレスは既に使用されています。";
        return;
      }
      this.err = "エラー";
    }
  }
}
</script>

<style lang="scss">

</style>
