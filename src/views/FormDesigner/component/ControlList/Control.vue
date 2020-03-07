<template>
  <div class="control-wrap">
    <a-icon :type="data.icon" style="margin-right: 5px;" /> {{ data.name }}
  </div>
</template>

<script>
export default {
  name: 'control',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .control-wrap {
    display: inline-block;
    padding: 5px;
    width: 130px;
    height: 36px;
    border: 1px solid rgba(226,226,226,1);
    border-radius: 2px;
    margin-bottom: 6px;
    margin-right: 6px;
    cursor: move;
  }
</style>
