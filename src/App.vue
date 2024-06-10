<template>
  <nav class="nav navbar bg-body-tertiary p-3">
    <div class="container-fluid">
      <div class="d-flex align-items-center gap-3">
        <h3 class="title nav-item">
          <RouterLink to="/">ID-prog</RouterLink>
        </h3>
        <div class="nav-item">
          <RouterLink to="/editor" class="nav-link active" aria-current="page">エディター</RouterLink>
        </div>
      </div>
      <div>
        <div v-show="isAuthChecked">
          <div class="btns" v-if="user !== null">
            <a href="javascript:void(0)" class="logout" @click="logout">ログアウト</a>
          </div>
          <div class="btns" v-else>
            <RouterLink to="/signup" class="btn btn-outline-success p-1 mx-1">新規作成</RouterLink>
            <RouterLink to="/login" class="btn btn-outline-success p-1 mx-1">ログイン</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="routerView">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
</script>

<script>
export default {
  data() {
    return {
      user: null,
      isAuthChecked: false,
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.isAuthChecked = true;
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

.routerView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
