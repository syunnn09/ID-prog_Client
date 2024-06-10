<template>
  <div>
    <div class="progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="height: 0.5rem;">
      <div class="progress-bar" :style="style"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      required: true
    }
  },
  computed: {
    style() {
      return `width: ${this.width}%;`;
    }
  }
}
</script>
