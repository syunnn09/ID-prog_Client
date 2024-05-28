<template>
  <div class="selectTab">
    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
      <li v-for="i in questions" class="nav-item" role="presentation">
        <p @click="changeTab(i)" class="nav-link text-secondary user-select-none px-5" :class="{ active: isActive(i) }" id="detail-tab" data-bs-toggle="tab" role="tab" aria-controls="detail" aria-selected="true">{{ i }}</p>
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
    }
  },
  computed: {
    questions() {
      return this.data.sections[this.section].questions.length;
    }
  },
  methods: {
    isActive(i) {
      return this.tab === i - 1;
    },
    changeTab(i) {
      this.$emit('onChangeTab', i-1);
    }
  }
}
</script>
