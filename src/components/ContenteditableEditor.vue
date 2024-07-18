<template>
  <div class="editor">
    <div
      class="inner"
      @input="sync"
      @keydown.tab.prevent="sync"
      @scroll="onScroll"
      contenteditable="true"
      autocorrect="off"
      autocomplete="off"
      autocapitalize="false"
      spellcheck="false"><div># -*- coding: utf-8 -*-</div><br><div></div><br></div>
    <div class="inner2" v-html="html" ref="html" :style="{ top: divTop + 'px' }"></div>
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
    }
  },
  computed: {
    html() {
      return this.text;
    }
  },
  methods: {
    sync(e) {
      let text = e.target.innerHTML;
      if (e.key === 'Tab') {
        this.insert();
      }
      const replaceTexts = ['for', 'if', 'in'];
      let html = e.target.innerText;
      // for (let line of e.target.innerText.split(' ')) {
      //   for (const t of replaceTexts) {
      //     // html = line.replaceAll(t, `<span class="red">${t}</span>`);
      //     if (line === t) {
      //       line = `<span class="red">${t}</span>`;
      //     }
      //   }
      //   html += line;
      // }
      // text = line.replaceAll('print', '<span class="blue">print</span>');
      this.text = text;
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
  border: 1px solid #000;
  position: relative;
  border-radius: 5px;
}

.inner, .inner2 {
  padding: 0.25rem;
  width: 100%;
  height: 100%;
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
}
</style>

<style>
.tab {
  display: inline-block;
  width: 2rem;
}
.red {
  color: #f00;
}
.blue {
  color: #00f;
}
</style>

