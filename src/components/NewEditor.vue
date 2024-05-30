<template>
  <div class="newEditor d-flex gap-3 m-3">
    <div class="lineContainer" ref="lines">
      <div class="lines d-flex flex-column align-items-end" style="position: relative;" :style="{ top: divTop + 'px' }">
        <p v-for="i in branks">{{ i }}</p>
      </div>
    </div>
    <div class="w-100">
      <textarea
        class="form-control textarea resize-none"
        v-model="value"
        ref="textarea"
        @scroll="onScroll"
        @input="onInput"
        @keydown.tab.prevent="onInput"
        autocorrect="off"
        autocomplete="off"
        autocapitalize="false"
        spellcheck="false">
      </textarea>
      <div class="customArea d-flex">
        <div class="submit" @click="submit">
          <p>実行</p>
        </div>
        <div class="submit" @click="output">
          <p>出力</p>
        </div>
        <div class="submit" @click="input">
          <p>入力</p>
        </div>
      </div>
      <div class="result">
        <div v-html="result" v-if="showOutput"></div>
        <div v-if="showInput" class="h-100">
          <textarea v-model="args" class="inputTextarea resize-none"></textarea>
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
      e.preventDefault();
      e.stopPropagation();

      switch (e.key) {
        case 'Tab':
          this.insertTab(e);
          break;
      }
      localStorage.setItem('value', this.value);
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
        user: this.user,
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

  .textarea {
    padding: 0;
    height: 50vh;
    box-shadow: none;
  }
  
  .resize-none {
    resize: none;
  }

  .customArea {
    .submit {
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
