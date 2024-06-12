<template>
  <div class="question">
    <div v-html="question"></div>
    <div v-for="(example, i) in data.examples" :key="i">
      <div class="mx-3">
        <div class="item">
          <div class="bg-body-tertiary p-sm-4 mb-4 rounded">
            <p>入力例: {{ i + 1 }}</p>
            <p v-html="example.input"></p>
          </div>
        </div>
        <div class="item">
          <div class="bg-body-tertiary p-sm-4 mb-4 rounded">
            <p>出力例: {{ i + 1 }}</p>
            <p v-html="example.output"></p>
          </div>
        </div>
      </div>
    </div>
    <NewEditor
      ref="editor"
      :is-question="true"
      :use-local-storage="false"
      :use-input="false"
      :prop-result="result"
      :prop-is-loading="isLoading"
      @onChangeValue="onChangeValue"
      @doTest="doTest"
    ></NewEditor>
    <div class="submit border" @click="submit">
      <p>実行</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import NewEditor from '@/components/NewEditor.vue';
</script>

<script>
export default {
  data() {
    return {
      value: "",
      result: "",
      isLoading: false,
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    section: {
      type: Number,
      required: true
    },
    isClear: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    question() {
      return this.data.question;
    },
  },
  methods: {
    onChangeValue(value) {
      this.value = value;
    },
    submit() {
      console.log("value:", this.value);
    },
    doTest() {
      this.isLoading = true;
      // this.result = '';

      axios.post('http://localhost:55555/test', {
        user: this.user.uid,
        data: this.value,
        url: this.$route.params.id,
        section: this.$route.params.section,
        question_no: this.data.question_no,
        test_no: 0,
      })
        .then((res) => {
          this.isLoading = false;
          this.result = res.data.res;
          if (res.data.err) {
            this.result += res.data.err;
          }
          console.log(res.data.correct);
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
          this.result = 'server error';
          this.result += err;
        });
    }
  }
}
</script>

<style lang="scss">
.item {
  max-width: 768px;
  border-left: 3px solid #000;
}
</style>
