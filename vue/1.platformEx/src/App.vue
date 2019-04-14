<template>
  <div id="app">
    <div class="header">
      <div class="logo">{{ logo }}</div>
      <ul class="menu">
        <li>
          <router-link to="/" exact>首页</router-link>
        </li>
        <li>
          <router-link to="/page1" exact>使用说明</router-link>
        </li>
        <li>
          <a href="https://cn.vuejs.org/" target="_blank">Vue社区</a>
        </li>
        <li>
          <a class="icon-github" style="font-size: 20px;"
             href="https://github.com/JHerculesqz/demo-js-vue" target="_blank"></a>
        </li>
        <li>
          <a class="icon-twitter" style="font-size: 20px;"
             href="https://github.com/JHerculesqz/demo-js-vue" target="_blank"></a>
        </li>
      </ul>
    </div>
    <div class="content">
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
    <div class="footer">
      footer
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data: function() {
      return {
        //#region logo
        logo: "Fuck UI 2.0"
        //#endregion
      }
    },
  }
</script>

<style>
  html,body{
    width:100%;
    height:100%;
    overflow:hidden;
  }

  body{
    position: fixed;
    width:100%;
    height:100%;
    margin:0;
    padding:0;
    font-family:Tahoma,Arial,Roboto,”Droid Sans”,”Helvetica Neue”,”Droid Sans Fallback”,”Heiti SC”,sans-self;
  }

  ol,ul{list-style:none;}

  #app {
    height:100%;
  }
  .header{
    width: 100%;
    height: 50px;
    position: absolute;
    top:0;
    left: 0;
    background-color: #3b2e49;
    z-index: 999;
  }
  .header .logo{
    width: 240px;
    height: 100%;
    float: left;
    /*color: #007df9;*/
    color: #ffaa00;
    font-size: 26px;
    font-weight: bold;
    line-height: 50px;
    text-align: center;
  }
  .header ul{
    margin: 0;
    padding: 0;
    float: right;
    margin-right: 40px;
  }
  .header ul li{
    float: left;
    margin-right: 10px;
    margin-top: 0;
    list-style-type: none
  }
  .header ul li a{
    line-height: 50px;
    /*color: #666;*/
    color: #ffffff;
    font-size: 14px;
    padding: 0 10px;
    text-decoration: none;
  }
  .header ul li .active{
    color:#ffaa00;
  }
  .content{
    height: 100%;
    position: relative;
  }
  .footer{
    height: 0px;
    background-color: #e8e8e8
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(-430px);
    opacity: 0;
  }
</style>
