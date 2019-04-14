<template>
  <div class="pageWrapper">
    <div class="pageHead">
      <slot name="head"></slot>
    </div>
    <div class="pageCont4Single" v-bind:class="{ hasMargin:isMargin }">
      <div class="large-24 middle-24 small-24 mini-24" v-bind:class="[classCustom]">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelLayout1',
    props: ["hasMargin", "classCustom"],
    data: function() {
        return {
          isMargin: false
        }
    },
    mounted: function () {
      //1.hasMargin
      this.isMargin = this.hasMargin == "true";
    }
  }
</script>

<style scoped>
  /*frame style*/
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
    float: left;
  }

  /*设备宽度小于768*/
  .mini-0{display: none;}
  .mini-1{width: 4.16666666% ;display:inline-block;}
  .mini-2{width: 8.33333333% ;display:inline-block;}
  .mini-3{width: 12.5% ;display:inline-block;}
  .mini-4{width: 16.66666667% ;display:inline-block;}
  .mini-5{width: 20.83333333% ;display:inline-block;}
  .mini-6{width: 25% ;display:inline-block;}
  .mini-7{width: 29.16666666% ;display:inline-block;}
  .mini-8{width: 33.33333333% ;display:inline-block;}
  .mini-9{width: 37.49999999% ;display:inline-block;}
  .mini-10{width: 41.66666667% ;display:inline-block;}
  .mini-11{width: 45.83333333% ;display:inline-block;}
  .mini-12{width: 50% ;display:inline-block;}
  .mini-13{width: 54.16666666% ;display:inline-block;}
  .mini-14{width: 58.33333333% ;display:inline-block;}
  .mini-15{width: 62.49999999% ;display:inline-block;}
  .mini-16{width: 66.66666667% ;display:inline-block;}
  .mini-17{width: 70.83333333% ;display:inline-block;}
  .mini-18{width: 75% ;display:inline-block;}
  .mini-19{width: 79.16666666% ;display:inline-block;}
  .mini-20{width: 83.33333333% ;display:inline-block;}
  .mini-21{width: 87.49999999% ;display:inline-block;}
  .mini-22{width: 91.66666667% ;display:inline-block;}
  .mini-23{width: 95.8333332% ;display:inline-block;}
  .mini-24{width: 100% ;display:inline-block;}

  .hasMargin>.mini-0{display:none;}
  .hasMargin>.mini-1{width: calc(4.16666666% - 20px);display:inline-block;}
  .hasMargin>.mini-2{width: calc(8.33333333% - 20px);display:inline-block;}
  .hasMargin>.mini-3{width: calc(12.5% - 20px);display:inline-block;}
  .hasMargin>.mini-4{width: calc(16.66666667% - 20px);display:inline-block;}
  .hasMargin>.mini-5{width: calc(20.83333333% - 20px);display:inline-block;}
  .hasMargin>.mini-6{width: calc(25% - 20px);display:inline-block;}
  .hasMargin>.mini-7{width: calc(29.16666666% - 20px);display:inline-block;}
  .hasMargin>.mini-8{width: calc(33.33333333% - 20px);display:inline-block;}
  .hasMargin>.mini-9{width: calc(37.49999999% - 20px);display:inline-block;}
  .hasMargin>.mini-10{width: calc(41.66666667% - 20px);display:inline-block;}
  .hasMargin>.mini-11{width: calc(45.83333333% - 20px);display:inline-block;}
  .hasMargin>.mini-12{width: calc(50% - 20px);display:inline-block;}
  .hasMargin>.mini-13{width: calc(54.16666666% - 20px);display:inline-block;}
  .hasMargin>.mini-14{width: calc(58.33333333% - 20px);display:inline-block;}
  .hasMargin>.mini-15{width: calc(62.49999999% - 20px);display:inline-block;}
  .hasMargin>.mini-16{width: calc(66.66666667% - 20px);display:inline-block;}
  .hasMargin>.mini-17{width: calc(70.83333333% - 20px);display:inline-block;}
  .hasMargin>.mini-18{width: calc(75% - 20px);display:inline-block;}
  .hasMargin>.mini-19{width: calc(79.16666666% - 20px);display:inline-block;}
  .hasMargin>.mini-20{width: calc(83.33333333% - 20px);display:inline-block;}
  .hasMargin>.mini-21{width: calc(87.49999999% - 20px);display:inline-block;}
  .hasMargin>.mini-22{width: calc(91.66666667% - 20px);display:inline-block;}
  .hasMargin>.mini-23{width: calc(95.8333332% - 20px);display:inline-block;}
  .hasMargin>.mini-24{width: calc(100% - 20px);display:inline-block;}

  /*设备宽度大于768*/
  @media (min-width: 768px) {
    .small-0{display:none;}
    .small-1{width: 4.16666666% ;display:inline-block;}
    .small-2{width: 8.33333333% ;display:inline-block;}
    .small-3{width: 12.5% ;display:inline-block;}
    .small-4{width: 16.66666667% ;display:inline-block;}
    .small-5{width: 20.83333333% ;display:inline-block;}
    .small-6{width: 25%;display:inline-block;}
    .small-7{width: 29.16666666%;display:inline-block;}
    .small-8{width: 33.33333333%;display:inline-block;}
    .small-9{width: 37.49999999%;display:inline-block;}
    .small-10{width: 41.66666667%;display:inline-block;}
    .small-11{width: 45.83333333%;display:inline-block;}
    .small-12{width: 50%;display:inline-block;}
    .small-13{width: 54.16666666%;display:inline-block;}
    .small-14{width: 58.33333333%;display:inline-block;}
    .small-15{width: 62.49999999%;display:inline-block;}
    .small-16{width: 66.66666667%;display:inline-block;}
    .small-17{width: 70.83333333%;display:inline-block;}
    .small-18{width: 75%;display:inline-block;}
    .small-19{width: 79.16666666%;display:inline-block;}
    .small-20{width: 83.33333333%;display:inline-block;}
    .small-21{width: 87.49999999%;display:inline-block;}
    .small-22{width: 91.66666667%;display:inline-block;}
    .small-23{width: 95.8333332%;display:inline-block;}
    .small-24{width: 100%;display:inline-block;}

    .hasMargin>.small-0{display:none;}
    .hasMargin>.small-1{width: calc(4.16666666% - 20px);display:inline-block;}
    .hasMargin>.small-2{width: calc(8.33333333% - 20px);display:inline-block;}
    .hasMargin>.small-3{width: calc(12.5% - 20px);display:inline-block;}
    .hasMargin>.small-4{width: calc(16.66666667% - 20px);display:inline-block;}
    .hasMargin>.small-5{width: calc(20.83333333% - 20px);display:inline-block;}
    .hasMargin>.small-6{width: calc(25% - 20px);display:inline-block;}
    .hasMargin>.small-7{width: calc(29.16666666% - 20px);display:inline-block;}
    .hasMargin>.small-8{width: calc(33.33333333% - 20px);display:inline-block;}
    .hasMargin>.small-9{width: calc(37.49999999% - 20px);display:inline-block;}
    .hasMargin>.small-10{width: calc(41.66666667% - 20px);display:inline-block;}
    .hasMargin>.small-11{width: calc(45.83333333% - 20px);display:inline-block;}
    .hasMargin>.small-12{width: calc(50% - 20px);display:inline-block;}
    .hasMargin>.small-13{width: calc(54.16666666% - 20px);display:inline-block;}
    .hasMargin>.small-14{width: calc(58.33333333% - 20px);display:inline-block;}
    .hasMargin>.small-15{width: calc(62.49999999% - 20px);display:inline-block;}
    .hasMargin>.small-16{width: calc(66.66666667% - 20px);display:inline-block;}
    .hasMargin>.small-17{width: calc(70.83333333% - 20px);display:inline-block;}
    .hasMargin>.small-18{width: calc(75% - 20px);display:inline-block;}
    .hasMargin>.small-19{width: calc(79.16666666% - 20px);display:inline-block;}
    .hasMargin>.small-20{width: calc(83.33333333% - 20px);display:inline-block;}
    .hasMargin>.small-21{width: calc(87.49999999% - 20px);display:inline-block;}
    .hasMargin>.small-22{width: calc(91.66666667% - 20px);display:inline-block;}
    .hasMargin>.small-23{width: calc(95.8333332% - 20px);display:inline-block;}
    .hasMargin>.small-24{width: calc(100% - 20px);display:inline-block;}
  }


  /*设备宽度大于992*/
  @media (min-width: 992px) {
    .middle-0{display:none;}
    .middle-1{width: 4.16666666%;display:inline-block;}
    .middle-2{width: 8.33333333%;display:inline-block;}
    .middle-3{width: 12.5%;display:inline-block;}
    .middle-4{width: 16.66666667%;display:inline-block;}
    .middle-5{width: 20.83333333%;display:inline-block;}
    .middle-6{width: 25%;display:inline-block;}
    .middle-7{width: 29.16666666%;display:inline-block;}
    .middle-8{width: 33.33333333%;display:inline-block;}
    .middle-9{width: 37.49999999%;display:inline-block;}
    .middle-10{width: 41.66666667%;display:inline-block;}
    .middle-11{width: 45.83333333%;display:inline-block;}
    .middle-12{width: 50%;display:inline-block;}
    .middle-13{width: 54.16666666%;display:inline-block;}
    .middle-14{width: 58.33333333%;display:inline-block;}
    .middle-15{width: 62.49999999%;display:inline-block;}
    .middle-16{width: 66.66666667%;display:inline-block;}
    .middle-17{width: 70.83333333%;display:inline-block;}
    .middle-18{width: 75%;display:inline-block;}
    .middle-19{width: 79.16666666%;display:inline-block;}
    .middle-20{width: 83.33333333%;display:inline-block;}
    .middle-21{width: 87.49999999%;display:inline-block;}
    .middle-22{width: 91.66666667%;display:inline-block;}
    .middle-23{width: 95.8333332%;display:inline-block;}
    .middle-24{width: 100%;display:inline-block;}

    .hasMargin>.middle-0{display:none;}
    .hasMargin>.middle-1{width: calc(4.16666666% - 20px);display:inline-block;}
    .hasMargin>.middle-2{width: calc(8.33333333% - 20px);display:inline-block;}
    .hasMargin>.middle-3{width: calc(12.5% - 20px);display:inline-block;}
    .hasMargin>.middle-4{width: calc(16.66666667% - 20px);display:inline-block;}
    .hasMargin>.middle-5{width: calc(20.83333333% - 20px);display:inline-block;}
    .hasMargin>.middle-6{width: calc(25% - 20px);display:inline-block;}
    .hasMargin>.middle-7{width: calc(29.16666666% - 20px);display:inline-block;}
    .hasMargin>.middle-8{width: calc(33.33333333% - 20px);display:inline-block;}
    .hasMargin>.middle-9{width: calc(37.49999999% - 20px);display:inline-block;}
    .hasMargin>.middle-10{width: calc(41.66666667% - 20px);display:inline-block;}
    .hasMargin>.middle-11{width: calc(45.83333333% - 20px);display:inline-block;}
    .hasMargin>.middle-12{width: calc(50% - 20px);display:inline-block;}
    .hasMargin>.middle-13{width: calc(54.16666666% - 20px);display:inline-block;}
    .hasMargin>.middle-14{width: calc(58.33333333% - 20px);display:inline-block;}
    .hasMargin>.middle-15{width: calc(62.49999999% - 20px);display:inline-block;}
    .hasMargin>.middle-16{width: calc(66.66666667% - 20px);display:inline-block;}
    .hasMargin>.middle-17{width: calc(70.83333333% - 20px);display:inline-block;}
    .hasMargin>.middle-18{width: calc(75% - 20px);display:inline-block;}
    .hasMargin>.middle-19{width: calc(79.16666666% - 20px);display:inline-block;}
    .hasMargin>.middle-20{width: calc(83.33333333% - 20px);display:inline-block;}
    .hasMargin>.middle-21{width: calc(87.49999999% - 20px);display:inline-block;}
    .hasMargin>.middle-22{width: calc(91.66666667% - 20px);display:inline-block;}
    .hasMargin>.middle-23{width: calc(95.8333332% - 20px);display:inline-block;}
    .hasMargin>.middle-24{width: calc(100% - 20px);display:inline-block;}
  }

  /*设备宽度大于1200*/
  @media (min-width: 1200px) {
    .large-0{display:none;}
    .large-1{width: 4.16666666%;display:inline-block;}
    .large-2{width: 8.33333333%;display:inline-block;}
    .large-3{width: 12.5%;display:inline-block;}
    .large-4{width: 16.66666667%;display:inline-block;}
    .large-5{width: 20.83333333%;display:inline-block;}
    .large-6{width: 25%;display:inline-block;}
    .large-7{width: 29.16666666%;display:inline-block;}
    .large-8{width: 33.33333333%;display:inline-block;}
    .large-9{width: 37.49999999%;display:inline-block;}
    .large-10{width: 41.66666667%;display:inline-block;}
    .large-11{width: 45.83333333%;display:inline-block;}
    .large-12{width: 50%;display:inline-block;}
    .large-13{width: 54.16666666%;display:inline-block;}
    .large-14{width: 58.33333333%;display:inline-block;}
    .large-15{width: 62.49999999%;display:inline-block;}
    .large-16{width: 66.66666667%;display:inline-block;}
    .large-17{width: 70.83333333%;display:inline-block;}
    .large-18{width: 75%;display:inline-block;}
    .large-19{width: 79.16666666%;display:inline-block;}
    .large-20{width: 83.33333333%;display:inline-block;}
    .large-21{width: 87.49999999%;display:inline-block;}
    .large-22{width: 91.66666667%;display:inline-block;}
    .large-23{width: 95.8333332%;display:inline-block;}
    .large-24{width: 100%;display:inline-block;}

    .hasMargin>.large-0{display:none;}
    .hasMargin>.large-1{width: calc(4.16666666% - 20px);display:inline-block;}
    .hasMargin>.large-2{width: calc(8.33333333% - 20px);display:inline-block;}
    .hasMargin>.large-3{width: calc(12.5% - 20px);display:inline-block;}
    .hasMargin>.large-4{width: calc(16.66666667% - 20px);display:inline-block;}
    .hasMargin>.large-5{width: calc(20.83333333% - 20px);display:inline-block;}
    .hasMargin>.large-6{width: calc(25% - 20px);display:inline-block;}
    .hasMargin>.large-7{width: calc(29.16666666% - 20px);display:inline-block;}
    .hasMargin>.large-8{width: calc(33.33333333% - 20px);display:inline-block;}
    .hasMargin>.large-9{width: calc(37.49999999% - 20px);display:inline-block;}
    .hasMargin>.large-10{width: calc(41.66666667% - 20px);display:inline-block;}
    .hasMargin>.large-11{width: calc(45.83333333% - 20px);display:inline-block;}
    .hasMargin>.large-12{width: calc(50% - 20px);display:inline-block;}
    .hasMargin>.large-13{width: calc(54.16666666% - 20px);display:inline-block;}
    .hasMargin>.large-14{width: calc(58.33333333% - 20px);display:inline-block;}
    .hasMargin>.large-15{width: calc(62.49999999% - 20px);display:inline-block;}
    .hasMargin>.large-16{width: calc(66.66666667% - 20px);display:inline-block;}
    .hasMargin>.large-17{width: calc(70.83333333% - 20px);display:inline-block;}
    .hasMargin>.large-18{width: calc(75% - 20px);display:inline-block;}
    .hasMargin>.large-19{width: calc(79.16666666% - 20px);display:inline-block;}
    .hasMargin>.large-20{width: calc(83.33333333% - 20px);display:inline-block;}
    .hasMargin>.large-21{width: calc(87.49999999% - 20px);display:inline-block;}
    .hasMargin>.large-22{width: calc(91.66666667% - 20px);display:inline-block;}
    .hasMargin>.large-23{width: calc(95.8333332% - 20px);display:inline-block;}
    .hasMargin>.large-24{width: calc(100% - 20px);display:inline-block;}
  }


  /*layout style*/
  .pageWrapper{
    /*position: fixed;*///待确定
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #f6f7f8;
  }
  .pageWrapper .pageHead{
    height: 50px;
    background-color: #17191f;
  }
  .pageWrapper .pageCont4Single{
    height: calc(100% - 50px);
    padding: 30px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .pageWrapper .pageCont4mix{
    height: calc(100% - 50px);
    padding: 30px 20px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
