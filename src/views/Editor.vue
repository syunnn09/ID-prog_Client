<template>
  <div class="editor" @click="edit">
    <div class="main">
      <div class="line">
        <div class="lines">
          <p v-for="line in values.length">
            {{ line }}
          </p>
        </div>
      </div>
      <div class="textarea">
        <div class="area" v-for="(data, index) in values" @click="edit($event, index)" :key="index">
          <p class="data" @keypress="keypress">{{ data }}</p>
          <Cursor v-if="index === editingLine"></Cursor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cursor from '../components/Cursor.vue'

export default {
  data() {
    return {
      values: ['Hello', '', '', '', ''],
      editing: false,
      editingLine: -1,
    }
  },
  mounted() {
    
  },
  computed: {

  },
  methods: {
    edit: function(e, index) {
      e.preventDefault();
      e.stopPropagation();
      this.editing = true;
      this.editingLine = index !== undefined ? index : this.values.length - 1;
    },
    keypress: function(e) {
      if (e.key == 'Enter') {
        this.values.push('');
        return;
      }
      if (this.editing) {
        console.log(this.editingLine);
        let value = this.values[this.editingLine] | ''; 
        this.values[this.editingLine] = value + e.key;
        console.log(this.values);
        this.values.splice();
      }
    }
  },
  components: {
    Cursor
  }
}
</script>

<style lang="scss" scoped>
.editor {
  width: 50vw;
  height: 50vh;
  border: 1px solid #000;
  cursor: text;

  .main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.5rem;
    gap: 0.5rem;
  }

  .lines {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  .textarea {
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    width: 100%;
    z-index: 1;
  }

  .area {
    display: flex;
    align-items: center;
    height: 1.5rem;
    gap: 0.1rem;
  }

  .data {
    z-index: 3;
  }
}
/* .line {
  height: 100%;
  border-right: 1px solid #000;
} */
</style>