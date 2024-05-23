<template>
  <div class="studyView">
    <div v-if="data">
      <p>{{ data.title }}</p>
      <Select
        v-if="data.sections[1].questions[0].questionType === constant.QUESTION_TYPE.CHOICE"
        :data="data.sections[1].questions[0]"
      ></Select>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import constant from "@/consts/const";
import Select from '../components/Select.vue'
</script>

<script>
export default {
  components: {
    Select
  },
  data() {
    return {
      data: null,
    }
  },
  created() {
    const num = this.$route.params.id;
    axios.post('http://localhost:55555/api/getDetail', {
      id: num
    })
      .then((data) => {
        // console.log(data.data);
        this.data = data.data;
      })
  },
}
</script>

<style lang="scss">

</style>