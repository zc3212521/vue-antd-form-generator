<template>
  <div class="control-item-wrap">
    <input-control v-if="data.type === 'input'" :data="data" />
    <input-number-control v-if="data.type === 'inputNumber'" :data="data" />
    <radio-control v-if="data.type === 'radio'" :data="data" />
    <select-control v-if="data.type === 'select'" :data="data" />
    <checkbox-control v-if="data.type === 'checkbox'" :data="data" />
    <delete-button :itemKey="data.key" v-if="activeKey === data.key"/>
  </div>
</template>

<script>
import DeleteButton from '../../common/DeleteButton'
import InputControl from './InputControl'
import InputNumberControl from './InputNumberControl'
import RadioControl from './RadioControl'
import SelectControl from './SelectControl'
import CheckboxControl from './CheckboxControl'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ControlItemView',
  components: {
    DeleteButton,
    InputControl,
    InputNumberControl,
    RadioControl,
    SelectControl,
    CheckboxControl
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      formData: state => state.formDesigner.formData,
      activeKey: state => state.formDesigner.activeKey
    })
  },
  methods: {
    ...mapMutations({
      updateFormData: 'setFormData',
      updateActiveIndex: 'setActiveIndex'
    })
  }
}
</script>

<style lang="less" scoped>
.control-item-wrap {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    content: '';
    display: block;
  }
  span {
    cursor: move;
  }
  div {
    cursor: move;
  }
}
</style>
