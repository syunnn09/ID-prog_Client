<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
</script>

<template>
  <header class="navbar navbar-light bg-light justify-content-between p-3">
    <div class="title">
      <h3>ID-prog</h3>
    </div>
    <div class="btns" v-if="user !== null">
      <a href="javascript:void(0)" class="logout" v-if="user !== null" @click="logout">ログアウト</a>
    </div>
    <div class="btns" v-else>
      <RouterLink to="/signup" class="btn btn-outline-success p-1 mx-1">新規作成</RouterLink>
      <RouterLink to="/login" class="btn btn-outline-success p-1 mx-1">ログイン</RouterLink>
    </div>
  </header>

  <div class="routerView">
    <RouterView />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  created() {
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
          this.$router.push('/login');
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

header {
  width: 100vw;
}

.routerView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
