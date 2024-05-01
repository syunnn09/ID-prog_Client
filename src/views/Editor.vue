<template>
  <div class="editor" @lcick="edit">
    <div class="main">
      <div class="lines">
        <p v-for="line in lines">
          {{ line }}
        </p>
      </div>
      <div class="textarea">
        <p v-for="data in values">
          <p>{{ data }}</p>
        </p>
      </div>
    </div>
    <div class="cursor" ref="cursor"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lines: 5,
      values: ['Hello', '', '', '', ''],
      editing: false,
    }
  },
  methods: {
    edit: function() {
      this.editing = true;
      this.$refs.cursor;
    }
  }
}
</script>

<style>
.editor {
  width: 50vw;
  height: 50vh;
  border: 1px solid #000;
  cursor: text;
}
.main {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
.lines {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

</style>