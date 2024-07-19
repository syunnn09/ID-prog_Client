<template>
  <div class="main">
    <div class="d-flex">
      <div class="editor">
        <div class="left-container">
          <div class="left" :style="{ top: divTop + 'px' }">
            <p v-for="i in lines">{{ i }}</p>
          </div>
        </div>
        <div
          class="inner"
          @input="sync"
          @keydown.tab.prevent="sync"
          @scroll="onScroll"
          contenteditable="true"
          autocorrect="off"
          autocomplete="off"
          autocapitalize="false"
          spellcheck="false"><div># -*- coding: utf-8 -*-</div><div><br></div><div><br></div></div>
        <div class="html">
          <div class="inner2" v-html="html" ref="html" :style="{ top: divTop + 'px' }"></div>
        </div>
      </div>
    </div>
  </div>
  <p @click="test">テスト</p>
</template>

<script>
export default {
  watch: {
    text(n, _) {
      this.text = n;
    }
  },
  data() {
    return {
      text: "# -*- coding: utf-8 -*-",
      divTop: 0,
      lines: 3,
    }
  },
  computed: {
    html() {
      return this.text;
    }
  },
  methods: {
    sync(e) {
      if (e.key === 'Tab') {
        this.insert();
      }
      const replaceTexts = ['for', 'if', 'in'];
      for (let line of e.target.children) {
        let html = '';
        for (let text of line.innerHTML.split(' ')) {
          if (replaceTexts.includes(text)) {
            html += `<span class="red">${text}</span>`;
          } else {
            html += text;
          }
        }
        line.innerHTML = html;
      }
      this.text = e.target.innerHTML;
      this.lines = e.target.children.length;
    },
    insert() {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.classList.add('tab');
      range.insertNode(span);
      range.setStartAfter(span);
    },
    test() {
      console.log(this.text);
      console.log(this.$refs.html.innerText);
    },
    onScroll(e) {
      this.divTop = -e.target.scrollTop;
    },
  }
}
</script>

<style scoped>
.editor {
  height: 50vh;
  width: 100%;
  position: relative;
  border-radius: 5px;
  display: flex;
}

.inner, .html {
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  position: absolute;
  overflow: auto;
  outline: none;
  border-radius: 5px;
}

.inner {
  z-index: 100;
  background: transparent;
  color: #0000;
  caret-color: #000;
}
.inner2 {
  z-index: -100;
  position: relative;
}

.left-container {
  height: 50vh;
  overflow: hidden;
  position: absolute;
  left: -2rem;
  padding: 0.25rem;
  text-align: right;
  width: 25px;
}

.left {
  position: relative;
}
</style>

<style>
.tab {
  display: inline-block;
  width: 2rem;
}
.space {
  display: inline-block;
  width: 10px;
}
.red {
  color: #f00;
}
.blue {
  color: #00f;
}
</style>

