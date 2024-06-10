<template>
  <div class="studyIcon">
    <router-link :to="{ name: 'study', params: { id: study.url }}">
      <div class="card" style="width: 13rem;">
        <div class="d-flex justify-content-center border-bottom">
          <PythonLogo />
        </div>
        <div class="card-body">
          <p class="card-text">{{ study.title }}</p>
          <Progress :width="this.study.progress"></Progress>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import PythonLogo from './icons/PythonLogo.vue';
import Progress from './Progress.vue';

export default {
  components: {
    PythonLogo,
    Progress
  },
  props: {
    study: {
      type: Object,
      required: true,
    },
  },
}
</script>
