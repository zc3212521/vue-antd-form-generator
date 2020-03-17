<template>
  <div>
    <a-form>
      <a-form-item label="栅格横向间隔">
        <a-input-number :value="gutter" @change="onGutter" style="margin-right: 10px;" />
        <a-tooltip>
          <template slot="title">
           具体效果可在预览中查看，推荐使用 (16+8n)px 作为栅格间隔。(n 是自然数)
          </template>
          <a-icon type="question-circle" theme="filled" />
        </a-tooltip>
      </a-form-item>
      <a-form-item label="表单底部按钮">
        <a-checkbox @change="onShowButton" :checked="ifShowButton">是否显示底部按钮</a-checkbox>
        <bottom-btn-setting :ifDisabled="!ifShowButton"/>
      </a-form-item>
      <a-form-item label="按钮布局">
        <a-radio-group :value="bottomButtonLayout" @change="onButtonLayout" :disabled="!ifShowButton">
          <a-radio-button value="left">
            左侧
          </a-radio-button>
          <a-radio-button value="center">
            居中
          </a-radio-button>
          <a-radio-button value="right">
            右侧
          </a-radio-button>
        </a-radio-group>
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
      ifShowButton: state => state.formDesigner.formCommonSetting.ifShowButton,
      gutter: state => state.formDesigner.formCommonSetting.gutter,
      bottomButtonLayout: state => state.formDesigner.formCommonSetting.bottomButtonLayout
    })
  },
  methods: {
    onGutter (val) {
      this.updateGutter(val)
    },
    onShowButton (e) {
      this.updateIfShowButton(e.target.checked)
    },
    onButtonLayout (e) {
      this.updateBottomButtonLayout(e.target.value)
    },
    ...mapMutations({
      updateIfShowButton: 'setIfShowButton',
      updateGutter: 'setGutter',
      updateBottomButtonLayout: 'setBottomButtonLayout'
    })
  }
}
</script>

<style lang="less" scoped>

</style>
