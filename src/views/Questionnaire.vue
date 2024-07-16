<template>
  <div>
    <div class="d-flex gap-3">
      <div class="content">
        <p>良かった点</p>
        <textarea name="good" v-model="good" cols="50" rows="10"></textarea>
      </div>
      <div class="content">
        <p>悪かった点</p>
        <textarea name="bad" v-model="bad" cols="50" rows="10"></textarea>
      </div>
    </div>
    <div @click="submit" class="cursor-pointer">送信</div>
    <div>{{ res }}</div>
  </div>
</template>

<script setup>
import axios from '../../node_modules/axios'
</script>

<script>
export default {
  data() {
    return {
      good: "",
      bad: "",
      res: "",
    }
  },
  methods: {
    submit() {
      axios.post('http://localhost:55555/questionnaire', {
        good: this.good,
        bad: this.bad
      })
        .then(_ => this.res = 'ありがとうございました。');
    }
  }
}
</script>
