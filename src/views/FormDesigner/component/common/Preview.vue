<template>
  <span>
      <a href="#" @click="visible = true" style="margin-right: 20px;">预览</a>
      <a-modal
        title="预览"
        :visible="visible"
        @ok="onView"
        @cancel="visible = false"
        :width="750"
        destroyOnClose
      >
          <form-render
            :meta-data="resultData"
            @click-btn="getClick"
            :extend-pattern="myPatterns"
          />
      </a-modal>
  </span>
</template>

<script>
import FormRender from '@/components/FormRender'
import { mapState, mapMutations } from 'vuex'
import { deepClone } from '../../utils'
import { transformRowsData, transFormFooterData, transFormUiData, combineRenderData } from '../../utils/core'

export default {
  name: 'AddPatternRule',
  components: {
    FormRender
  },
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      resultData: null,
      myPatterns: {
        uppercase: {
          regexp: /^[A-Z]+$/,
          message: '填入内容非大写字母！'
        },
        abc: {
          regexp: /abc/,
          message: '填入内容非大写字母！'
        }
      }
    }
  },
  computed: mapState({
    renderData: state => state.formDesigner.renderData,
    formData: state => state.formDesigner.formData,
    patterns: state => state.formDesigner.patterns,
    ifShowButton: state => state.formDesigner.formCommonSetting.ifShowButton,
    formCommonSetting: state => state.formDesigner.formCommonSetting
  }),
  watch: {
    visible (val) {
      if (val) {
        const formData = deepClone(this.formData)
        const rowData = transformRowsData(formData)
        const commonSetting = deepClone(this.formCommonSetting)
        let footerData = []
        if (this.ifShowButton) {
          footerData = transFormFooterData(commonSetting)
        }
        const uiData = transFormUiData(commonSetting)
        this.resultData = combineRenderData(rowData, footerData, uiData)
      }
    }
  },
  methods: {
    onView () {
      console.log('view')
    },
    getClick (val) {
      console.log(val)
    },
    ...mapMutations({
      updateRenderData: 'setRenderData'
    })
  }
}
</script>

<style lang="less" scoped>

</style>
