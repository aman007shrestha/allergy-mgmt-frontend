<template>
  <div class="spinner-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
}
</script>

<style scoped>
.spinner-wrapper {
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  height: 100vh;
  background-color: rgba(185, 210, 226, 0.432);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  width: 64px;
  height: 64px;
  border: 8px solid;
  border-color: #42b983 transparent #2c3e50 transparent;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
