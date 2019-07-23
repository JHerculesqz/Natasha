 <template>
  <div class="dashboard2Wrapper animate" v-bind:style="{ 'z-index': zIndex }"
       v-bind:class="{ expand: isExpand }">
    <div class="dashboardExpandFolderIcon animate icon-marvelIcon-26"
         v-on:click="onExpandBtnClick"
         :title="title">
      <div class="tipInfo" v-if="bargeCount>0">{{ bargeCount }}</div>
    </div>
    <div class="dashboardContArea">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelList2',
    props: ["bargeCount", "title"],
    data: function() {
      return {
        isExpand: false,
        zIndex: 2000
      }
    },
    methods: {
      onExpandBtnClick: function(){
        this.isExpand = !this.isExpand;
      },
      setZIndex: function(iNum){
        this.zIndex = iNum;
      }
    }
  }
</script>

<style scoped>

  .animate{
    -webkit-transition: all 1s ease-in-out 0s;
    -moz-transition: all 1s ease-in-out 0s;
    -ms-transition: all 1s ease-in-out 0s;
    -o-transition: all 1s ease-in-out 0s;
    transition: all 1s ease-in-out 0s;
  }
  .dashboard2Wrapper{
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #ffffff;
    box-shadow: 2px 3px 4px rgba(0,0,0,0.25);
    border-radius: 24px;
    width: 46px;
    height: 46px;
  }
  .dashboard2Wrapper .dashboardExpandFolderIcon{
    width: 46px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    font-size: 18px;
    position: absolute;
    color: #3399ff;
  }
  .dashboard2Wrapper .dashboardExpandFolderIcon .tipInfo{
    background-color: #ff4c4c;
    border-radius: 20px;
    position: absolute;
    color: #ffffff;
    font-size: 12px;
    line-height: 20px;
    padding: 0 6px;
    top: -4px;
    right: -4px;
  }
  .dashboard2Wrapper .dashboardContArea{
    display: none;
  }

  .expand{
    height: 460px;
    width: 300px;
    border-radius: 4px;
  }
  .expand .dashboardExpandFolderIcon{
    background-color: #ffffff;
    top: -10px;
    left: -10px;
    border-radius: 100%;
    box-shadow: 2px 3px 4px rgba(0,0,0,0.15);
  }
  .expand .dashboardExpandFolderIcon .tipInfo{
    display: none;
  }
  .expand .dashboardContArea{
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  /*region dark theme*/

  .dark .dashboard2Wrapper{
    background-color: #41475a;
    box-shadow: 2px 3px 4px rgba(0,0,0,0.25);
  }
  .dark .dashboard2Wrapper .dashboardExpandFolderIcon{
    color: #3399ff;
  }
  .dark .dashboard2Wrapper .dashboardExpandFolderIcon .tipInfo{
    background-color: #ff4c4c;
    color: #ffffff;
  }
  .dark .expand .dashboardExpandFolderIcon{
    background-color: #41475a;
    box-shadow: 2px 3px 4px rgba(0,0,0,0.15);
  }

  /*endregion*/
</style>
