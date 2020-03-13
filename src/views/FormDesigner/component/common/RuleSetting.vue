<template>
  <a-form-item
    label="校验规则"
  >
    <a-checkbox :checked="required" @change="onRequired">
      必填
    </a-checkbox>
    <br />
    校验message：<a-input :value="requiredMsg" @change="onRequiredMsg" :disabled="!required"/>
    <br />
    <a-checkbox :checked="minSign" @change="onMin">
      最小值：{{minSign ? min + '' : '无'}}
      <a-popover title="最小值">
        <template slot="content">
          <a-input-number :min="0" v-model="min"/>
        </template>
        <a href="#">（设置最小值）</a>
      </a-popover>
    </a-checkbox>
    <br />
    <a-checkbox :checked="maxSign" @change="onMax">
      最大值：{{maxSign ? max + '' : '无'}}
      <a-popover title="最大值">
        <template slot="content">
          <a-input-number :min="0" v-model="max" />
        </template>
        <a href="#">（设置最大值）</a>
      </a-popover>
    </a-checkbox>
    <br />
    校验message：<a-input :value="rangeMsg" @change="onRangeMsg" :disabled="!minSign && !maxSign"/>
    <br />
    <a-checkbox :checked="lenSign" @change="onLen">
      长度：{{lenSign ? len + '' : '无'}}
      <a-popover title="长度">
        <template slot="content">
          <a-input-number :min="1"  v-model="len"/>
        </template>
        <a href="#">（设置长度）</a>
      </a-popover>
    </a-checkbox>
    <br />
    校验message：<a-input :value="lenMsg" @change="onLenMsg" :disabled="!lenSign"/>
    <br />
    <a-form-item v-if="patterns.length" label="选择自定义校验">
      <a-checkbox
        v-for="(pattern, index) in cusPatterns"
        :checked="pattern.checked"
        @change="(e) => onChangePattern(e, index)"
        :key="pattern.name"
      >
        <a-tooltip>
          <template slot="title">
            <span>{{pattern.desc}}</span>
          </template>
          {{pattern.name}}
        </a-tooltip>
      </a-checkbox>
    </a-form-item>
    <add-pattern-rule />
  </a-form-item>
</template>

<script>
import AddPatternRule from './AddPatternRule'
import { mapState, mapMutations } from 'vuex'
import { findIndexWithKey } from '../../utils/core'
import { deepClone } from '../../utils'

function getDefaultData () {
  return {
    required: false,
    minSign: false,
    min: 0,
    maxSign: false,
    max: 10,
    lenSign: false,
    len: 10,
    requiredMsg: '',
    rangeMsg: '',
    lenMsg: ''
  }
}
export default {
  name: 'RuleSetting',
  components: {
    AddPatternRule
  },
  data () {
    return {
      ...(getDefaultData()),
      visible: false,
      activeArr: [],
      cusPatterns: []
    }
  },
  computed: {
    ...mapState({
      formData: state => state.formDesigner.formData,
      activeKey: state => state.formDesigner.activeKey,
      patterns: state => state.formDesigner.patterns
    })
  },
  watch: {
    min () {
      this.$nextTick(this.updateRangeMsg)
    },
    max () {
      this.$nextTick(this.updateRangeMsg)
    },
    len () {
      this.$nextTick(this.updateLenMsg)
    },
    activeKey (val) {
      this.changeFormItem(val)
      this.updateRules()
    }
  },
  created () {
    this.changeFormItem(this.activeKey)
    this.updateRules()
  },
  methods: {
    changeFormItem (val) {
      const defaultData = getDefaultData()
      const activeArr = findIndexWithKey(this.formData, val)
      let rules = []
      if (activeArr.length === 1) {
        rules = this.formData[activeArr[0]].attr.rules
      }
      if (activeArr.length === 3) {
        rules = this.formData[activeArr[0]].columns[activeArr[1]].children[activeArr[2]].attr.rules
      }
      for (let i = 0; i < rules.length; i++) {
        const keyArr = Object.keys(rules[i])
        if (keyArr.includes('min') && keyArr.includes('max')) {
          defaultData.maxSign = true
          defaultData.minSign = true
          defaultData.min = rules[i].min
          defaultData.max = rules[i].max
          defaultData.rangeMsg = rules[i].message
        } else if (keyArr.includes('min')) {
          defaultData.minSign = true
          defaultData.min = rules[i].min
          defaultData.rangeMsg = rules[i].message
        } else if (keyArr.includes('max')) {
          defaultData.maxSign = true
          defaultData.max = rules[i].min
          defaultData.rangeMsg = rules[i].message
        } else if (keyArr.includes('required') && rules[i].required) {
          defaultData.required = true
          defaultData.requiredMsg = rules[i].message
        } else if (keyArr.includes('len')) {
          defaultData.lenSign = true
          defaultData.len = rules[i].len
          defaultData.lenMsg = rules[i].message
        }
      }
      const dataArr = Object.keys(defaultData)
      for (let i = 0; i < dataArr.length; i++) {
        this[dataArr[i]] = defaultData[dataArr[i]]
      }
      this.activeArr = activeArr
    },
    onRequired (e) {
      const checked = e.target.checked
      this.required = checked
      if (checked) {
        this.requiredMsg = '此项为必填项'
      } else {
        this.requiredMsg = ''
      }
      this.$nextTick(this.transformRulesData)
    },
    onMin (e) {
      const checked = e.target.checked
      if (checked) {
        this.minSign = true
      } else {
        this.minSign = false
      }
      this.$nextTick(this.updateRangeMsg)
    },
    onMax (e) {
      if (e.target.checked) {
        this.maxSign = true
      } else {
        this.maxSign = false
      }
      this.$nextTick(this.updateRangeMsg)
    },
    updateRangeMsg () {
      if (this.minSign && this.maxSign) {
        this.rangeMsg = `取值范围必须在${this.min}-${this.max}之间`
      } else if (this.minSign) {
        this.rangeMsg = `取值需大于${this.min}`
      } else if (this.maxSign) {
        this.rangeMsg = `取值需小于${this.max}`
      } else {
        this.rangeMsg = ''
      }
      this.$nextTick(this.transformRulesData)
    },
    onLen (e) {
      const checked = e.target.checked
      if (checked) {
        this.lenSign = true
      } else {
        this.lenSign = false
      }
      this.$nextTick(this.updateLenMsg)
    },
    updateLenMsg () {
      if (this.lenSign) {
        this.lenMsg = `长度需等于${this.len}`
      } else {
        this.lenMsg = ''
      }
      this.$nextTick(this.transformRulesData)
    },
    onRequiredMsg (e) {
      this.requiredMsg = e.target.value
      this.$nextTick(this.transformRulesData)
    },
    onRangeMsg (e) {
      this.rangeMsg = e.target.value
      this.$nextTick(this.transformRulesData)
    },
    onLenMsg (e) {
      this.lenMsg = e.target.value
      this.$nextTick(this.transformRulesData)
    },
    transformRulesData () {
      const rules = []
      if (this.required) {
        rules.push({
          required: true,
          message: this.requiredMsg
        })
      }
      if (this.minSign && this.maxSign) {
        rules.push({
          min: this.min, max: this.max, message: this.rangeMsg
        })
      } else if (this.minSign) {
        rules.push({
          min: this.min, message: this.rangeMsg
        })
      } else if (this.maxSign) {
        rules.push({
          max: this.max, message: this.rangeMsg
        })
      }
      if (this.lenSign) {
        rules.push({
          len: this.len, message: this.lenMsg
        })
      }
      const formData = this.setRules(rules)
      this.updateFormData(formData)
    },
    getRules () {
      const formData = deepClone(this.formData)
      const activeArr = this.activeArr
      if (this.activeArr.length === 1) {
        return formData[activeArr[0]].attr.rules
      } else if (this.activeArr.length === 3) {
        return formData[activeArr[0]].columns[activeArr[1]].children[activeArr[2]].attr.rules
      } else {
        return []
      }
    },
    setRules (rules) {
      const formData = deepClone(this.formData)
      const activeArr = this.activeArr
      if (activeArr.length === 1) {
        formData[activeArr[0]].attr.rules = rules
      }
      if (activeArr.length === 3) {
        formData[activeArr[0]].columns[activeArr[1]].children[activeArr[2]].attr.rules = rules
      }
      return formData
    },
    onChangePattern (e, index) {
      const activePattern = this.patterns[index]
      const rules = this.getRules()
      const pIndex = this.patternIndexInRules(rules, activePattern)
      if (e.target.checked) {
        rules.push({ pattern: activePattern.name })
      } else {
        rules.splice(pIndex, 1)
      }
      const formData = this.setRules(rules)
      this.updateFormData(formData)
      this.updateRules()
    },
    patternIndexInRules (rules, pattern) {
      rules.forEach((item, index) => {
        if (item.pattern && item.pattern === pattern.name) {
          return index
        }
      })
      return -1
    },
    updateRules () {
      const rules = this.getRules()
      const cusPatterns = this.patterns.map(item => {
        item.checked = false
        rules.forEach(it => {
          if (it.pattern && item.name === it.pattern) {
            item.checked = true
          }
        })
        return item
      })
      this.cusPatterns = cusPatterns
    },
    ...mapMutations({
      updateFormData: 'setFormData'
    })
  }
}
</script>

<style lang="less" scoped>

</style>
