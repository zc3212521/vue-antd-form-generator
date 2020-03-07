<template>
  <a-form>
    <a-button @click="reset">reset</a-button>
    <draggable
      v-model="list"
      class="view-wrap"
      :group="{ name: 'form', pull: true, put: true }"
      ghostClass="ghost"
      :animation="300"
      :move="move"
      @change="onChange"
    >
        <row-view
          v-for="(item, index) in list"
          :key="item.key"
          :index="index"
          :data="item"
          class="row-view"
        />
    </draggable>
  </a-form>
</template>

<script>
import draggable from 'vuedraggable'
import RowView from './RowView'
import { mapState, mapMutations } from 'vuex'
import '../../index.css'

export default {
  name: 'FormView',
  components: {
    draggable,
    RowView
  },
  data () {
    return {
      group: {
        name: 'form',
        pull: true,
        put: true
      }
    }
  },
  computed: {
    list: {
      get () {
        // console.log('get')
        return this.formData
      },
      set (value) {
        // console.log('set', value)
        this.updateFormData(value)
      }
    },
    ...mapState({
      formData: state => state.formDesigner.formData
    })
  },
  methods: {
    move (e, o) {
      // console.log('topMoveCB', e, o)
      if (e.draggedContext.element.type === 'grid' && e.to.className.indexOf('grid-control-wrap') >= 0) return false // 不允许grid嵌套grid
      return true
    },
    onChange (e) {
      // console.log('change', e, this.formData[0].attr.id)
      const eKey = Object.keys(e)[0]
      if (eKey === 'added') {
        // console.log('added', e)
        this.updateActiveKey(e[eKey].element.key)
      }
    },
    reset () {
      this.updateFormData([])
    },
    ...mapMutations({
      updateFormData: 'setFormData',
      updateActiveKey: 'setActiveKey'
    })
  }
}
</script>

<style lang="less" scoped>
  .view-wrap {
    min-height: 300px;
  }
  .row-view {
    cursor: move;
    margin-bottom: 10px;
    /*&:hover {*/
    /*  background-color: rgba(0,0,0,0.1);*/
    /*}*/
  }
  .ghost {
    background: #cf1322;
    height: 3px;
    overflow: hidden;
  }
</style>
