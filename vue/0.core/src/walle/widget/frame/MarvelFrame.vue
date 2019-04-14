<template>
  <div></div>
  <!--<div v-bind:class="{ hasMargin: isMargin }">-->
    <!--<div v-bind:class="[classLarge,classMiddle,classSmall,classMini,classCustom]">-->
      <!--<slot></slot>-->
    <!--</div>-->
  <!--</div>-->
</template>

<script>
//  import StrUtils from "@/walle/component/str";

  export default {
    name: 'MarvelFrame',
//    props: ["media", "hasMargin", "classCustom"],
    data: function() {
        return {
//          isMargin: false,
//          classLarge: "large-24",
//          classMiddle: "middle-12",
//          classSmall: "small-8",
//          classMini: "mini-4"
        }
    },
    mounted: function () {
//      //1.hasMargin
//      this.isMargin = this.hasMargin == "true";
//
//      //2.media
//      var strMedia = this.media;
//      var arrMedia = StrUtils.split(strMedia, ",");
//      if(arrMedia[0] != undefined){
//        this.classLarge = "large-" + arrMedia[0];
//      }
//      if(arrMedia[1] != undefined){
//        this.classMiddle = "middle-" + arrMedia[1];
//      }
//      if(arrMedia[2] != undefined){
//        this.classSmall = "small-" + arrMedia[2];
//      }
//      if(arrMedia[3] != undefined){
//        this.classMini = "mini-" + arrMedia[3];
//      }
    }
  }
</script>

<style>
  .hasMargin>div {
    margin: 0 10px;
    box-sizing: border-box;
  }


  .mini-1,.mini-2,.mini-3,.mini-4,.mini-5,.mini-6,.mini-7,.mini-8,.mini-9,.mini-10,.mini-11,.mini-12,
  .mini-13,.mini-14,.mini-15,.mini-16,.mini-17,.mini-18,.mini-19,.mini-20,.mini-21,.mini-22,.mini-23,.mini-24,
  .small-1,.small-2,.small-3,.small-4,.small-5,.small-6,.small-7,.small-8,.small-9,.small-10,.small-11,.small-12,
  .small-13,.small-14,.small-15,.small-16,.small-17,.small-18,.small-19,.small-20,.small-21,.small-22,.small-23,.small-24,
  .middle-1,.middle-2,.middle-3,.middle-4,.middle-5,.middle-6,.middle-7,.middle-8,.middle-9,.middle-10,.middle-11,.middle-12,
  .middle-13,.middle-14,.middle-15,.middle-16,.middle-17,.middle-18,.middle-19,.middle-20,.middle-21,.middle-22,.middle-23,.middle-24,
  .large-1,.large-2,.large-3,.large-4,.large-5,.large-6,.large-7,.large-8,.large-9,.large-10,.large-11,.large-12,
  .large-13,.large-14,.large-15,.large-16,.large-17,.large-18,.large-19,.large-20,.large-21,.large-22,.large-23,.large-24{
    position: relative;
    min-height: 1px;
  }

  /*设备宽度小于768*/
  .mini-0{display: none; float: left;}
  .mini-1{width: 4.16666666% ;display:inline-block; float: left;}
  .mini-2{width: 8.33333333% ;display:inline-block; float: left;}
  .mini-3{width: 12.5% ;display:inline-block; float: left;}
  .mini-4{width: 16.66666667% ;display:inline-block; float: left;}
  .mini-5{width: 20.83333333% ;display:inline-block; float: left;}
  .mini-6{width: 25% ;display:inline-block; float: left;}
  .mini-7{width: 29.16666666% ;display:inline-block; float: left;}
  .mini-8{width: 33.33333333% ;display:inline-block; float: left;}
  .mini-9{width: 37.49999999% ;display:inline-block; float: left;}
  .mini-10{width: 41.66666667% ;display:inline-block; float: left;}
  .mini-11{width: 45.83333333% ;display:inline-block; float: left;}
  .mini-12{width: 50% ;display:inline-block; float: left;}
  .mini-13{width: 54.16666666% ;display:inline-block; float: left;}
  .mini-14{width: 58.33333333% ;display:inline-block; float: left;}
  .mini-15{width: 62.49999999% ;display:inline-block; float: left;}
  .mini-16{width: 66.66666667% ;display:inline-block; float: left;}
  .mini-17{width: 70.83333333% ;display:inline-block; float: left;}
  .mini-18{width: 75% ;display:inline-block; float: left;}
  .mini-19{width: 79.16666666% ;display:inline-block; float: left;}
  .mini-20{width: 83.33333333% ;display:inline-block; float: left;}
  .mini-21{width: 87.49999999% ;display:inline-block; float: left;}
  .mini-22{width: 91.66666667% ;display:inline-block; float: left;}
  .mini-23{width: 95.8333332% ;display:inline-block; float: left;}
  .mini-24{width: 100% ;display:inline-block; float: left;}

  .hasMargin>.mini-0{display:none; float: left;}
  .hasMargin>.mini-1{width: calc(4.16666666% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-2{width: calc(8.33333333% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-3{width: calc(12.5% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-4{width: calc(16.66666667% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-5{width: calc(20.83333333% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-6{width: calc(25% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-7{width: calc(29.16666666% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-8{width: calc(33.33333333% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-9{width: calc(37.49999999% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-10{width: calc(41.66666667% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-11{width: calc(45.83333333% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-12{width: calc(50% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-13{width: calc(54.16666666% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-14{width: calc(58.33333333% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-15{width: calc(62.49999999% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-16{width: calc(66.66666667% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-17{width: calc(70.83333333% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-18{width: calc(75% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-19{width: calc(79.16666666% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-20{width: calc(83.33333333% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-21{width: calc(87.49999999% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-22{width: calc(91.66666667% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-23{width: calc(95.8333332% - 20px);display:inline-block; float: left;}
  .hasMargin>.mini-24{width: calc(100% - 20px);display:inline-block; float: left;}

  /*设备宽度大于768*/
  @media (min-width: 768px) {
    .small-0{display:none; float: left;}
    .small-1{width: 4.16666666% ;display:inline-block; float: left;}
    .small-2{width: 8.33333333% ;display:inline-block; float: left;}
    .small-3{width: 12.5% ;display:inline-block; float: left;}
    .small-4{width: 16.66666667% ;display:inline-block; float: left;}
    .small-5{width: 20.83333333% ;display:inline-block; float: left;}
    .small-6{width: 25%;display:inline-block; float: left;}
    .small-7{width: 29.16666666%;display:inline-block; float: left;}
    .small-8{width: 33.33333333%;display:inline-block; float: left;}
    .small-9{width: 37.49999999%;display:inline-block; float: left;}
    .small-10{width: 41.66666667%;display:inline-block; float: left;}
    .small-11{width: 45.83333333%;display:inline-block; float: left;}
    .small-12{width: 50%;display:inline-block; float: left;}
    .small-13{width: 54.16666666%;display:inline-block; float: left;}
    .small-14{width: 58.33333333%;display:inline-block; float: left;}
    .small-15{width: 62.49999999%;display:inline-block; float: left;}
    .small-16{width: 66.66666667%;display:inline-block; float: left;}
    .small-17{width: 70.83333333%;display:inline-block; float: left;}
    .small-18{width: 75%;display:inline-block; float: left;}
    .small-19{width: 79.16666666%;display:inline-block; float: left;}
    .small-20{width: 83.33333333%;display:inline-block; float: left;}
    .small-21{width: 87.49999999%;display:inline-block; float: left;}
    .small-22{width: 91.66666667%;display:inline-block; float: left;}
    .small-23{width: 95.8333332%;display:inline-block; float: left;}
    .small-24{width: 100%;display:inline-block; float: left;}

    .hasMargin>.small-0{display:none; float: left;}
    .hasMargin>.small-1{width: calc(4.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-2{width: calc(8.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-3{width: calc(12.5% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-4{width: calc(16.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-5{width: calc(20.83333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-6{width: calc(25% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-7{width: calc(29.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-8{width: calc(33.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-9{width: calc(37.49999999% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-10{width: calc(41.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-11{width: calc(45.83333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-12{width: calc(50% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-13{width: calc(54.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-14{width: calc(58.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-15{width: calc(62.49999999% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-16{width: calc(66.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-17{width: calc(70.83333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-18{width: calc(75% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-19{width: calc(79.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-20{width: calc(83.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-21{width: calc(87.49999999% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-22{width: calc(91.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-23{width: calc(95.8333332% - 20px);display:inline-block; float: left;}
    .hasMargin>.small-24{width: calc(100% - 20px);display:inline-block; float: left;}
  }


  /*设备宽度大于992*/
  @media (min-width: 992px) {
    .middle-0{display:none; float: left;}
    .middle-1{width: 4.16666666%;display:inline-block; float: left;}
    .middle-2{width: 8.33333333%;display:inline-block; float: left;}
    .middle-3{width: 12.5%;display:inline-block; float: left;}
    .middle-4{width: 16.66666667%;display:inline-block; float: left;}
    .middle-5{width: 20.83333333%;display:inline-block; float: left;}
    .middle-6{width: 25%;display:inline-block; float: left;}
    .middle-7{width: 29.16666666%;display:inline-block; float: left;}
    .middle-8{width: 33.33333333%;display:inline-block; float: left;}
    .middle-9{width: 37.49999999%;display:inline-block; float: left;}
    .middle-10{width: 41.66666667%;display:inline-block; float: left;}
    .middle-11{width: 45.83333333%;display:inline-block; float: left;}
    .middle-12{width: 50%;display:inline-block; float: left;}
    .middle-13{width: 54.16666666%;display:inline-block; float: left;}
    .middle-14{width: 58.33333333%;display:inline-block; float: left;}
    .middle-15{width: 62.49999999%;display:inline-block; float: left;}
    .middle-16{width: 66.66666667%;display:inline-block; float: left;}
    .middle-17{width: 70.83333333%;display:inline-block; float: left;}
    .middle-18{width: 75%;display:inline-block; float: left;}
    .middle-19{width: 79.16666666%;display:inline-block; float: left;}
    .middle-20{width: 83.33333333%;display:inline-block; float: left;}
    .middle-21{width: 87.49999999%;display:inline-block; float: left;}
    .middle-22{width: 91.66666667%;display:inline-block; float: left;}
    .middle-23{width: 95.8333332%;display:inline-block; float: left;}
    .middle-24{width: 100%;display:inline-block; float: left;}

    .hasMargin>.middle-0{display:none; float: left;}
    .hasMargin>.middle-1{width: calc(4.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-2{width: calc(8.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-3{width: calc(12.5% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-4{width: calc(16.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-5{width: calc(20.83333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-6{width: calc(25% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-7{width: calc(29.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-8{width: calc(33.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-9{width: calc(37.49999999% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-10{width: calc(41.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-11{width: calc(45.83333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-12{width: calc(50% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-13{width: calc(54.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-14{width: calc(58.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-15{width: calc(62.49999999% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-16{width: calc(66.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-17{width: calc(70.83333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-18{width: calc(75% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-19{width: calc(79.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-20{width: calc(83.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-21{width: calc(87.49999999% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-22{width: calc(91.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-23{width: calc(95.8333332% - 20px);display:inline-block; float: left;}
    .hasMargin>.middle-24{width: calc(100% - 20px);display:inline-block; float: left;}
  }

  /*设备宽度大于1200*/
  @media (min-width: 1200px) {
    .large-0{display:none; float: left;}
    .large-1{width: 4.16666666%;display:inline-block; float: left;}
    .large-2{width: 8.33333333%;display:inline-block; float: left;}
    .large-3{width: 12.5%;display:inline-block; float: left;}
    .large-4{width: 16.66666667%;display:inline-block; float: left;}
    .large-5{width: 20.83333333%;display:inline-block; float: left;}
    .large-6{width: 25%;display:inline-block; float: left;}
    .large-7{width: 29.16666666%;display:inline-block; float: left;}
    .large-8{width: 33.33333333%;display:inline-block; float: left;}
    .large-9{width: 37.49999999%;display:inline-block; float: left;}
    .large-10{width: 41.66666667%;display:inline-block; float: left;}
    .large-11{width: 45.83333333%;display:inline-block; float: left;}
    .large-12{width: 50%;display:inline-block; float: left;}
    .large-13{width: 54.16666666%;display:inline-block; float: left;}
    .large-14{width: 58.33333333%;display:inline-block; float: left;}
    .large-15{width: 62.49999999%;display:inline-block; float: left;}
    .large-16{width: 66.66666667%;display:inline-block; float: left;}
    .large-17{width: 70.83333333%;display:inline-block; float: left;}
    .large-18{width: 75%;display:inline-block; float: left;}
    .large-19{width: 79.16666666%;display:inline-block; float: left;}
    .large-20{width: 83.33333333%;display:inline-block; float: left;}
    .large-21{width: 87.49999999%;display:inline-block; float: left;}
    .large-22{width: 91.66666667%;display:inline-block; float: left;}
    .large-23{width: 95.8333332%;display:inline-block; float: left;}
    .large-24{width: 100%;display:inline-block; float: left;}

    .hasMargin>.large-0{display:none; float: left;}
    .hasMargin>.large-1{width: calc(4.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-2{width: calc(8.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-3{width: calc(12.5% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-4{width: calc(16.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-5{width: calc(20.83333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-6{width: calc(25% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-7{width: calc(29.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-8{width: calc(33.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-9{width: calc(37.49999999% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-10{width: calc(41.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-11{width: calc(45.83333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-12{width: calc(50% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-13{width: calc(54.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-14{width: calc(58.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-15{width: calc(62.49999999% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-16{width: calc(66.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-17{width: calc(70.83333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-18{width: calc(75% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-19{width: calc(79.16666666% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-20{width: calc(83.33333333% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-21{width: calc(87.49999999% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-22{width: calc(91.66666667% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-23{width: calc(95.8333332% - 20px);display:inline-block; float: left;}
    .hasMargin>.large-24{width: calc(100% - 20px);display:inline-block; float: left;}
  }

</style>
