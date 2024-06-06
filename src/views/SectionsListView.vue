<template>
  <div class="selectionListView">
    <div v-if="data" class="d-flex flex-column gap-3 mt-3">
      <RouterLink :to="{ name: 'questions', params: { id: url, section: section.section } }" v-for="section of data.sections" class="d-flex justify-content-center">
        <div class="col-xl-3 col-sm-6 col-12"> 
          <div class="card">
            <div class="card-body">
              <div class="media">
                <div class="media-body">
                  <p>{{ section.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
</script>

<script>
export default {
  data() {
    return {
      user: null,
      data: null,
      url: this.$route.params.id
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (user != null) {
        this.getData();
      }
    })
  },
  methods: {
    getData() {
      axios.post('http://localhost:55555/api/getDetail', {
        url: this.url,
        user: this.user.uid,
      })
        .then((data) => {
          this.data = data.data;
        });
    }
  }
}
</script>
