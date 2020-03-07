<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="组件属性配置" key="1">
        <control-attr />
      </a-tab-pane>
      <a-tab-pane tab="表单配置" key="2" forceRender>
        <form-attr />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import ControlAttr from './ControlAttr'
import FormAttr from './FormAttr'
export default {
  name: 'ControlSetting',
  components: {
    ControlAttr,
    FormAttr
  },
  methods: {
    callback (key) {
      console.log(key)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
