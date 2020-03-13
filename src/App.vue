<template>
  <div style="padding: 20px; background-color: #fff;">
    <form-designer />
  </div>
</template>

<script>
import FormDesigner from './views/FormDesigner'
export default {
  name: 'form-index',
  components: {
    FormDesigner
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .test {
    width: 40%;
    border: 5px solid #a0d911;
  }
</style>
