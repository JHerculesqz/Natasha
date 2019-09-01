# 控件合并

## 合并来源：

src\walle\widget\search\MarvelSearch

src\walle\widget\search\MarvelSearchWithDropDown


## 使用处变更为最新合并控件，修改点如下

### 更改控件名和引用路径: src\walle\widget\search\xxxx  改为  src\walle\widget\searchBox\xxxx

### MarvelSearch  

    业务侧修改点：
    更改控件引用路径；

    合并后功能变更：
    添加width属性，用于设置搜索框宽度
    添加selectItems属性，用于设置下拉框
    添加maxHeight属性，用于设置下拉框子菜单最大高度
    API回调返回值变更（！！业务侧注意修改）：
    this.$emit("search", strSearchVal); -> this.$emit("search", searchKey, strSearchVal, searchKeyObj);
    API getSearchVal 返回值变更（！！业务侧注意修改）：
    return strSearchVal; -> return {
                                      searchKey:String,
                                      searchKeyObj:Object,
                                      strSearchVal: String
                                    };
    
    自动化测试影响分析：
      外层Class名称searchWrapper -> （search_dropDown onlySearch）/searchArea/searchWrapper
       
    
### MarvelSearchWithDropDown 

    业务侧修改点：
        更改控件名和引用路径
    
    合并后功能变更：
    新增 onClear 回调方法
    新增 getSearchVal API
    
    自动化测试影响分析：无。 

