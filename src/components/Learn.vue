<template>
  <div class="learn d-flex justify-content-between">
    <div class="text w-50">
      <h3>{{ data.title }}</h3>
      <div v-html="data.detail"></div>
    </div>
    <div class="editor w-50">
      <NewEditor :use-local-storage="false"></NewEditor>
    </div>
  </div>
</template>

<script setup>
import NewEditor from '@/components/NewEditor.vue';
</script>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss">
code {
  margin: 1rem 0;
}
</style>
