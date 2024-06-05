<template>
  <div class="newEditor d-flex gap-3 m-3">
    <div class="lineContainer" ref="lines">
      <div class="lines d-flex flex-column align-items-end" style="position: relative;" :style="{ top: divTop + 'px' }">
        <p v-for="i in branks">{{ i }}</p>
      </div>
    </div>
    <div class="w-100">
      <div class="highlight-container overflow-hidden">
        <div ref="highlight" class="highlight" :style="{ top: divTop + 'px' }"></div>
        <textarea
          class="form-control textarea resize-none"
          v-model="value"
          ref="textarea"
          wrap="off"
          @scroll="onScroll"
          @keydown="onInput"
          autocorrect="off"
          autocomplete="off"
          autocapitalize="false"
          spellcheck="false">
        </textarea>
      </div>
      <div class="customArea d-flex">
        <input type="submit" class="submit btn btn-primary" @click="submit" value="実行">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li><p @click="output" class="nav-link text-secondary user-select-none px-4" :class="{ active: showOutput }" id="detail-tab" data-bs-toggle="tab" role="tab" aria-controls="detail" aria-selected="true">出力</p></li>
          <li><p @click="input" class="nav-link text-secondary user-select-none px-4" :class="{ active: showInput }" id="detail-tab" data-bs-toggle="tab" role="tab" aria-controls="detail" aria-selected="false">入力</p></li>
        </ul>
      </div>
      <div class="result">
        <div v-html="result" v-if="showOutput"></div>
        <div v-if="showInput" class="h-100 overflow-hidden">
          <textarea v-model="args" ref="textarea" class="inputTextarea resize-none form-control"></textarea>
        </div>
        <div class="loader" v-if="loading"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
</script>

<script>
export default {
  data() {
    return {
      value: "",
      result: "",
      loading: false,
      user: null,
      divTop: 0,
      args: "",
      showInput: false,
      showOutput: true,
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
    this.value = localStorage.getItem('value') || '# -*- coding: utf-8 -*-\n\n\n';
  },
  mounted() {
    this.highlightText();
  },
  watch: {
    value() {
      localStorage.setItem('value', this.value);
    }
  },
  computed: {
    branks() {
      return this.getBranks(this.value);
    }
  },
  methods: {
    getBranks(text) {
      return (text.match(/\n/g) || []).length + 1;
    },
    onInput(e) {
      e.stopPropagation();

      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          this.insertTab(e);
          break;
        case 'Enter':
          if (e.ctrlKey) {
            e.preventDefault();
            this.submit();
          }
          break;
        case '(':
          break;
      }
      this.highlightText();
    },
    onScroll(e) {
      this.divTop = -e.target.scrollTop;
    },
    submit() {
      this.result = '';
      this.loading = true;
      this.showInput = false;
      this.showOutput = true;
      axios.post('http://localhost:55555/post', {
        user: this.user.uid,
        data: this.value,
        args: this.args,
      })
      .then((res) => {
        this.loading = false;
        this.result = res.data.res;
        if (res.data.err) {
          this.result += res.data.err;
        }
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
        this.result = 'server error';
        this.result += err;
      });
    },
    insertTab(e) {
      const textarea = e.target;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const textAfterCursor = textarea.value.substring(cursorPosition);
      const tab = '\t';
      const updatedText = textBeforeCursor + tab + textAfterCursor;
      textarea.value = updatedText;
      const newCursorPosition = cursorPosition + tab.length;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    },
    output() {
      this.showInput = false;
      this.showOutput = true;
    },
    input() {
      this.showInput = true;
      this.showOutput = false;
      this.$nextTick(() => {
        this.$refs.textarea.focus();
      });
    },
    highlightText() {
      const text = this.value;

      const highlightText = "for";
      const highlighted = text.replace(new RegExp(`(${highlightText})`, 'gi'), '<span>$1</span>');

      this.$refs.highlight.innerHTML = highlighted.replace(/\n/g, '<br>').replace(/\t/g, '&emsp;&emsp;');
    }
  }
}
</script>

<style lang="scss">
.newEditor {
  .lineContainer {
    width: 1.5rem;
    max-height: 50vh;
    overflow: hidden;
  }

  .highlight-container {
    position: relative;

    .highlight {
      display: none;
      margin-left: 0.03rem;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -100;

      span {
        color: red;
      }
    }
  }

  .textarea {
    padding: 0;
    height: 50vh;
    box-shadow: none;
    // color: #0000;
    caret-color: black;
    background: transparent;
  }
  
  .resize-none {
    resize: none;
  }

  .customArea {
    .nav {
      border-bottom: none;
    }
  }

  .result {
    border-radius: var(--bs-border-radius);
  }

  .inputTextarea {
    width: 100%;
    height: 100%;
  }

  .result {
    height: 20vh;
    border: 1px solid var(--bs-border-color);
    overflow: auto;
  }

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
