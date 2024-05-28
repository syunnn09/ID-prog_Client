<template>
  <div class="Editor">
    <!-- <Editor :isEdit="isEdit" /> -->
    <NewEditor />
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
import NewEditor from '@/components/NewEditor.vue';

export default {
  components: {
    Editor,
    NewEditor
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
