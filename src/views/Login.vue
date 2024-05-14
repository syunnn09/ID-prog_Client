<template>
  <div class="login">
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
export default {
  data () {
    return {
      username: '',
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
    }
  }
}
</script>
