<template>
  <a-form :form="form" layout="horizontal" :style="formDesc.ui.style">
    <a-row
      v-for="row in rows"
      :gutter="formDesc.ui.gutter"
      :key="row.key"
    >
      <template v-if="row.type === 'group'">
        <a-col :span="24">
          <divide-com :title="row.content"/>
        </a-col>
      </template>
      <template v-else>
        <a-col
          v-for="item in row.content"
          :key="item.id"
          :span="item.grid.span"
          :offset="item.grid.offset"
        >
          <field-com :field="item" />
        </a-col>
      </template>
    </a-row>
    <footer-com
      :data="formDesc.footer"
      @click-btn="clickBtn"
    />
  </a-form>
</template>

<script>
import FieldCom from '@/components/FormRender/FieldCom'
import DivideCom from '@/components/FormRender/other/DivideCom'
import FooterCom from '@/components/FormRender/other/FooterCom'
import * as core from '@/components/FormRender/core/index'

export default {
  name: 'FormRender',
  components: {
    FieldCom,
    DivideCom,
    FooterCom
  },
  props: {
    metaData: {
      type: Object,
      required: true
    },
    extendPattern: {
      type: Object
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {
      // onFieldsChange: function (props, fields) {
      //   console.log('onFieldsChange', props, fields)
      // },
      onValuesChange: (props, values) => {
        console.log('onValuesChange', props, values)
        const currentViewData = core.updateViewDataByField(values, this.viewData)
        const fieldName = Object.keys(values)[0]
        this.viewData = core.validateForm(currentViewData, fieldName)
        console.log('validate finsh', this.viewData)
      }
    })
  },
  data () {
    return {
      viewData: null
    }
  },
  computed: {
    rows: function () {
      return this.viewData.formDesc.rows
    },
    formDesc: function () {
      return this.viewData.formDesc
    }
  },
  created () {
    this.viewData = core.metaData2ViewData(this.metaData, this.extendPattern)
    console.log(this.formDesc)
  },
  methods: {
    clickBtn (index, ifValidateForm) {
      let error
      if (ifValidateForm) {
        this.viewData = core.validateForm(this.viewData)
        const errors = this.viewData.formDesc.errors
        error = errors.length ? errors : null
      } else {
        error = null
      }
      const values = this.form.getFieldsValue()
      this.$emit('click-btn', error, values, index)
    }
  }
}
</script>

<style scoped>

</style>
