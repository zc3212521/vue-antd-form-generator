<template>
  <a-divider orientation="left">{{title}}</a-divider>
</template>

<script>
export default {
  name: 'divideCom',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
