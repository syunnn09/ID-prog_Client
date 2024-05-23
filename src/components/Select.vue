<template>
  <div class="select">
    <p>{{ question }}</p>
    <div class="selections">
      <div class="form-check" v-for="(choice, i) in choices">
        <input type="radio" class="form-check-input" name="selection" v-model="selected" :id="choice" :value="i">
        <label class="form-check-label" :for="choice">{{ choice }}</label>
      </div>
      <input type="submit" @click="checkAnswer" value="決定">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.data);
  },
  data() {
    return {
      selected: 0,
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
