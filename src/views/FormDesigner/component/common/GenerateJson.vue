<template>
  <span>
      <a href="#" style="margin-right: 20px;" @click="visible = true">生成JSOP数据</a>
      <a-modal
        title="预览JSON"
        :visible="visible"
        @ok="visible = false"
        @cancel="visible = false"
      >
          <div id="show-json">
          </div>
          <template slot="footer">
            <a-button key="back" @click="visible = false">关闭</a-button>
          </template>
      </a-modal>
  </span>
</template>

<script>
import CodeFlask from 'codeflask'
import { getCode } from '../../utils/core'
import RenderDataMixin from './renderDataMixin'
export default {
  name: 'GenerateJson',
  mixins: [RenderDataMixin],
  data () {
    return {
      visible: false
    }
  },
  watch: {
    visible (val) {
      if (val) {
        console.log(123)
        setTimeout(() => {
          const flask = new CodeFlask('#show-json', {
            language: 'js',
            readonly: true
          })
          const renderData = this.getRenderData()
          const renderPattern = this.getRenderPattern(true)
          const pattern = JSON.stringify(renderPattern)
          const renderDataStr = JSON.stringify(renderData).replace(/"/g, "'")
          const patternStr = pattern.replace(/"\//g, '/').replace(/\/"/g, '/').replace(/"/g, "'")
          console.log(123456, patternStr)
          flask.updateCode(getCode(renderDataStr, patternStr))
        }, 300)
      }
    }
  },
  mounted () {
    // const flask = new CodeFlask('#show-json', {
    //   language: 'js',
    //   readonly: true
    // })
    // flask.updateCode('<div id="show-json">456</div>')
  },
  methods: {}
}
</script>

<style lang="less">
#show-json {
  .codeflask {
    position: static;

    .codeflask__textarea {
      display: none;
    }
    .codeflask__pre {
      position: static;
    }
  }
}
</style>
