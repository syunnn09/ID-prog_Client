<template>
  <div class="editor">
    <ContenteditableEditor />
    <!-- <NewEditor /> -->
  </div>
</template>

<script>
import NewEditor from '@/components/NewEditor.vue';
import ContenteditableEditor from '@/components/ContenteditableEditor.vue';

export default {
  components: {
    NewEditor,
    ContenteditableEditor
  }
}
</script>
