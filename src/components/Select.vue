<template>
  <div class="select px-5">
    <div class="d-flex">
      <div class="selections gap-2 w-50">
        <h5 v-html="question"></h5>
        <div class="form-check" v-for="(choice, i) in choices">
          <div class="inner">
            <input type="radio" class="form-check-input" :name="'selection-' + index" v-model="selected" :id="'selection-' + index + '-' + i" :value="i">
            <label class="form-check-label user-select-none" :for="'selection-' + index + '-' + i">{{ choice }}</label>
          </div>
        </div>
        <input type="submit" class="mt-2" @click="checkAnswer" value="決定">
        <p>{{ text }}</p>
      </div>
      <div class="editor w-50" v-if="data.code">
        <NewEditor />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NewEditor from '@/components/NewEditor.vue';

export default {
  components: {
    NewEditor
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
    }
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
    },
    question_no() {
      return Number(this.data.question_no);
    },
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    checkAnswer() {
      if (this.selected === this.answer) {
        if (!this.isClear) {
          axios.post('http://localhost:55555/question/solve', {
            user: JSON.stringify(this.user),
            id: this.id,
            section: this.section + 1,
            question_no: this.index + 1,
          })
            .then(res => {
              if (res.data.status === 'true') {
                this.text = "正解!";
                this.$emit('clear', this.question_no);
              } else {
                console.error(res.data.reason);
              }
            })
        } else {
          this.text = "正解!";
        }
      } else {
        this.text = `不正解。`;
      }
    }
  }
}
</script>

<style lang="scss">
.select {
  code {
    white-space: pre;
    tab-size: 4;
  }
}
</style>
