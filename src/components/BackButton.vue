<template>
    <button class="button back-button">

        <img class="arrow" src="../assets/images/icons/left.svg" alt="Arrow left">
        <p>Назад</p>
    </button>
</template>
  
<script>
  export default {
    name: 'BackButton',
  }
</script>
  
<style scoped>
.back-button {
    display: flex;
    align-items: center;
    margin-left: unset !important;
}
.back-button p{
    color: #3391F5;
    margin-left: 1px;
}
</style>
  