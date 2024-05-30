<template>
  <div class="select px-5">
    <div class="selections d-grid gap-2 col-6">
      <h5 v-html="question"></h5>
      <div class="form-check" v-for="(choice, i) in choices">
        <div class="inner">
          <input type="radio" class="form-check-input" :name="'selection-' + index" v-model="selected" :id="choice" :value="i">
          <label class="form-check-label user-select-none" :for="choice">{{ choice }}</label>
        </div>
      </div>
    </div>
    <input type="submit" class="mt-2" @click="checkAnswer" value="決定">
    <p>{{ text }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      requierd: true
    },
    user: {
      type: Object,
      requierd: true
    },
    section: {
      type: Number,
      required: true
    }
  },
  mounted() {
    console.log(this.data);
    this.isClear = this.isCleared;
  },
  data() {
    return {
      selected: -1,
      text: "",
      isClear: false,
    }
  },
  computed: {
    question() {
      return this.data.question;
    },
    answer() {
      return Number(this.data.answer);
    },
    choices() {
      return this.data.choices;
    },
    answerStr() {
      return this.choices[this.answer];
    },
    question_no() {
      return Number(this.data.question_no);
    },
    id() {
      return this.$route.params.id;
    },
    isCleared() {
      return this.data.isCleared === true;
    }
  },
  methods: {
    checkAnswer() {
      if (this.selected === this.answer) {
        if (!this.isCleared && !this.isClear) {
          axios.post('http://localhost:55555/question/solve', {
            user: JSON.stringify(this.user),
            id: this.id,
            section: this.section + 1,
            question_no: this.index + 1,
          })
            .then(res => {
              if (res.data.status === 'true') {
                this.text = "正解!";
                this.isClear = true;
              } else {
                console.error(res.data.reason);
              }
            })
        }
      } else {
        this.text = `不正解。`;
      }
    }
  }
}
</script>
