<template>
  <div>
    <a-form :form="form" layout="horizontal" v-if="activeKey !== ''">
      <a-form-item
        v-if="checkAttrType('id')"
        label="表单id(提交表单时表单项的key值)"
      >
        <a-input
          v-decorator="['id']"
        />
      </a-form-item>
      <a-form-item
        v-if="checkAttrType('label')"
        label="表单标签名称"
      >
        <a-input
          v-decorator="['label']"
        />
      </a-form-item>
      <a-form-item
        v-if="checkAttrType('placeholder')"
        label="placeholder"
      >
        <a-input
          v-decorator="['placeholder']"
        />
      </a-form-item>
      <template v-if="checkAttrType('initialValue')">
        <a-form-item
          v-if="activeType === 'input' || activeType === 'inputNumber'"
          label="默认值"
        >
          <a-input
            v-decorator="['initialValue']"
          />
        </a-form-item>
        <a-form-item
          v-else-if="activeType === 'checkbox'"
          label="默认值"
        >
          <a-checkbox-group
            :options="attrObj.options"
            v-decorator="['initialValue']"
          />
        </a-form-item>
        <a-form-item v-else label="默认值">
          <a-radio-group
            :options="attrObj.options"
            v-decorator="['initialValue']"
          />
        </a-form-item>
      </template>
      <option-setting
        v-if="activeType === 'radio' || activeType === 'checkbox' || activeType === 'select'"
        :key="activeKey"
        @update = "updateDataByKey"
      />
      <a-form-item
        v-if="checkAttrType('layout')"
        label="label宽度"
      >
        <a-slider
          v-decorator="['layout']"
          :max="12"
          :marks="marks"
          :step="null"
        />
      </a-form-item>
      <a-form-item
        v-if="checkAttrType('count')"
        label="栅格数"
      >
        <a-radio-group
          v-decorator="['count']"
          :options="attrObj.options"
        />
      </a-form-item>
      <rule-setting v-if="checkAttrType('rules')" />
    </a-form>
    <div v-else>
      请选择一个表单项
    </div>
  </div>
</template>

<script>
import RuleSetting from '../common/RuleSetting'
import OptionSetting from '../common/OptionSetting'
import { mapState, mapMutations } from 'vuex'
import { deepClone } from '../../utils'
import { findIndexWithKey } from '../../utils/core'

export default {
  name: 'ControlAttr',
  components: {
    RuleSetting,
    OptionSetting
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {
      onValuesChange: (props, values) => {
        // console.log('values change', props, values)
        this.setAttr(values)
      }
    })
  },
  data () {
    return {
      activeType: '',
      activeArr: [],
      attrObj: {},
      attrArr: [],
      // marks: { 0: '1', 1: '2', 2: '3', 3: '4', 4: '6', 5: '8', 6: '12', 7: '24' }
      marks: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 6: '6', 8: '8', 12: '12' }
    }
  },
  computed: mapState({
    formData: state => state.formDesigner.formData,
    activeKey: state => state.formDesigner.activeKey
  }),
  watch: {
    activeKey: function (val) {
      this.updateDataByKey(val)
    }
  },
  created () {
    this.updateDataByKey(this.activeKey)
  },
  methods: {
    updateDataByKey (val) {
      this.activeType = val.split('-')[0]
      const activeArr = findIndexWithKey(this.formData, val)
      let obj = {}
      if (activeArr.length === 1) {
        obj = this.formData[activeArr[0]].attr
      }
      if (activeArr.length === 3) {
        obj = this.formData[activeArr[0]].columns[activeArr[1]].children[activeArr[2]].attr
      }
      this.activeArr = activeArr
      this.attrObj = obj
      this.attrArr = Object.keys(obj)
      this.form = this.$form.createForm(this, { // 此处因为默认值是后续加载的，此时form需要重新初始化
        onValuesChange: (props, values) => {
          // console.log('values change', props, values)
          this.setAttr(values)
        }
      })
      this.$nextTick(function () {
        const formAttr = deepClone(obj)
        delete formAttr.options // 删除额外属性
        delete formAttr.rules
        this.form.setFieldsValue(formAttr)
      })
    },
    setAttr (values) {
      const formData = deepClone(this.formData)
      const vKey = Object.keys(values)[0]
      if (this.activeArr.length === 1) {
        formData[this.activeArr[0]].attr[vKey] = values[vKey]
        // grid 同步columns熟练
        if (vKey === 'count') {
          const oldCol = formData[this.activeArr[0]].columns
          if (oldCol.length > values[vKey]) {
            const goDelCol = oldCol.slice(values[vKey])
            let confirmDel = true
            for (let i = 0; i < goDelCol.lengh; i++) {
              if (goDelCol[i].children.length) {
                this.$confirm({
                  title: '此操作将会删除已存在的表单项，确定要删除么？',
                  onOk () {
                    confirmDel = true
                  },
                  onCancel () {
                    confirmDel = false
                  }
                })
                break
              }
            }
            if (!confirmDel) {
              return
            } else {
              oldCol.splice(values[vKey], oldCol.length - values[vKey])
              const span = 24 / values[vKey]
              for (let i = 0; i < oldCol.length; i++) {
                oldCol[i].span = span
              }
              formData[this.activeArr[0]].columns = oldCol
            }
          } else {
            const span = 24 / values[vKey]
            for (let i = 0; i < oldCol.length; i++) {
              oldCol[i].span = span
            }
            const n = values[vKey] - oldCol.length
            for (let i = 0; i < n; i++) {
              oldCol.push({
                span,
                children: []
              })
            }
            formData[this.activeArr[0]].columns = oldCol
          }
        }
      }
      if (this.activeArr.length === 3) {
        formData[this.activeArr[0]].columns[this.activeArr[1]].children[this.activeArr[2]].attr[vKey] = values[vKey]
      }
      this.updateFormData(formData)
    },
    checkAttrType (type) {
      if (type === 'id' && this.activeType === 'grid') return false // 栅格不需要设置id
      if (this.attrArr.includes(type)) return true
      return false
    },
    ...mapMutations({
      updateFormData: 'setFormData'
    })
  }
}
</script>

<style lang="less" scoped>

</style>
