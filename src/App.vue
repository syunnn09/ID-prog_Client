<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
</script>

<template>
  <header class="navbar navbar-expand-lg bg-body-tertiary p-3">
    <div class="header d-flex justify-content-between align-items-center">
      <div class="title">
        <h3>ID-prog</h3>
      </div>
      <div class="btns">
        <div class="logout" v-if="user !== null" @click="logout">ログアウト</div>
        <RouterLink to="/login" v-else>ログイン</RouterLink>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<script>
export default {
  data() {
    return {
      user: null
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
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(e => {
          this.user = null;
          this.$router.push({ name: 'login', query: { logout: true } });
        })
        .catch(err => console.log(err))
    },
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100% !important;
}

header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
