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
          <template slot="footer">
            <a-button key="back" @click="visible = false">关闭</a-button>
          </template>
      </a-modal>
  </span>
</template>

<script>
import FormRender from '@/components/FormRender'
import { mapMutations } from 'vuex'
import RenderDataMixin from './renderDataMixin'

export default {
  name: 'AddPatternRule',
  components: {
    FormRender
  },
  mixins: [RenderDataMixin],
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      resultData: null,
      myPatterns: {}
    }
  },
  watch: {
    visible (val) {
      if (val) {
        const resultData = this.getRenderData()
        this.resultData = resultData
        this.myPatterns = this.getRenderPattern()
        this.updateRenderData(resultData)
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
