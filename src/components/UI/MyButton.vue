<template>
  <button><slot></slot></button>
</template>

<script>
export default {
}
</script>

<style scoped>
button {
  width: 100px;
  align-self: flex-end;
  padding: 10px 15px;
  background-color: #366cb4;
  color: white;
  border: 1px solid #366cb4;
  border-radius: 5px;
  cursor: pointer;
  margin: 30px;
}

button:hover {
  background-color: #1c385e;
}
</style>
