<template>
  <div>
    <a-button @click="visible = true" type="primary">添加其他验证规则</a-button>
    <a-modal
      title="添加验证规则"
      :visible="visible"
      @ok="addRules"
      @cancel="visible = false"
    >
      <a-form :form="form" :labelCol="{span: 6}" :wrapperCol="{span: 14}">
        <a-alert message="为你自定义的校验规则添加一个名字，请尽量使用英文。" style="font-size: 10px;" type="info" showIcon />
        <a-form-item label="名称">
          <a-input v-decorator="['name', { rules: [{ required: true, message: '此项为必填项!' }] }]" />
        </a-form-item>
        <a-alert message="添加此校验规则的表单项将会匹配此正则。" style="font-size: 10px;" type="info" showIcon />
        <a-form-item label="正则">
          <a-input v-decorator="['regexp', { rules: [{ type: 'regexp', required: true, message: '此项为正则!' }] }]" />
        </a-form-item>
        <a-form-item label="是否区分大小写">
          <a-switch v-decorator="['matchCase', { valuePropName: 'checked', initialValue: false }]" />
        </a-form-item>
        <a-alert message="匹配不成功时的提示信息。" style="font-size: 10px;" type="info" showIcon />
        <a-form-item label="校验message">
          <a-input v-decorator="['message', { rules: [{ required: true, message: '此项为必填项!' }] }]" />
        </a-form-item>
        <a-alert message="为你的自定义校验规则添加说明。" style="font-size: 10px;" type="info" showIcon />
        <a-form-item label="描述">
          <a-textarea v-decorator="['desc']"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { deepClone } from '../../utils'
export default {
  name: 'AddPatternRule',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false
    }
  },
  computed: mapState({
    patterns: state => state.formDesigner.patterns
  }),
  methods: {
    addRules () {
      this.form.validateFields((err, val) => {
        if (!err) {
          const pattern = {
            name: val.name,
            regexp: eval(val.regexp), // eslint-disable-line
            message: val.message,
            desc: val.desc || '无描述'
          }
          console.log('ok', pattern)
          const patterns = deepClone(this.patterns)
          patterns.push(pattern)
          this.updatePatterns(patterns)
          this.visible = false
        }
      })
    },
    ...mapMutations({
      updatePatterns: 'setPatterns'
    })
  }
}
</script>

<style lang="less" scoped>

</style>
