<template>
  <div v-bind:id="id" class="marvelTopoArbor"></div>
</template>

<script>
  export default {
    name: 'MarvelTopoArbor',
    props: ["theme", "id"],
    data: function () {
      return {
        api:undefined,
      };
    },
    methods: {
      //region inner

      //endregion

      //region callback

      //endregion

      //region 3rd

      init: function (oCallback) {
        this.api = new window.$.MarvelArborAPI();
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
  .marvelTopoArbor {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
