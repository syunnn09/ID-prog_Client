<template>
  <div class="Editor">
    <Editor :isEdit="isEdit" />
  </div>
</template>

<script>
import Editor from '../components/Editor.vue'

export default {
  components: {
    Editor
  },
  data() {
    return {
      isEdit: false
    }
  },
  mounted() {
    this.isEdit = true;
  },
  destroyed() {
    this.isEdit = false;
    console.log('destroy')
  },
}
</script>
