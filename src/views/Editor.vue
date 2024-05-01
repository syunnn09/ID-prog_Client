<template>
  <div class="editor" @click="edit">
    <div class="main">
      <div class="line">
        <div class="lines">
          <p v-for="line in lines">
            {{ line }}
          </p>
        </div>
      </div>
      <div class="textarea">
        <div class="area" v-for="data in values">
          <p @click="console.log(data)">{{ data }}</p>
        </div>
      </div>
      <div class="cursor"></div>
    </div>
    <div class="cursor" ref="cursor"></div>
    <!-- <textarea class="textcursor" ref="textarea" wrap="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea> -->
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
  mounted() {
    
  },
  methods: {
    edit: function() {
      this.editing = true;
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
  padding: 0 0.5rem;
  gap: 0.5rem;
}
/* .line {
  height: 100%;
  border-right: 1px solid #000;
} */
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
}
.area {
  height: 1.5rem;
}
.textcursor {
  opacity: 1;
  font-size: 1px;
  height: 1px;
  width: 1px;
}
.cursor {
  position: absolute;
  display: block;
  top: 50px;
  left: 4px;
  width: 7px;
  height: 17px;
  animation: animate 1000ms infinite;
  border-left: 2px solid #000;
}
@keyframes animate {
  50% {
    opacity: 0;
  }
  0%, 100% {
    opacity: 1;
  }
}
</style>