<template>
  <div class="selectTab">
    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
      <li v-for="i in questions" class="nav-item position-relative" role="presentation">
        <p
          @click="changeTab(i)"
          class="nav-link text-secondary user-select-none px-5 bg-transparent"
          :class="{ active: isActive(i) }"
          id="detail-tab"
          data-bs-toggle="tab"
          role="tab"
          aria-controls="detail"
          :aria-selected="isActive(i)">
          {{ this.data.questions[i-1]['question_no'] }}
        </p>
        <i v-if="isCleared(i)" class="bi bi-circle position-absolute top-0 link-danger z-n1" style="right: 3px;"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    tab: {
      type: Number,
      required: false,
      default: 0
    },
    section: {
      type: Number,
      required: true
    },
    collectTabs: {
      type: Array,
      required: true
    }
  },
  computed: {
    questions() {
      return this.data.questions.length;
    },
  },
  methods: {
    isActive(i) {
      return this.tab === i - 1;
    },
    changeTab(i) {
      this.$emit('onChangeTab', i-1);
    },
    isCleared(i) {
      return this.collectTabs.includes(i);
    }
  }
}
</script>
