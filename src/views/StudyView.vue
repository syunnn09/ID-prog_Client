<template>
  <div class="studyView">
    <div v-if="data">
      <h4>{{ data.title }}</h4>
      <SelectTab :data="data" :tab="tab" @onChangeTab="onChangeTab" />
      <Select
        v-if="data.sections[2].questions[tab].questionType === constant.QUESTION_TYPE.CHOICE"
        :data="data.sections[2].questions[tab]"
      ></Select>
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
