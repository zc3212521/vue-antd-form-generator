<template>
  <a-form-item
    :label="field.label"
    :has-feedback="field.validateOption.icon"
    :validate-status="field.validateOption.status"
    :help="field.validateOption.message"
    :label-col="field.layout.labelCol"
    :wrapper-col="field.layout.wrapperCol"
    :required="!!field.rules && field.rules.length > 0"
  >
    <a-checkbox-group v-decorator="[field.id, {
        initialValue: field.initialValue
      }]" :options="options" />
  </a-form-item>
</template>

<script>
export default {
  name: 'CheckboxCom',
  props: {
    field: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      options: []
    }
  },
  created () {
    this.options = this.field.options
  }
}
</script>

<style scoped>

</style>
