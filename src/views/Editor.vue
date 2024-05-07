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
          <p class="data" @keypress="keypress" v-html="data"></p>
          <Cursor v-if="index === editingLine"></Cursor>
        </div>
      </div>
    </div>
    <div class="submit" @click="submit">
      <p>実行</p>
    </div>
  </div>
</template>

<script>
import Cursor from '../components/Cursor.vue'
import axios from '../../node_modules/axios'

export default {
  data() {
    return {
      values: ['', '', '', '', ''],
      editing: false,
      editingLine: -1,
      indentCount: 0,
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyDown);
  },
  computed: {

  },
  methods: {
    edit(e, index) {
      e.preventDefault();
      e.stopPropagation();
      this.editing = true;
      this.editingLine = index !== undefined ? index : this.values.length - 1;
    },
    onKeyDown(e) {
      // console.log(e);
      switch (e.key) {
        case 'Enter':
          this.doEnter();
          break;
        case 'ArrowUp':
          this.editingLine = Math.max(this.editingLine - 1, 0);
          break;
        case 'ArrowDown':
          this.editingLine = Math.min(this.editingLine + 1, this.values.length - 1);
          break;
        case 'Escape':
          this.editing = false;
          break;
        case 'Tab':
          e.preventDefault();
          this.setValue('&emsp;');
          break;
        case ' ':
          this.setValue('&nbsp;');
          break;
        case 'Backspace':
          this.doBackspace(e);
          break;
        default:
          if (e.key.length === 1) {
            this.setValue(e.key);
          }
          break;
      }
    },
    getValue() {
      return this.values[this.editingLine] || ''; 
    },
    setValue(value) {
      const val = this.values[this.editingLine] || '';
      this.values[this.editingLine] = val + value;
    },
    doEnter() {
      const isIndent = this.getValue().slice(-1) === ':';
      this.editingLine++;
      this.values.splice(this.editingLine, 0, '')
      if (isIndent) {
        this.indentCount++;
      } else {
        this.indentCount = Math.max(this.indentCount - 1, 0);
      }
      for (let i = 0; i < this.indentCount; i++) {
        this.setValue('&emsp;');
      }
    },
    doBackspace(e) {
      if (this.getValue().length === 0) {
        if (this.values.length !== 1) {
          this.values.splice(this.editingLine, 1);
          this.editingLine = Math.max(this.editingLine - 1, 0);
        }
        return;
      }
      this.values[this.editingLine] = this.getValue().replaceAll('&nbsp;', ' ').replaceAll('&emsp;', '\t');
      this.values[this.editingLine] = this.getValue().slice(0, -1);
      this.values[this.editingLine] = this.getValue().replaceAll(' ', '&nbsp;').replaceAll('\t', '&emsp;');
    },
    redCharas() {
      'if'
      'elif'
      'else'
      'pass'
      'for'
      'in'
    },
    submit() {
      axios.post('http://localhost:55555/post', {
        data: 'sample'
      })
      .then(function(res) {
        console.log(res);
      })
    }
  },
  components: {
    Cursor
  }
}
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
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

  .submit {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
}
/* .line {
  height: 100%;
  border-right: 1px solid #000;
} */
</style>