<template>
  <div class="row-wrap">
    <div
      v-if="data.type === 'grid'"
      @click="updateActiveKey(data.key)"
      :class="{'grid-wrap': true,'active':  activeKey === data.key}"
    >
      <a-row :gutter="24">
        <a-col
          v-for="(col, cIndex) in list"
          :key="cIndex.toString()"
          class="grid-col"
          style="border-right:0;"
          :span="col.span"
        >
          <draggable
            :list="col.children"
            :class="{'grid-control-wrap': true, ['col-index-' + cIndex]: true}"
            :group="{ name: 'form', pull: true, put: true }"
            :animation="200"
            ghostClass="ghost"
            :move="moveCB"
          >
            <control-item-view
              v-for="(item, iIndex) in col.children"
              :key="iIndex.toString()"
              :class="{'control-item': true, 'active': activeKey === item.key}"
              :data="item"
              @click.native.stop="updateActiveKey(item.key)"
            />
          </draggable>
        </a-col>
      </a-row>
      <delete-button :itemKey="data.key" v-if="activeKey === data.key"/>
    </div>
    <div v-else>
      <control-item-view
        :class="{'control-item': true, active: activeKey === data.key}"
        :data="data"
        @click.native="goUpdateKey(data.key)"
      />
    </div>
  </div>
</template>

<script>
import ControlItemView from './ControlItemView'
import DeleteButton from '../common/DeleteButton'
import draggable from 'vuedraggable'
import { mapState, mapMutations } from 'vuex'
// import { deepClone } from '../../utils'
import '../../index.css'

export default {
  name: 'RowView',
  props: {
    index: {
      type: Number,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    draggable,
    ControlItemView,
    DeleteButton
  },
  data () {
    return {
      ifPut: true
    }
  },
  computed: {
    list: {
      get () {
        // console.log('subGet', this.formData[this.index].columns)
        return this.formData[this.index].columns
      },
      set (val) {
        const formData = this.formData
        // console.log('subSet', formData[this.index].columns, val)
        formData[this.index].columns = val
        this.updateFormData(formData)
      }
    },
    ...mapState({
      formData: state => state.formDesigner.formData,
      activeKey: state => state.formDesigner.activeKey
    })
  },
  methods: {
    moveCB () {
      return true
    },
    goUpdateKey (key) {
      if (this.activeKey !== key) {
        this.updateActiveKey(key)
      }
    },
    ...mapMutations({
      updateFormData: 'setFormData',
      updateActiveKey: 'setActiveKey'
    })
  }
}
</script>

<style lang="less" scoped>
  .row-wrap {
    position: relative;
    border: 1px dotted transparent;
    .grid-wrap {
      border: 1px dotted #409eff;
      position: relative;
      padding: 0 12px;
      &:hover {
        border: 1px solid #409eff;
        .grid-col {
          border-style: solid;
        }
      }
      &.active {
        border: 3px solid #409eff;
        /*.grid-col {*/
        /*  &:not(:last-child) {*/
        /*    border-right: 3px solid #409eff;*/
        /*    &:hover {*/
        /*      border-right: 3px solid #409eff;*/
        /*    }*/
        /*  }*/
        /*}*/
      }
      .grid-col {
        border: 1px dotted #409eff;
        .grid-control-wrap {
          height: 100%;
          min-height: 80px;
          padding: 5px;
        }
      }
    }

    .control-item {
      position: relative;
      border: 1px solid transparent;
      &:hover {
        border: 1px dotted rgba(53,201,160,1);
      }
      &.active {
        border: 3px solid rgba(53,201,160,1);
      }
    }
  }
  .active {
    border-style: solid;
  }
  .ghost {
    border: 2px solid red;
  }
</style>
