<template>
  <div style="height: 100%;">
    <h-form-header />
    <h-form-content />
  </div>
</template>

<script>
import HFormHeader from './component/HFormHeader'
import HFormContent from './component/HFormContent'
export default {
  name: 'FormDesigner',
  components: {
    HFormHeader,
    HFormContent
  }
}
</script>

<style lang="less" scoped>

</style>
