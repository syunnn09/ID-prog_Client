<template>
  <div>
    <div class="icons row row-cols-1 row-cols-md-3 g-3">
      <div class="icon col" v-for="study of studies">
        <StudyIcon :study="study" />
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
      if (user !== null) {
        this.user = user;
        this.getData();
      }
    })
  },
  methods: {
    getData() {
      axios.post('http://localhost:55555/api/data', {
        user: this.user
      })
        .then(data => { this.studies = data.data });
    }
  }
}
</script>
