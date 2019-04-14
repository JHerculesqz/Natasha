<template>
  <div id="backToTop" class="backToTop" v-on:click="backTop"></div>
</template>

<script>
  export default {
    name: 'MarvelScroll',
    props: ["parentDivId"],
    data: function () {
      return {}
    },
    mounted: function () {

    },
    methods: {
      backTop() {
        if (undefined == this.parentDivId) {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
        else {
          document.getElementById(this.parentDivId).scrollTop = 0;
        }
      }
    }
  }
</script>

<style scoped>
  .backToTop {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 30px;
    right: 30px;
    background-color: #ffffff;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
    border-radius: 100%;
    background-image: url("/static/walle/backToTop.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 90%;
    cursor: pointer;
  }
</style>
