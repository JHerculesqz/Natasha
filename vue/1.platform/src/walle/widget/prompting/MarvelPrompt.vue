<template>
  <div class="promptGlobalContainer" :class="[{ promptWrapper: !isGlobal }, promptPos]" v-dom-portal="isGlobal" :style="promptPosCalc">
    <!--<div class="promptBoxes" >-->
    <marvel-prompt-item class="customStyle" v-for="(prompt, index) in oPrompts"
                        :key="prompt.id ? prompt.id : index"
                        :status="prompt.status"
                        :content="prompt.content"
                        :prompt="prompt"
                        @destroy="promptDestroy"
                        :disposeTimeOut="disposeTimeOut"></marvel-prompt-item>
    <!--</div>-->
  </div>
</template>

<script>
  import MarvelPromptItem from './MarvelPromptItem.vue';

  /**
   *  MarvelPromptC widget description
   *  @vuedoc
   *  @exports MarvelPromptC
   */
  export default {
    components: {
      MarvelPromptItem
    },
    name: "MarvelPrompt",
    props: {
      top: {
        type: String,
        default: undefined,
        required: false,
      },
      isGlobal: {
        type: Boolean,
        default: true,
        required: false,
      },
      oPrompts: {
        type: Array,
        default: undefined,
        required: true,
      },
      disposeTimeOut: {
        type: Number,
        default: 10000,
        required: false,
      }
    },
    data: function () {
      return {};
    },
    computed:{
      promptPosCalc:function () {

      }
    },
    methods: {
      //#region inner
      //#endregion
      //#region callback

      promptDestroy(prompt) {
        this.$emit("promptDestroy", prompt);
      }

      //#endregion
      //#region 3rd
      //#endregion
    },
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

  .promptGlobalContainer {
    position: fixed;
    bottom: 0px;
    right: 20px;
    z-index: 3003;
  }

  .promptWrapper{
    position: absolute !important;
  }

  .customStyle {
    margin-bottom: 10px;
  }
</style>
