<template>
  <span>
    <template v-if="field.type === 'input'">
      <input-com :field="field" />
    </template>
    <template v-if="field.type === 'inputNumber'">
      <input-number-com :field="field" />
    </template>
    <template v-if="field.type === 'radio'">
      <radio-com :field="field" />
    </template>
    <template v-if="field.type === 'checkbox'">
      <checkbox-com :field="field" />
    </template>
    <template v-if="field.type === 'select'">
      <select-com :field="field" />
    </template>
  </span>
</template>

<script>
import InputCom from './fromItem/InputCom'
import RadioCom from './fromItem/RadioCom'
import CheckboxCom from './fromItem/CheckboxCom'
import SelectCom from './fromItem/SelectCom'
import InputNumberCom from './fromItem/InputNumberCom'

export default {
  name: 'FieldCom',
  components: {
    InputCom,
    RadioCom,
    CheckboxCom,
    SelectCom,
    InputNumberCom
  },
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  watch: {
    field: {
      handler: function (val, oldVal) {
        // console.log('watch', val, oldVal)
      },
      deep: true
    }
  },
  created () {
    this.options = this.field.options
  }
}
</script>

<style scoped>

</style>
