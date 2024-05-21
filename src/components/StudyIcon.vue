<template>
  <div class="studyIcon">
    <router-link :to="{ name: 'study', params: { id: id }}">
      <div class="card" style="width: 18rem;">
        <div class="d-flex justify-content-center border-bottom">
          <PythonLogo />
        </div>
        <div class="card-body">
          <p class="card-text">{{ text }}</p>
          <div class="progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="height: 0.5rem;">
            <div class="progress-bar" :style="width"></div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import PythonLogo from './icons/PythonLogo.vue'

export default {
  components: {
    PythonLogo
  },
  props: {
    text: {
      type: String,
      required: false,
      default: ""
    },
    progress: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      id: 1
    }
  },
  computed: {
    width() {
      return `width: ${this.progress}%;`;
    },
  }
}
</script>
