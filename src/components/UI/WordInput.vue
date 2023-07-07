<template>
  <input
      type="text"
      placeholder=''
      :value="modelValue"
      @input="updateInput"
  >
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
input {
  outline:none;
  height: 2em;
  padding-left: 5px;
  width: 45%;
}
</style>
