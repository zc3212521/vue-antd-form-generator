<template>
  <a-form-item
    :label-col="data.layout.labelCol"
    :wrapper-col="data.layout.wrapperCol"
  >
    <a-button
      v-for="(btn, index) in buttons"
      :key="btn.text"
      :disabled="btn.disabled"
      :type="btn.type"
      :size="btn.size"
      @click="() => { clickBtn(index) }"
      :style="{marginRight: '15px'}"
    >{{btn.text}}</a-button>
  </a-form-item>
</template>

<script>
export default {
  name: 'FooterCom',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    buttons: function () {
      return this.data.buttons
    }
  },
  methods: {
    clickBtn (index) {
      this.$emit('click-btn', index, this.buttons[index].ifValidateForm)
    }
  }
}
</script>

<style scoped>

</style>
