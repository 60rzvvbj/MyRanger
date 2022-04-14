<template>
  <div class="home">{{ msg }}</div>
</template>

<script>

export default {
  name: 'Home',
  setup() {
    let msg = 'hello world';
    return {
      msg
    };
  }
}
</script>
