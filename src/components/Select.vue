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
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      requierd: true
    }
  },
  mounted() {
    console.log(this.data);
  },
  data() {
    return {
      selected: -1,
      text: "",
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
    }
  },
  methods: {
    checkAnswer() {
      if (this.selected === this.answer) {
        this.text = "正解!";
      } else {
        this.text = `不正解。正解は${this.answerStr}でした。`;
      }
    }
  }
}
</script>
