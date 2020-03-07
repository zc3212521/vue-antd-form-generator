<template>
  <a-form-item
    :label="attr.label"
    :label-col="{ span: attr.layout }" :wrapper-col="{ span: attr.layout === 24 ? 24 : 24 - attr.layout }"
    :required="attr.rules.length > 0"
  >
    <a-select :options="attr.options" :value="attr.initialValue" :placeholder="attr.placeholder"/>
  </a-form-item>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SelectControl',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    attr () {
      return this.data.attr
    },
    ...mapState({
      formData: state => state.formDesigner.formData
    })
  }
}
</script>

<style lang="less" scoped>

</style>
