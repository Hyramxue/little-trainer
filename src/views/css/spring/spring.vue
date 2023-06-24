<template>
  <div class="content">
    <div class="item" v-for="(num , index ) in 10" :key='num' :style="'--i:'+index"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.content{
    width: 100%;
    height: 100%;;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    .item{
        position: absolute;
        background-color: transparent;
        width:calc(var(--i) * 25px) ;
        aspect-ratio: 1;
        border: 10px solid rgb( 0,200,255 );
        border-radius: 50%;
        transform: rotateX(70deg);
        animation: spring 3s calc(var(--i) *0.08s) ease-in-out   infinite;
    }
}
 @keyframes spring {
    0%,100%{
        transform:rotateX(70deg) translateY(0);
        filter: hue-rotate(0);
    }
    50%{
         transform: rotateX(70deg) translateY( 35vh); 
               filter: hue-rotate(180deg);
    }
 }
</style>