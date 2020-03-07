<template>
  <div>
    <div v-for="(group, index) in controlList" :key="index.toString()">
      <h3>{{group.title}}</h3>
      <draggable
        :list="group.list"
        class="controls-list"
        :group="{ name: 'form', pull: 'clone', put: false }"
        :animation="0"
        :clone="cloneCB"
        :move="moveCB"
        :sort="false"
      >
        <control
          v-for="(element, ind) in group.list"
          :key="ind.toString()"
          :data="element"
        />
      </draggable>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import control from './Control'
import { getControlList } from '../../utils/config'
import { formatViewData } from '../../utils/core'

export default {
  name: 'ControlList',
  components: {
    draggable,
    control
  },
  data () {
    return {
      controlList: getControlList()
    }
  },
  methods: {
    cloneCB (e) {
      return formatViewData(e)
    },
    moveCB (e, o) {
      console.log('moveCb', e, o)
      if (e.draggedContext.element.type === 'grid' && e.to.className.indexOf('grid-control-wrap') >= 0) {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .ghost {
    background: red;
    padding: 0;
    height: 3px;
    width: 100%;
    border: 0;
    overflow: hidden;
  }
</style>
