<template>
    <input class="input" v-model="value"/>
</template>
  
<script>
  export default {
    name: 'Input',
    data() {
      return {
        value: 'Менеджер'
      }
    }
  }
</script>
  
<style scoped>
.input {
  width: 296px;
  height: 40px;
  background-color: #CED6DE;
  border: none;
  font-weight: bold;
  padding-left: 10px;
  margin-left: 15px;
}
@media(max-width:800px){
    .input{
      width: 100px;
    }
  }
</style>
