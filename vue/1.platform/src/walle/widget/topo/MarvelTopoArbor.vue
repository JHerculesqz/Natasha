<template>
  <div v-bind:id="id" class="marvelTopoArbor"></div>
</template>

<script>
  import 'natasha-topoarbor/lib/jquery-3.2.1.min.js';
  import 'natasha-topoarbor/lib/sigma.js';
  // require('natasha-topoarbor/lib/jquery-3.2.1.min.js');
  // require('natasha-topoarbor/lib/sigma.min.js');
  require('natasha-topoarbor/lib/plugins/sigma.layout.forceAtlas2.min.js');
  require('natasha-topoarbor/lib/plugins/sigma.plugins.dragNodes.min.js');
  require('natasha-topoarbor/js/MarvelSigma.js');
  require('natasha-topoarbor/js/MarvelArbor.js');
  require('natasha-topoarbor/js/MarvelCanvas.js');
  require('natasha-topoarbor/js/MarvelArborAPI.js');

  /**
   *  MarvelTopoArbor widget description
   *  @vuedoc
   *  @exports MarvelTopoArbor
   */
  export default {
    name: 'MarvelTopoArbor',
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      },
      theme: {
        type: String,
        default: "",
        required: false,
      },
    },
    data: function () {
      return {
        api: undefined,
      };
    },
    methods: {
      //region inner

      //endregion

      //region callback

      //endregion

      //region 3rd

      init: function (oCallback) {
        this.api = new $.MarvelArborAPI();
        this.api.sigmaEx.init(this.id, function (e) {
          oCallback(e);
        });
      },
      setData: function (arrNodes, arrLinks) {
        this.api.sigmaEx.setData(arrNodes, arrLinks);
      },
      updateData: function (oCallback) {
        this.api.sigmaEx.updateData(function (oNode) {
          oCallback(oNode);
        });
      },
      refresh: function () {
        this.api.sigmaEx.refresh();
      }

      //endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .marvelTopoArbor {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
