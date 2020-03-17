<template>
  <a-form-item
    :style="{ textAlign: data.layout.type }"
  >
    <a-button
      v-for="(btn, index) in buttons"
      :key="btn.text"
      :disabled="btn.disabled"
      :type="btn.type || 'default'"
      :size="btn.size || 'default'"
      @click="() => { clickBtn(index) }"
      :style="{marginRight: gutter / 2 + 'px'}"
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
    },
    gutter: {
      type: Number,
      default: 24
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
