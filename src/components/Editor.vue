<template>
  <div class="Edit w-100">
    <div class="editor w-100" @click="edit">
      <div class="main">
        <div class="line">
          <div class="lines">
            <p v-for="line in values.length" v-html="line"></p>
          </div>
        </div>
        <div class="textarea">
          <div class="area" v-for="(data, index) in values" @click="edit($event, index)" :key="index">
            <Cursor v-if="index === editingLine && editingPos === -1"></Cursor>
            <div class="data" v-for="(text, pos) in data" @click="h($event, index, pos)">
              <p v-html="text"></p>
              <Cursor v-if="index === editingLine && pos === editingPos"></Cursor>
            </div>
          </div>
        </div>
      </div>
      <div class="submit" @click="submit">
        <p>実行</p>
      </div>
    </div>
    <div class="result">
      <div ref="result"></div>
      <div class="loader" v-if="loading"></div>
    </div>
    <div class="smaple" @click="sample"><p>Hello World!</p></div>
  </div>
</template>

<script setup>
import Cursor from '../components/Cursor.vue'
import axios from '../../node_modules/axios'
import { useTextSelection } from '@vueuse/core'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
</script>

<script>
export default {
  data() {
    return {
      values: [[], [], [], [], []],
      editing: false,
      loading: false,
      editingLine: -1,
      editingPos: 0,
      indentCount: 0,
      selectedText: null,
      user: null,
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  created() {
    this.selectedText = useTextSelection();
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyDown);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      console.log(user);
    });
  },
  computed() {

  },
  watch: {
    editingPos() {
      // console.log(this.editingPos);
    }
  },
  methods: {
    edit(e, index) {
      // console.log(e);
      e.preventDefault();
      e.stopPropagation();
      this.editing = true;
      this.editingLine = index !== undefined ? index : this.values.length - 1;
      this.editingPos = this.getValue().length - 1;
    },
    onKeyDown(e) {
      if (!this.editing && this.isEdit) return;

      e.preventDefault();
      // console.log(e);
      switch (e.key) {
        case 'Enter':
          this.doEnter(e);
          break;
        case 'ArrowUp':
          if (e.altKey) {
            this.doSwap('up');
            break;
          }
          this.editingLine = Math.max(this.editingLine - 1, 0);
          this.setPos();
          break;
        case 'ArrowDown':
          if (e.altKey) {
            this.doSwap('down');
            break;
          }
          this.editingLine = Math.min(this.editingLine + 1, this.values.length - 1);
          this.setPos();
          break;
        case 'ArrowLeft':
          this.doArrowLeft();
          break;
        case 'ArrowRight':
          this.doArrowRight();
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
        case 'Home':
          this.editingPos = -1;
          break;
        case 'End':
          this.setPos()
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
      this.editingPos = this.getValue().length - 1;
    },
    doEnter(e) {
      if (e.ctrlKey) {
        this.submit();
        return;
      }

      const value = this.getValue();
      const isIndent = value[value.length - 1] === ':';
      this.editingLine++;
      this.values.splice(this.editingLine, 0, []);
      if (isIndent) {
        this.indentCount++;
      } else {
        this.indentCount = 0;
      }
      for (let i = 0; i < this.indentCount; i++) {
        this.setValue('&emsp;');
      }
      this.setPos();
    },
    doBackspace(e) {
      // console.log(e);
      if (this.getValue().length === 0) {
        if (this.editingLine !== 0) {
          this.values.splice(this.editingLine, 1);
          this.editingLine = Math.max(this.editingLine - 1, 0);
          this.setPos();
        }
        return;
      }
      this.values[this.editingLine].splice(this.editingPos, 1);
      this.editingPos--;
    },
    doArrowLeft() {
      if (this.editingPos === -1) {
        this.editingLine--;
        this.setPos();
        return;
      }
      this.editingPos = Math.max(this.editingPos - 1, -1);
    },
    doArrowRight() {
      if (this.editingPos === this.getValue().length - 1) {
        this.editingLine++;
        this.editingPos = -1;
        return;
      }
      this.editingPos = Math.min(this.editingPos + 1, this.getValue().length - 1);
    },
    doDelete(e) {

    },
    doSwap(key) {
      const line = this.editingLine + (key === 'up' ? -1: 1);
      const temp = this.values[this.editingLine];
      this.values[this.editingLine] = this.values[line];
      this.values[line] = temp;
      this.editingLine = line;
    },
    redCharas() {
      'if'
      'elif'
      'else'
      'pass'
      'for'
      'in'
    },
    getData: function() {
      let data = '';
      for (let value of this.values) {
        for (let val2 of value) {
          const val3 = val2.replace('&nbsp;', ' ').replace('&emsp;', '\t');
          data += val3;
        }
        data += '\n';
      }
      return data;
    },
    submit() {
      this.$refs.result.innerText = '';
      this.loading = true;
      axios.post('http://localhost:55555/post', {
        user: this.user,
        data: this.getData()
      })
      .then(function(res) {
        this.loading = false;
        this.$refs.result.innerText = res.data.res;
        if (res.data.err) {
          this.$refs.result.innerText += res.data.err;
        }
      }.bind(this))
      .catch(err => function() {
        console.log(err);
        this.loading = false;
      }.bind(this));
    },
    h(e, index, pos) {
      e.preventDefault();
      e.stopPropagation();
      this.editingLine = index;
      this.editingPos = pos;
    },
    sample(e) {
      console.log(e)
    }
  },
  components: {
    Cursor
  }
}
</script>

<style lang="scss" scoped>
.Edit {
  p {
    margin-bottom: 0;
  }

  .editor {
    position: relative;
    height: 50vh;
    border: 1px solid #000;
    overflow: auto;
    cursor: text;

    .main {
      width: 100%;
      height: 90%;
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
  .result {
    height: 20vh;
    border: 1px solid #000;
    overflow: auto;
  }
  /* HTML: <div class="loader"></div> */
  .loader {
    width: 30px;
    aspect-ratio: 2;
    --_g: no-repeat radial-gradient(circle closest-side,#000 90%,#0000);
    background: 
      var(--_g) 0%   50%,
      var(--_g) 50%  50%,
      var(--_g) 100% 50%;
    background-size: calc(100%/3) 50%;
    animation: l3 1s infinite linear;
  }
  @keyframes l3 {
    20%{background-position:0%   0%, 50%  50%,100%  50%}
    40%{background-position:0% 100%, 50%   0%,100%  50%}
    60%{background-position:0%  50%, 50% 100%,100%   0%}
    80%{background-position:0%  50%, 50%  50%,100% 100%}
  }
}
</style>
