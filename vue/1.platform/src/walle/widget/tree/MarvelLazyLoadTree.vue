<template>
  <div class="treeWrapper">
    <ul :id="id" class="treeCont"></ul>
  </div>
</template>

<script>
  /**
   *  MarvelLazyLoadTree widget description
   *  @vuedoc
   *  @exports MarvelLazyLoadTree
   */
  export default {
    name: 'MarvelLazyLoadTree',
    props: {
      treeData: {
        type: Array,
        default: undefined,
        required: true,
      },
      id: {
        type: String,
        default: "",
        required: true,
      },
    },
    data: function () {
      return {
        nodeDataArr: {},
        expIcon: 'icon-marvelIcon-65',
        folderIcon: 'icon-marvelIcon-64',
        selectdId: ''
      }
    },
    beforeDestroy() {
      //#region destroy

      this._destroy();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _destroy: function () {
        $("#" + this.id).empty();
      },

      //#endregion

      lazyLoadData: function (curObj) {
        $(curObj).nextAll('a').attr('lazyload', false);
        let children = this.createTree(this.nodeDataArr[$(curObj).nextAll('a').attr('nodeid')].children4Show);
        const newDom = `<ul>${children}</ul>`;
        $(curObj).parent().nextAll('ul').empty();
        $(curObj).parent().parent().append(newDom);
        $(curObj).addClass(this.folderIcon);
        $(curObj).removeClass(this.expIcon);
        $(curObj).parent().nextAll('ul').show();
      },
      createTree: function (d) {
        let list = '';
        let self = this;
        $.each(d, function (i, n) {
          self.nodeDataArr[n.id] = n;
          let cls = n.icon + ' lazyTreefile';
          let folder = '';
          if (n.children.length > 0) {
            folder = `lazyTreeItemIcon ${self.expIcon}`;
          }
          const lazyLoad = n.lazyload ? `lazyload = true` : '';
          list += `<li class="treeLi">
                    <div class="treeLiDiv">
                      <div class="${folder}"></div>
                      <div class="${cls}"></div>
                      <a nodeid="${n.id}" ${lazyLoad}>${n.name || ''}</a>
                      <span>${n.subName || ''}</span>
                    </div>`;
          if (n.children.length > 0) {
            list += "<ul>";
            list += self.createTree(n.children);
            list += "</ul>"
          }
          list += "</li>";
        });
        return list;
      },

      //#endregion
      //#region callback

      callback4OnTreeNodeClick: function (oNode) {
        this.$emit("onTreeNodeClick", oNode);
      },

      //#endregion
      //#region 3rd

      init: function () {
        this.$nextTick(function () {
          // lazyload场景 动态的将子节点挂载到dom树中
          // 后续如果数据量非常大，可以将children动态从后台获取，效率会更高

          //数据构造
          for (const iterator of this.treeData) {
            iterator.children4Show = JSON.parse(JSON.stringify(iterator.children));
            iterator.lazyload = true;
            iterator.children = [{
              children: []
            }];
          }

          //init html
          $("#" + this.id).empty().append(this.createTree(this.treeData));


          //bind click event
          let self = this;
          $("#" + this.id).click(function (e) {
            const curObj = e.target;
            if ($(curObj).nextAll('a').attr('lazyload') === "true" && curObj.className.indexOf('lazyTreeItemIcon') > -1) {
              self.lazyLoadData(curObj);
              return;
            }

            if (curObj.attributes && curObj.attributes.nodeid) {
              self.selectdId && ($(`[nodeid=${self.selectdId}]`).attr('style', `color:''`));
              self.selectdId = curObj.attributes.nodeid.value;
              curObj.style.color = '#417de2';
              self.callback4OnTreeNodeClick(self.nodeDataArr[curObj.attributes.nodeid.value]);
            }

            if (curObj.classList.toString().indexOf('icon-marvelIcon') < 0) {
              return;
            }

            if ($(curObj).hasClass(self.expIcon)) {
              $(curObj).addClass(self.folderIcon);
              $(curObj).removeClass(self.expIcon);
              $(curObj).parent().nextAll('ul').show();
            } else {
              $(curObj).addClass(self.expIcon);
              $(curObj).removeClass(self.folderIcon);
              $(curObj).parent().nextAll('ul').hide();
            }
          });
        });
      },
      setActiveNodeStyleById: function (nodeId) {
        if (this.selectdId) {
          this.selectdId && ($(`[nodeId=${this.selectdId}]`).attr('style', `color:''`));
        }
        this.selectdId = nodeId;
        $(`[nodeId=${nodeId}]`)[0].style.color = '#417de2';
      },
      expandAllNodes: function (oNode) {
        let x = $(`[nodeid=${oNode.id}]`);//
        if (x.attr('lazyload') === "true") {
          let curObj = x.parent().find('.lazyTreeItemIcon');
          this.lazyLoadData(curObj);
        }
        $(`[nodeid=${oNode.id}]`).parent().parent().find('ul').show();
        const obj = $(`[nodeid=${oNode.id}]`).parent().parent().find(`.${this.expIcon}`);
        obj.addClass(this.folderIcon);
        obj.removeClass(this.expIcon);
      },
      folderAllNodes: function (oNode) {
        $(`[nodeid=${oNode.id}]`).parent().parent().find('ul').hide();
        const obj = $(`[nodeid=${oNode.id}]`).parent().parent().find(`.${this.folderIcon}`);
        obj.addClass(this.expIcon);
        obj.removeClass(this.folderIcon);
      }

      //#endregion
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
  .treeWrapper {
    width: 100%;
    height: 100%;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    padding: 10px;
    overflow-y: auto;
    margin: 0;
    position: relative;
  }

  .lazyTreefile {
    cursor: pointer;
    display: inline-block;
    line-height: 16px;
    width: 16px;
    height: 16px;
    font-size: 14px;
    vertical-align: bottom
  }

  .treeWrapper ul, li {
    list-style: none;
  }

  .treeCont {
    padding: 0;
    margin: 0;
  }

  .lazyTreeItemIcon {
    width: 16px;
    height: 16px;
    font-size: 10px;
    line-height: 16px;
    cursor: pointer;
    float: left;
    padding-top: 4px;
  }

  .treeLi ul {
    display: none
  }

  .treeLiDiv {
    white-space: nowrap;
    margin-bottom: 5px
  }

  .treeLiDiv a {
    line-height: 16px;
    height: 16px;
    color: #333333;
    cursor: pointer;
    white-space: nowrap;
    font-size: 14px;
  }

  .treeLiDiv a:hover {
    color: #417de2;
  }

  .treeLiDiv span {
    color: #999999;
    padding-left: 6px;
    font-style: italic;
    white-space: nowrap;
  }

  /*darkBg theme*/
  .blackBg .lazyTreeItemIcon {
    color: #FFFFFF;
  }

  .blackBg .treeLiDiv a {
    color: #eee;
  }

  .blackBg .treeLiDiv span {
    color: #888;
  }

  .blackBg .treeLiDiv a:hover {
    color: #417de2;
  }
</style>
