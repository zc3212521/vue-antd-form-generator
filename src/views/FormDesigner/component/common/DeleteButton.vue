<template>
  <a-button
    class="delete-icon"
    size="small"
    shape="circle"
    icon="delete"
    @click.stop="deleteItem"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { deepClone } from '../../utils'
import { findIndexWithKey } from '../../utils/core'

export default {
  name: 'DeleteButton',
  props: {
    itemKey: {
      type: String,
      required: true
    }
  },
  computed: mapState({
    formData: state => state.formDesigner.formData
  }),
  methods: {
    deleteItem () {
      const delArr = findIndexWithKey(this.formData, this.itemKey)
      const formData = deepClone(this.formData)
      if (delArr.length === 1) {
        formData.splice(delArr[0], 1)
      } else {
        const children = formData[delArr[0]].columns[delArr[1]].children
        children.splice(delArr[2], 1)
        formData[delArr[0]].columns[delArr[1]].children = children
      }
      this.updateFormData(formData)
    },
    ...mapMutations({
      updateFormData: 'setFormData'
    })
  }
}
</script>

<style lang="less" scoped>
  .delete-icon {
    position: absolute;
    bottom: 0;
    right: 20px;
    transform: translateY(50%);
    color: red;
  }
</style>
