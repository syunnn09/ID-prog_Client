<template>
  <div class="studyView">
    <div v-if="data">
      <h5>
        <RouterLink :to="{ name: 'study', params: { id: parentUrl }}">{{ parentTitle }}</RouterLink>
        > {{ data.title }}
      </h5>
      <SelectTab :data="data" :tab="tab" :section="section" :collectTabs="collectTabs" @onChangeTab="onChangeTab" />
      <div v-for="(question, index) of data.questions" :key="index">
        <Select
          v-if="question.questionType === constant.QUESTION_TYPE.CHOICE"
          v-show="tab === index"
          @clear="clear"
          :data="question"
          :index="index"
          :user="user"
          :section="section"
          :isClear="isClear(question.question_no)"
          :id="data.id"
        ></Select>
        <Question
          v-if="question.questionType === constant.QUESTION_TYPE.QUESTION"
          v-show="tab === index"
          @clear="clear"
          :data="question"
          :index="index"
          :user="user"
          :section="section"
          :isClear="isClear(question.question_no)"
          :id="data.id"
        ></Question>
      </div>
    </div>
  </div>
</template>

<script setup>
import constant from "@/consts/const";
import Select from '@/components/Select.vue';
import Question from "@/components/Question.vue";
import SelectTab from '@/components/SelectTab.vue';

import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { RouterLink } from "vue-router";
</script>

<script>
export default {
  data() {
    return {
      data: null,
      tab: 0,
      section: 0,
      user: null,
      collectTabs: [],
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
  computed: {
    parentTitle() {
      return this.data.parent.title;
    },
    parentUrl() {
      return this.data.parent.url;
    }
  },
  methods: {
    getData() {
      const num = this.$route.params.id;
      const section = this.$route.params.section;
      axios.post('http://localhost:55555/api/getSection', {
        url: num,
        section: section,
        user: this.user.uid,
      })
        .then((data) => {
          this.data = data.data;
          if (this.data === null) {
            this.$router.push('/');
          } else {
            this.setCollectTabs();
          }
        });
    },
    onChangeTab(tab) {
      this.tab = tab;
    },
    changeSection(section) {
      this.section = section;
      this.tab = 0;
      this.setCollectTabs();
    },
    setCollectTabs() {
      this.collectTabs = [];
      for (let data of this.data.questions) {
        if (data.isCleared) {
          this.collectTabs.push(data.question_no);
        }
      }
    },
    clear(question_no) {
      this.collectTabs.push(question_no);
      this.data.questions[question_no-1].isCleared = true;
    },
    isClear(i) {
      return this.collectTabs.includes(i);
    },
  }
}
</script>
