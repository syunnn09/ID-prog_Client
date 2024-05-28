<template>
  <div class="studyView">
    <div v-if="data">
      <h4>{{ data.title }}</h4>
      <SelectTab :data="data" :tab="tab" @onChangeTab="onChangeTab" />
      <div v-for="(question, index) of data.sections[2].questions" :key="index">
        <Select
          v-if="question.questionType === constant.QUESTION_TYPE.CHOICE"
          v-show="tab === index"
          :data="question"
        ></Select>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import constant from "@/consts/const";

import Select from '@/components/Select.vue';
import SelectTab from '@/components/SelectTab.vue';
</script>

<script>
export default {
  components: {
    Select,
    SelectTab
  },
  data() {
    return {
      data: null,
      tab: 0,
    }
  },
  created() {
    const num = this.$route.params.id;
    axios.post('http://localhost:55555/api/getDetail', {
      id: num
    })
      .then((data) => {
        this.data = data.data;
      })
  },
  methods: {
    onChangeTab(tab) {
      this.tab = tab;
    }
  }
}
</script>

<style lang="scss">

</style>
