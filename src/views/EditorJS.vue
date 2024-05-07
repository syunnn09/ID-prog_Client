<template>
  <div class="editor">
    <div id="editor"></div>
    <div class="submit" @click="submit">submit</div>
  </div>  
</template>

<script>
import EditorJS from '@editorjs/editorjs';

export default {
  mounted() {
    this.editor = new EditorJS({
      holder: 'editor',
      placeholder: 'code here',
      data: {},
    })
  },
  methods: {
    async submit() {
      await this.editor.save().then((savedData) => {
        console.log(savedData);
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>