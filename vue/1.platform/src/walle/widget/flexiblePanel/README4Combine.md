# 控件合并

## 合并来源：
  src\walle\widget\extPanel\MarvelBottomExtPanel
  src\walle\widget\extPanel\MarvelLeftExtPanel
  src\walle\widget\extPanel\MarvelRightExtPanel

## 原有控件更新为最新控件所需适配：

    MarvelBottomExtPanel   -- --  在原有配置基础上添加 pos="bottom"
    MarvelLeftExtPanel    -- 在原有配置基础上添加 pos="left"
    MarvelRightExtPanel -- 在原有配置基础上添加 pos="right"

  所涉及控件的共同修改点：
  
    1.业务侧修改点：
      
      a.更改控件标签,更改控件引用路径；
      
      b.自动化测试影响分析：
        MarvelBottomExtPanel、MarvelLeftExtPanel、MarvelRightExtPanel 展开折起按钮html结构有所变更,业务侧需要关注xpath变更。
  
    2.合并后功能变更
      
      功能合并为并集，不影响原有功能
    
    3.合并后样式变更：
    
      无


