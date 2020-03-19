import { mapState } from 'vuex'
import { deepClone } from '../../utils'
import { transformRowsData, transFormFooterData, transFormUiData, combineRenderData, transformPattern } from '../../utils/core'
const RenderDataMixin = {
  computed: mapState({
    formData: state => state.formDesigner.formData,
    ifShowButton: state => state.formDesigner.formCommonSetting.ifShowButton,
    formCommonSetting: state => state.formDesigner.formCommonSetting,
    patterns: state => state.formDesigner.patterns
  }),
  methods: {
    getRenderData () {
      const formData = deepClone(this.formData)
      const rowData = transformRowsData(formData)
      const commonSetting = deepClone(this.formCommonSetting)
      const footerData = transFormFooterData(commonSetting, this.ifShowButton)
      const uiData = transFormUiData(commonSetting)
      return combineRenderData(rowData, footerData, uiData)
    },
    getRenderPattern (showString) {
      return transformPattern(this.patterns, showString)
    }
  }
}
export default RenderDataMixin
