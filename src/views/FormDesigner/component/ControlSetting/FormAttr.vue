<template>
  <div>
    <a-form>
      <a-form-item label="栅格间隔">
        <a-input-number />
      </a-form-item>
      <a-form-item label="表单底部按钮">
        <a-checkbox @change="onShowButton" :checked="ifShowButton">是否显示底部按钮</a-checkbox>
        <bottom-btn-setting :ifDisabled="!ifShowButton"/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import BottomBtnSetting from '../common/BottomBtnSetting'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'FormAttr',
  components: {
    BottomBtnSetting
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      ifShowButton: state => state.formDesigner.ifShowButton
    })
  },
  methods: {
    onShowButton (e) {
      this.updateIfShowButton(e.target.checked)
    },
    ...mapMutations({
      updateIfShowButton: 'setIfShowButton'
    })
  }
}
</script>

<style lang="less" scoped>

</style>
