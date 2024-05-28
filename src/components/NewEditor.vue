<template>
  <div class="newEditor d-flex gap-3 m-3">
    <div class="lineContainer" ref="lines">
      <div class="lines d-flex flex-column align-items-end" style="position: relative;" :style="{ top: divTop + 'px' }">
        <p v-for="i in branks">{{ i }}</p>
      </div>
    </div>
    <div class="w-100">
      <textarea
        class="form-control textarea"
        v-model="value"
        ref="textarea"
        @scroll="onScroll"
        @input="onInput"
        @keydown.tab.prevent="onInput"
        autocollect="off"
        autocapitalize="off"
        spellcheck="off">
      </textarea>
      <div class="submit" @click="submit">
        <p>実行</p>
      </div>
      <div class="result">
        <div v-html="result"></div>
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
      args: "hello world",
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
    this.value = localStorage.getItem('value') || '\n\n\n';
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
      localStorage.setItem('value', {user: "", value: this.value});
    },
    onScroll(e) {
      this.divTop = -e.target.scrollTop;
    },
    submit() {
      this.result = '';
      this.loading = true;
      axios.post('http://localhost:55555/post', {
        user: this.user,
        data: this.value,
        args: this.args,
      })
      .then(function(res) {
        this.loading = false;
        this.result = res.data.res;
        if (res.data.err) {
          this.result += res.data.err;
        }
      }.bind(this))
      .catch(err => function() {
        console.log(err);
        this.loading = false;
      }.bind(this));
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
    }
  }
}
</script>

<style lang="scss">
.newEditor {
  .lineContainer {
    width: 1.5rem;
    margin-top: 6px;
    max-height: 50vh;
    overflow: hidden;
  }

  .textarea {
    height: 50vh;
    resize: none;
    box-shadow: none;
  }

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
