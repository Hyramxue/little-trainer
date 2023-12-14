<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="el-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]"
    >
      <div class="el-loading-spinner">
        <div id="Loaders" v-if="!spinner">
          <div class="typewriter">
            <div class="slide">
              <i></i>
            </div>
            <div class="paper"></div>
            <div class="keyboard"></div>
          </div>
        </div>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: "",
    };
  },

  methods: {
    handleAfterLeave() {
      this.$emit("after-leave");
    },
    setText(text) {
      this.text = text;
    },
  },
};
</script><style lang="scss" scoped>
#Loaders {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .loading-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    // display: inline-block;
  }
  .typewriter {
    --blue: #5c86ff;
    --blue-dark: #275efe;
    --key: #fff;
    --paper: #eef0fd;
    --text: #d3d4ec;
    --tool: #fbc56c;
    --duration: 3s;
    position: relative;
    -webkit-animation: bounce05 var(--duration) linear infinite;
    animation: bounce05 var(--duration) linear infinite;
    .slide {
      width: 92px;
      height: 20px;
      border-radius: 3px;
      margin-left: 14px;
      transform: translateX(14px);
      background: linear-gradient(var(--blue), var(--blue-dark));
      -webkit-animation: slide05 var(--duration) ease infinite;
      animation: slide05 var(--duration) ease infinite;
      &:before,
      &:after,
      i:before {
        content: "";
        position: absolute;
        background: var(--tool);
      }
      &:before {
        width: 2px;
        height: 8px;
        top: 6px;
        left: 100%;
      }
      &:after {
        left: 94px;
        top: 3px;
        height: 14px;
        width: 6px;
        border-radius: 3px;
      }
      i {
        display: block;
        position: absolute;
        right: 100%;
        width: 6px;
        height: 4px;
        top: 4px;
        background: var(--tool);
        &:before {
          right: 100%;
          top: -2px;
          width: 4px;
          border-radius: 2px;
          height: 14px;
        }
      }
    }

    .paper {
      position: absolute;
      left: 24px;
      top: -26px;
      width: 40px;
      height: 46px;
      border-radius: 5px;
      background: var(--paper);
      transform: translateY(46px);
      -webkit-animation: paper05 var(--duration) linear infinite;
      animation: paper05 var(--duration) linear infinite;

      &:before {
        content: "";
        position: absolute;
        left: 6px;
        right: 6px;
        top: 7px;
        border-radius: 2px;
        height: 4px;
        transform: scaleY(0.8);
        background: var(--text);
        box-shadow: 0 12px 0 var(--text), 0 24px 0 var(--text),
          0 36px 0 var(--text);
      }
    }
    .keyboard {
      width: 120px;
      height: 56px;
      margin-top: -10px;
      z-index: 1;
      position: relative;
      &:before,
      &:after {
        content: "";
        position: absolute;
      }
      &:before {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 7px;
        background: linear-gradient(135deg, var(--blue), var(--blue-dark));
        transform: perspective(10px) rotateX(2deg);
        transform-origin: 50% 100%;
      }
      &:after {
        left: 2px;
        top: 25px;
        width: 11px;
        height: 4px;
        border-radius: 2px;
        box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key),
          45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key),
          90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key),
          52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key),
          83px 10px 0 var(--key);
        -webkit-animation: keyboard05 var(--duration) linear infinite;
        animation: keyboard05 var(--duration) linear infinite;
      }
    }
  }

  @keyframes bounce05 {
    85%,
    92%,
    100% {
      transform: translateY(0);
    }

    89% {
      transform: translateY(-4px);
    }

    95% {
      transform: translateY(2px);
    }
  }

  @keyframes slide05 {
    5% {
      transform: translateX(14px);
    }

    15%,
    30% {
      transform: translateX(6px);
    }

    40%,
    55% {
      transform: translateX(0);
    }

    65%,
    70% {
      transform: translateX(-4px);
    }

    80%,
    89% {
      transform: translateX(-12px);
    }

    100% {
      transform: translateX(14px);
    }
  }

  @keyframes paper05 {
    5% {
      transform: translateY(46px);
    }

    20%,
    30% {
      transform: translateY(34px);
    }

    40%,
    55% {
      transform: translateY(22px);
    }

    65%,
    70% {
      transform: translateY(10px);
    }

    80%,
    85% {
      transform: translateY(0);
    }

    92%,
    100% {
      transform: translateY(46px);
    }
  }

  @keyframes keyboard05 {
    5%,
    12%,
    21%,
    30%,
    39%,
    48%,
    57%,
    66%,
    75%,
    84% {
      box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
        60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
        22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
        60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
    }

    9% {
      box-shadow: 15px 2px 0 var(--key), 30px 0 0 var(--key),
        45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key),
        90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key),
        52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key),
        83px 10px 0 var(--key);
    }

    18% {
      box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
        60px 2px 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
        22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
        60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
    }

    27% {
      box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
        60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
        22px 12px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
        60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
    }

    36% {
      box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
        60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
        22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 12px 0 var(--key),
        60px 12px 0 var(--key), 68px 12px 0 var(--key), 83px 10px 0 var(--key);
    }

    45% {
      box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
        60px 0 0 var(--key), 75px 0 0 var(--key), 90px 2px 0 var(--key),
        22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
        60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
    }

    54% {
      box-shadow: 15px 0 0 var(--key), 30px 2px 0 var(--key),
        45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key),
        90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key),
        52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key),
        83px 10px 0 var(--key);
    }

    63% {
      box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
        60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
        22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
        60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 12px 0 var(--key);
    }

    72% {
      box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key),
        45px 2px 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key),
        90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key),
        52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key),
        83px 10px 0 var(--key);
    }

    81% {
      box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
        60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
        22px 10px 0 var(--key), 37px 12px 0 var(--key), 52px 10px 0 var(--key),
        60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
    }
  }
}
</style>
