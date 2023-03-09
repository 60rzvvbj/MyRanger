<template>
  <ul>
    <li v-for="item in data" :key="item">{{}}</li>
  </ul>
</template>

<script>
import { reactive } from 'vue';
export default {
  name: 'FileList',
  props: {
    folderPath: String
  },
  setup(props) {
    let data = reactive([]);
    return {
      data
    };
  }
}
</script>

<style scoped>
ul {
  overflow: hidden;
  overflow-y: scroll;
}

ul::-webkit-scrollbar {
  display: none;
}

ul li {
  width: 100%;
  height: 24px;
  font-size: 20px;
  line-height: 24px;
  text-indent: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

ul .folder {
  color: #5096cd;
}

ul .exe {
  color: #e3b4b8;
}

ul .file {
  color: #8abcd1;
}

ul .light {
  color: #eee;
  background-color: #095aa1;
}
</style>