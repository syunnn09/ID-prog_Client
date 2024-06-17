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
    <div class="d-flex gap-2">
      <p>入力例:</p>
      <select v-model="test_no">
        <option value="0">1</option>
        <option value="1">2</option>
      </select>
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
    <div class="submit border cursor-pointer" @click="submit">
      <p>テストする</p>
    </div>
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <td>テスト番号</td>
            <td>結果</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(_, index) in data.testsCount" :key="index">
            <td>テスト{{ index }}</td>
            <td v-if="doProg && correct[index] === undefined">
              <div class="loader2"></div>
            </td>
            <td v-else-if="doProg">{{ correct[index] ? '正解' : '不正解' }}</td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
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
      doProg: false,
      correct: [],
      test_no: 0,
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
  created() {
    this.initCorrect();
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
    initCorrect() {
      this.correct = [];

      for (let i = 0; i < this.data.testsCount; i++) {
        this.correct.push(undefined);
      }
    },
    async submit() {
      this.doProg = true;
      let isClear = true;
      this.initCorrect();

      for (let i = 0; i < this.data.testsCount; i++) {
        await axios.post('http://localhost:55555/prob', {
          user: this.user.uid,
          data: this.value,
          url: this.$route.params.id,
          section: this.$route.params.section,
          question_no: this.data.question_no,
          test_no: i,
        })
          .then((res) => {
            this.isLoading = false;
            this.correct[i] = res.data.correct;
            isClear = isClear && res.data.correct;
          })
          .catch((_) => {
            this.isLoading = false;
            this.correct[i] = false;
            isClear = false;
          });
      }

      if (!this.isClear && isClear) {
        axios.post('http://localhost:55555/question/solve', {
          user: this.user.uid,
          id: this.id,
          section: this.$route.params.section,
          question_no: this.index + 1,
        })
          .then(res => {
            if (res.data.status) {
              this.$emit('clear', this.index + 1);
            }
          })
      }
    },
    doTest() {
      this.isLoading = true;
      this.result = '';

      axios.post('http://localhost:55555/test', {
        user: this.user.uid,
        data: this.value,
        url: this.$route.params.id,
        section: this.$route.params.section,
        question_no: this.data.question_no,
        test_no: this.test_no,
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

.loader2 {
  width: 50px;
  aspect-ratio: 4;
  background: radial-gradient(circle closest-side,#000 90%,#0000) 0/calc(100%/3) 100% space;
  clip-path: inset(0 100% 0 0);
  animation: l1 1s steps(4) infinite;
}
@keyframes l1 {
  to{
    clip-path: inset(0 -34% 0 0)
  }
}
</style>
