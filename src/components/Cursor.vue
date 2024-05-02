<template>
  <div class="cursor" ref="cursor"></div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.cursor {
  width: 1px;
  height: 1.3rem;
  animation: animate 1000ms infinite;
  border-left: 1px solid #000;
}

@keyframes animate {
  50% {
    opacity: 0;
  }
  0%, 100% {
    opacity: 0.5;
  }
}
</style>
