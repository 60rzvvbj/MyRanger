<template>
  <div class="header">
    <div class="username"></div>
    <div class="path"></div>
    <div class="now"></div>
  </div>
  <div class="main">
    <FileList class="left" />
    <FileList class="middle" />
    <FileContent v-if="isFile" class="right" />
    <FileList v-else class="right" />
  </div>
  <div class="footer">
    <div class="number"></div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import config from '@/utils/loadConfig.js';
import FileList from './FileList.vue';
import FileContent from './FileList.vue';

export default {
  name: 'Home',
  components: {
    FileList,
    FileContent
  },
  setup() {
    let isFile = ref(false);
    // console.log(config);
    return {
      isFile
    };
  }
}
</script>

<style scoped>
.header {
  width: 100vw;
  height: 4vh;
  overflow: hidden;
}

.header > div {
  float: left;
  font-size: 22px;
  line-height: 4vh;
}

.header .username {
  text-indent: 1em;
  color: #e3b4b8;
}

.header .path {
  min-width: 1em;
  height: 100%;
  text-indent: 1em;
  color: #5096cd;
}

.header .now {
  color: #a87db8;
}

.main {
  width: 100vw;
  height: 92vh;
}

.main .left {
  float: left;
  width: 18vw;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: pink;
}

.main .middle {
  float: left;
  width: 32vw;
  height: 100%;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: yellow;
}

.main .right {
  float: left;
  width: 50vw;
  height: 100%;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: blue;
}

.main .right .content {
  font-size: 20px;
  line-height: 24px;
  white-space: pre-wrap;
  color: #8abcd1;
}

.footer {
  width: 100vw;
  height: 4vh;
}

.footer .number {
  float: right;
  padding-right: 20px;
  font-size: 22px;
  line-height: 4vh;
  color: #8abcd1;
}
</style>