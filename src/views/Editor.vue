<template>
  <div class="editor" @click="edit">
    <div class="main">
      <div class="line">
        <div class="lines">
          <p v-for="line in values.length" v-html="line"></p>
        </div>
      </div>
      <div class="textarea">
        <div class="area" v-for="(data, index) in values" @click="edit($event, index)" :key="index">
          <Cursor v-if="index === editingLine && editingPos === -1"></Cursor>
          <p class="data" v-for="(text, pos) in data" @click="h($event, index, pos)">
            <p v-html="text"></p>
            <Cursor v-if="index === editingLine && pos === editingPos"></Cursor>
          </p>
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
      values: [[], [], [], [], []],
      editing: false,
      editingLine: -1,
      editingPos: 0,
      indentCount: 0,
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyDown);
  },
  computed: {

  },
  watch: {
    editingPos() {
      console.log(this.editingPos);
    }
  },
  methods: {
    edit(e, index) {
      e.preventDefault();
      e.stopPropagation();
      this.editing = true;
      this.editingLine = index !== undefined ? index : this.values.length - 1;
      this.editingPos = this.getValue().length - 1;
    },
    onKeyDown(e) {
      e.preventDefault();
      // console.log(e);
      switch (e.key) {
        case 'Enter':
          this.doEnter();
          break;
        case 'ArrowUp':
          this.editingLine = Math.max(this.editingLine - 1, 0);
          this.setPos();
          break;
        case 'ArrowDown':
          this.editingLine = Math.min(this.editingLine + 1, this.values.length - 1);
          this.setPos();
          break;
        case 'ArrowLeft':
          this.editingPos = Math.max(this.editingPos - 1, -1);
          break;
        case 'ArrowRight':
          this.editingPos = Math.min(this.editingPos + 1, this.getValue().length - 1);
          break;
        case 'Escape':
          this.editing = false;
          break;
        case 'Tab':
          this.setValue('&emsp;');
          break;
        case ' ':
          this.setValue('&nbsp;');
          break;
        case 'Backspace':
          this.doBackspace(e);
          break;
        case 'Delete':
          this.doDelete(e);
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
      this.editingPos++;
      this.values[this.editingLine].splice(this.editingPos, 0, value);
    },
    setPos() {
      this.pos = this.getValue().length - 1;
    },
    doEnter() {
      const value = this.getValue();
      const isIndent = value[value.length - 1] === ':';
      this.editingLine++;
      this.values.splice(this.editingLine, 0, []);
      if (isIndent) {
        this.indentCount++;
      }
      for (let i = 0; i < this.indentCount; i++) {
        this.setValue('&emsp;');
      }
      this.editingPos = this.getValue().length;
    },
    doBackspace(e) {
      if (this.getValue().length === 0) {
        if (this.editingLine !== 0) {
          this.values.splice(this.editingLine, 1);
          this.editingLine = Math.max(this.editingLine - 1, 0);
        }
        return;
      }
      this.values[this.editingLine].splice(this.editingPos, 1);
      this.editingPos--;
    },
    doDelete(e) {

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
    },
    h(e, index, pos) {
      e.preventDefault();
      e.stopPropagation();
      this.editingLine = index;
      this.editingPos = pos;
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
  overflow: auto;
  cursor: text;

  .main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .lines {
    width: 1.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;
  }

  .textarea {
    display: flex;
    justify-content: center;
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
    display: flex;
  }

  .submit {
    position: sticky;
    width: fit-content;
    bottom: 0.5rem;
    left: 0.5rem;
    border: 1px solid #000;
    background-color: #fff;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    z-index: 10;
  }
}
</style>