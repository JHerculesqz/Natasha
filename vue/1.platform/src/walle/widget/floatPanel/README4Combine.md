# 控件合并

## 合并来源：
  src\walle\widget\button\MarvelDragHelp
  src\walle\widget\list\MarvelList1 
  src\walle\widget\list\MarvelList2
  src\walle\widget\list\MarvelList1Analysis  
  src\walle\widget\list\MarvelList3
  src\walle\widget\list\MarvelList4 
  src\walle\widget\list\MarvelList5

## 原有控件更新为最新控件所需适配：

   
  所涉及控件的共同修改点：
  
    1.业务侧修改点：
      
      a.更改控件引用路径，相当于全新控件，业务侧根据使用场景自行配置参数posTop、posRight、posBottom、posLeft属性控制展示初始位置，通过contPos属性控制面板展开位置。
      
      b.自动化测试影响分析：
        相当于全新控件，业务侧需关注自动化变更影响
        
    2.合并后功能变更
      
      功能合并为并集
    
    3.合并后样式变更：
    
      无
