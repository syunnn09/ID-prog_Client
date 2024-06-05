<template>
  <div class="userTop">

    <div class="studies">
      <p class="mb-0">教材一覧</p>
      <div class="icons">
        <div class="spinner-border" role="status" v-if="!studies.length">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="icon" v-for="study of studies" :key="study">
          <StudyIcon :study="study"></StudyIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StudyIcon from '@/components/StudyIcon.vue'
import axios from '../../node_modules/axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
</script>

<script>
export default {
  components: {
    StudyIcon
  },
  data() {
    return {
      studies: [],
      user: null
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        this.$router.push('/login');
        return;
      }
      this.user = user;
      this.getData(user);
    });
  },
  methods: {
    getData(user) {
      axios.post('http://localhost:55555/api/data', {
        user: user.uid
      })
        .then(data => { this.studies = data.data });
    }
  }
}
</script>

<style>
.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
