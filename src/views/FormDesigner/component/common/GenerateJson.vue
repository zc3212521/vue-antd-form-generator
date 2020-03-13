<template>
  <span>
      <a href="#" style="margin-right: 20px;" @click="visible = true">生成JSOP数据</a>
      <a-modal
        title="预览"
        :visible="visible"
        @ok="visible = false"
        @cancel="visible = false"
      >
          <!-- <form-render /> -->
          code view
      </a-modal>
  </span>
</template>

<script>
export default {
  name: 'GenerateJson',
  data () {
    return {
      visible: false
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
