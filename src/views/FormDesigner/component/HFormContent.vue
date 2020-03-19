<template>
  <multipane class="custom-resizer" :style="{height: contentHeight + 'px'}" layout="vertical">
    <div class="pane controls-list">
      <control-list />
    </div>
    <multipane-resizer></multipane-resizer>
    <div class="pane form-view">
      <control-view />
    </div>
    <multipane-resizer></multipane-resizer>
    <div class="pane" :style="{ flexGrow: 1 }">
      <control-setting />
    </div>
  </multipane>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane'
import ControlList from './ControlList'
import ControlView from './ControlView'
import ControlSetting from './ControlSetting'
import { getClientHeight } from '../utils/index'
export default {
  name: 'HFormContent',
  components: {
    Multipane,
    MultipaneResizer,
    ControlList,
    ControlView,
    ControlSetting
  },
  data () {
    return {
      contentHeight: 0
    }
  },
  mounted () {
    const headerHeight = document.getElementById('hform-header').offsetHeight
    console.log(11122222, headerHeight)
    this.contentHeight = getClientHeight() - headerHeight - 40
  }
}
</script>

<style lang="less" scoped>
  .custom-resizer {
    width: 100%;
    min-height: 500px;
    height: calc(100% - 20px);
  }
  .custom-resizer > .pane {
    text-align: left;
    padding: 15px;
    height: 100%;
    border: 1px solid #ccc;
    overflow-y: scroll;
  }
  .custom-resizer > .multipane-resizer {
    margin: 0;
    left: 0;
    &:before {
      display: block;
      content: "";
      width: 3px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -20px;
      margin-left: -1.5px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    &:hover {
      &:before {
        border-color: #999;
      }
    }
  }
  .controls-list {
    width: 25%;
  }
  .form-view {
    width: 50%;
  }
</style>
