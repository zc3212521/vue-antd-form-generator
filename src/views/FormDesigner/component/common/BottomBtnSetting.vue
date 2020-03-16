<template>
  <div>
    <a-button type="primary" :disabled="ifDisabled" @click="showSetting">配置按钮</a-button>
    <a-modal
      title="设置底部按钮"
      :visible="visible"
      @ok="confirmSetting"
      @cancel="visible = false"
      :width="720"
      destroyOnClose
    >
      <a-table
        :columns="columns"
        :rowKey="record => record.key"
        :dataSource="btns"
        :pagination="false"
      >
        <template slot="text" slot-scope="text, record">
          <a-input :value="text" style="width: 120px;" @change="(e) => {changeText(e.target.value, record)}"/>
        </template>
        <template slot="type" slot-scope="text, record">
          <a-radio-group @change="(e) => {changeType(e.target.value, record)}" :value="text">
            <a-radio value="primary"><a-button type="primary">primary</a-button></a-radio>
            <br />
            <a-radio value="default"><a-button type="default">default</a-button></a-radio>
            <br />
            <a-radio value="dashed"><a-button type="dashed">dashed</a-button></a-radio>
            <br />
            <a-radio value="danger"><a-button type="danger">danger</a-button></a-radio>
          </a-radio-group>
        </template>
        <template slot="validate" slot-scope="text, record">
          <a-switch :checked="text" @change="(checked) => {changeValidateStatus(checked, record)}" />
        </template>
        <template slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确定删除吗？"
            okText="确定"
            cancelText="取消"
            @confirm="delOptions(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
      <div style="text-align: center;margin-top: 10px;">
        <a-button @click="addBtns" icon="plus" type="primary">添加按钮</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { deepClone, generateUnitId } from '../../utils'
export default {
  name: 'BottomBtnSetting',
  props: {
    ifDisabled: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      columns: [
        {
          title: '按钮文字',
          dataIndex: 'text',
          scopedSlots: { customRender: 'text' }
        },
        {
          title: '按钮类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '点击时是否校验表单',
          dataIndex: 'validate',
          scopedSlots: { customRender: 'validate' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      btns: []
    }
  },
  computed: {
    ...mapState({
      bottomButton: state => state.formDesigner.bottomButton
    })
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const currentBtn = deepClone(this.bottomButton)
      this.btns = currentBtn.map((item, index) => {
        if (!item.key) item.key = generateUnitId()
        return item
      })
    },
    showSetting () {
      this.init()
      this.$nextTick(() => {
        this.visible = true
      })
    },
    confirmSetting () {
      console.log('ok')
      this.updateBottomButton(this.btns)
      this.visible = false
    },
    addBtns () {
      const btns = deepClone(this.btns)
      btns.push({
        text: '',
        type: 'primary',
        validate: false,
        key: generateUnitId()
      })
      this.btns = btns
    },
    changeText (text, record) {
      this.updateBtn(record.key, 'text', text)
    },
    changeValidateStatus (ifValidate, record) {
      this.updateBtn(record.key, 'validate', ifValidate)
    },
    changeType (type, record) {
      this.updateBtn(record.key, 'type', type)
    },
    updateBtn (key, type, value) {
      const btns = deepClone(this.btns)
      const index = this.findIndexByKey(key)
      if (index >= 0) {
        btns[index][type] = value
      }
      this.btns = btns
    },
    findIndexByKey (key) {
      let myIndex = -1
      this.btns.forEach((item, index) => {
        if (item.key === key) {
          myIndex = index
        }
      })
      return myIndex
    },
    delOptions (record) {
      const btns = deepClone(this.btns)
      const index = Number(record.key)
      btns.splice(index, 1)
      this.btns = btns
    },
    ...mapMutations({
      updateBottomButton: 'setBottomButton'
    })
  }
}
</script>

<style lang="less" scoped>

</style>
