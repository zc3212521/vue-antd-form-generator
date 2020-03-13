<template>
  <div>
    <a-button @click="visible = true" type="primary">设置options</a-button>
    <a-modal
      title="设置options"
      :visible="visible"
      @ok="settingOptions"
      @cancel="visible = false"
    >
      <div>
        <a-form :labelCol="{span: 6}" :wrapperCol="{span: 14}">
          <a-form-item label="value类型" >
            <a-select :value="valueType" @change="onValueType">
              <a-select-option :value="0">Number</a-select-option>
              <a-select-option :value="1">String</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
        <a-table
          :columns="columns"
          :rowKey="record => record.key"
          :dataSource="options"
          :pagination="false"
        >
          <template slot="label" slot-scope="text, record">
            <a-input :value="text" style="width: 120px;" @change="(e) => {changeLabel(e, record)}"/>
          </template>
          <template slot="value" slot-scope="text, record">
            <span>
              <template v-if="valueType === 0">
                <a-input-number :value="text" style="width: 120px;" @change="(e) => {changeValue(e, record)}" />
              </template>
              <template v-else>
                <a-input :value="text" style="width: 120px;" @change="(e) => {changeValue(e.target.value, record)}"/>
              </template>
            </span>
          </template>
          <template slot="action" slot-scope="text, record">
            <a-popconfirm
              title="确定删除吗？"
              okText="确定"
              cancelText="取消"
              @confirm="delOptions(record)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <a-popconfirm
              v-if="record.disabled"
              title="确定启用吗？"
              okText="确定"
              cancelText="取消"
              @confirm="enableOptions(record)">
              <a href="javascript:;">启用</a>
            </a-popconfirm>
            <a-popconfirm
              v-else
              title="确定禁用吗？"
              okText="确定"
              cancelText="取消"
              @confirm="disableOptions(record)">
              <a href="javascript:;">禁用</a>
            </a-popconfirm>
          </template>
        </a-table>
        <div style="text-align: center;margin-top: 10px;">
          <a-button @click="addOptions" icon="plus" type="primary">添加options</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { findIndexWithKey } from '../../utils/core'
import { deepClone, generateUnitId } from '../../utils'
export default {
  name: 'OptionSetting',
  data () {
    return {
      visible: false,
      activeType: '',
      activeArr: [],
      valueType: 0, // value类型 0 数字 1 字符串
      columns: [
        {
          title: 'Label',
          dataIndex: 'label',
          scopedSlots: { customRender: 'label' }
        },
        {
          title: 'Value',
          dataIndex: 'value',
          scopedSlots: { customRender: 'value' }
        },
        {
          title: '删除',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      options: []
    }
  },
  computed: {
    // options () {
    //   const activeArr = findIndexWithKey(this.formData, this.activeKey)
    //   if (activeArr.length === 1) {
    //     return this.formData[activeArr[0]].attr.options
    //   } else if (activeArr.length === 3) {
    //     return this.formData[activeArr[0]].columns[activeArr[1]].children[activeArr[2]].attr.options
    //   } else {
    //     return []
    //   }
    // },
    ...mapState({
      formData: state => state.formDesigner.formData,
      activeKey: state => state.formDesigner.activeKey
    })
  },
  created () {
    const activeArr = findIndexWithKey(this.formData, this.activeKey)
    let options = []
    if (activeArr.length === 1) {
      options = this.formData[activeArr[0]].attr.options
    }
    if (activeArr.length === 3) {
      options = this.formData[activeArr[0]].columns[activeArr[1]].children[activeArr[2]].attr.options
    }
    if (typeof options[0].value === 'number') { // 判断value类型
      this.valueType = 0
    } else {
      this.valueType = 1
    }
    this.options = this.transformOptions(options)
    this.activeArr = activeArr
  },
  methods: {
    onValueType (value) {
      this.valueType = value
    },
    addOptions () {
      const options = deepClone(this.options)
      options.push({
        label: '',
        value: '',
        key: this.options.length + '-' + generateUnitId()
      })
      this.options = options
    },
    delOptions (record) {
      const index = this.findIndexWithKey(record.key)
      const options = deepClone(this.options)
      options.splice(index, 1)
      this.options = options
    },
    disableOptions (record) {
      const index = this.findIndexWithKey(record.key)
      const options = deepClone(this.options)
      options[index].disabled = true
      this.options = options
    },
    enableOptions (record) {
      const index = this.findIndexWithKey(record.key)
      const options = deepClone(this.options)
      delete options[index].disabled
      this.options = options
    },
    changeLabel (e, record) {
      const index = this.findIndexWithKey(record.key)
      this.options = this.updateOptions('label', e.target.value, index)
    },
    changeValue (val, record) {
      const index = this.findIndexWithKey(record.key)
      this.options = this.updateOptions('value', val, index)
    },
    transformOptions (options) {
      const opt = deepClone(options)
      return opt.map((item, index) => {
        if (!item.key) {
          item.key = index + '-' + generateUnitId()
        }
        return item
      })
    },
    findIndexWithKey (key) {
      let index = -1
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].key === key) {
          index = i
          break
        }
      }
      return index
    },
    updateOptions (key, value, index) {
      const options = deepClone(this.options)
      options[index][key] = value
      return options
    },
    settingOptions (e) {
      for (let i = 0; i < this.options.length; i++) {
        const keys = Object.keys(this.options[i])
        for (let n = 0; n < keys.length; n++) {
          if (this.options[i][keys[n]] === null || this.options[i][keys[n]] === '') {
            this.$message.error('不能有值为空的选项！')
            return
          }
        }
      }
      // const options = this.options.map(item => {
      //   if (item.key) delete item.key
      //   return item
      // })
      const options = this.options
      const activeArr = this.activeArr
      const formData = deepClone(this.formData)
      if (activeArr.length === 1) {
        formData[activeArr[0]].attr.options = options
      }
      if (activeArr.length === 3) {
        formData[activeArr[0]].columns[activeArr[1]].children[activeArr[2]].attr.options = options
      }
      this.updateFormData(formData)
      this.visible = false
      this.$emit('update', this.activeKey)
    },
    ...mapMutations({
      updateFormData: 'setFormData'
    })
  }
}
</script>

<style lang="less" scoped>

</style>
