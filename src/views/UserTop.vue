<template>
  <div>
    <div class="icons row row-cols-1 row-cols-md-3 g-3">
      <div class="icon col" v-for="study of studies">
        <StudyIcon :text="study.title" :progress="study.progress"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import StudyIcon from '@/components/StudyIcon.vue'
import axios from '../../node_modules/axios'
</script>

<script>
export default {
  components: {
    StudyIcon
  },
  data() {
    return {
      studies: [],
    }
  },
  created() {
    axios.get('http://localhost:55555/api/data')
      .then(data => { console.log(data); this.studies = data.data })
  },
}
</script>
