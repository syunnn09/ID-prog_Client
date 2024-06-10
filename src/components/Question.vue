<template>
  <div class="question">
    <p>{{ question }}</p>
    {{ samples }}
  </div>
</template>

<script setup>

</script>

<script>
export default {
  data() {
    return {

    }
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
    },
    // id: {
    //   type: Number,
    //   required: true
    // }
  },
  computed: {
    question() {
      return this.data.question;
    },
    samples() {
      return this.data.tests[0];
    }
  }
}
</script>
