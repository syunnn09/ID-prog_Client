<template>
  <div class="studyView">
    <div v-if="data">
      <h4>{{ data.title }}</h4>
      <div class="sections d-flex gap-3">
        <div v-for="(section, i) of data.sections">
          <div @click="changeSection(i)">{{ section.title }}</div>
        </div>
      </div>
      <SelectTab :data="data" :tab="tab" :section="section" @onChangeTab="onChangeTab" />
      <div v-for="(question, index) of data.sections[section].questions" :key="index">
        <Select
          v-if="question.questionType === constant.QUESTION_TYPE.CHOICE"
          v-show="tab === index"
          :data="question"
          :index="index"
          :user="user"
          :section="section"
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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
      section: 0,
      user: null,
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (user != null) {
        this.getData();
      }
    });
  },
  methods: {
    getData() {
      const num = this.$route.params.id;
      axios.post('http://localhost:55555/api/getDetail', {
        id: num,
        user: JSON.stringify(this.user),
      })
        .then((data) => {
          this.data = data.data;
        });
    },
    onChangeTab(tab) {
      this.tab = tab;
    },
    changeSection(section) {
      this.section = section;
    },
  }
}
</script>

<style lang="scss">

</style>
