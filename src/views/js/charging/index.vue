<template>
      <div class="chargerBox">
      <div class="chargerHead"></div>
      <div class="chargerBody">
        <div class="water"><div class="whiteBox"></div></div>
      </div>
      <div class="shade"></div>
      </div>
</template>

<script>
export default {

}
</script>

      <style>
        .chargerBox {
          width: 200px;
          height: 200px;
          background: #eee;
          margin: 30px;
          padding: 50px;
        }
        .chargerHead {
          width: 20px;
          height: 20px;
          background: #e9e9e9;
          border-radius: 4px;
          margin: 0 auto;
          box-shadow: 0px 0px 6px -2px #6d6d6d;
          animation: light 1s forwards linear 25s;
        }
        .chargerBody {
          width: 120px;
          height: 180px;
          margin: 0 auto;
          margin-top: -12px;
          border-radius: 15px 15px 10px 10px;
          z-index: 10;
          background-color: #fff;
          box-shadow: 0px 0px 6px -2px #6d6d6d;
          position: relative;
          overflow: hidden;
        }
        .water {
          width: 120px;
          height: 10px;
          position: absolute;
          bottom: 0;

          background: linear-gradient(0deg, #7f7fd5, #86a8e7, #91eae4);
          filter: hue-rotate(
            0deg
          ); /**关于渐变，普通的颜色更改是无效的，只能通过filter：hue-rotate色相旋转来实现颜色变化，初始不变 */
          animation: riseWater 20s forwards linear;
          left: 50%;
          transform: translateX(-50%);
        }
        @keyframes riseWater {
          from {
            height: 10px;
          }
          to {
            height: 100%;
            /* border-radius: 15px 15px 10px 10px; */
            filter: hue-rotate(60deg); /* 颜色变化 */
          }
        }

        .whiteBox {
          width: 300px;
          height: 300px;
          position: absolute;
          left: 50%;
          bottom: -10px;
          transform: translateX(-50%);
          /* animation: whiteBoxTop 25s forwards linear; */
          
        }
        .whiteBox::before {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            background: #fff;
            border-radius: 45%;
            animation: whiteSpin 5s infinite linear;
          }
          .whiteBox::after {
            content: "";
            width: 101%;
            height: 101%;
            position: absolute;
            border-radius: 45%;
            background: rgba(255, 255, 255, 0.3);
            animation: whiteSpin2 7s infinite linear;
          }
        @keyframes whiteBoxTop {
          from {
            bottom: 0;
          }
          to {
            bottom: 190px;
          }
        }
        @keyframes whiteSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes whiteSpin2 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      </style>
 