<template>
  <div class="loader"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loader {
  width: 160px;
  height: 80px;
  border: 4px solid #00f45b;
  border-right-color: transparent;
  padding: 6px;
  background: repeating-linear-gradient(90deg, #00f45b 0 20px, #0000 0 30px)
    left/0% 100% no-repeat content-box content-box;
  position: relative;
  animation: p5 2s infinite steps(6);
}
.loader::before {
  content: "";
  position: absolute;
  top: -4px;
  bottom: -4px;
  left: 100%;
  width: 20px;
  background: linear-gradient(
        #0000 calc(50% - 14px),
        #00f45b 0 calc(50% - 10px),
        #0000 0 calc(50% + 10px),
        #00f45b 0 calc(50% + 14px),
        #0000 0
      )
      left / 100% 100%,
    linear-gradient(
        #00f45b calc(50% - 10px),
        #0000 0 calc(50% + 10px),
        #00f45b 0
      )
      left / 4px 100%,
    linear-gradient(#0000 calc(50% - 10px), #00f45b 0 calc(50% + 10px), #0000 0)
      right/4px 100%;
  background-repeat: no-repeat;
}
@keyframes p5 {
  100% {
    background-size: 120% 100%
  }
}
</style>

