# 控件合并

## 合并来源：
  src\walle\widget\grid\MarvelGrid 
  src\walle\widget\grid\MarvelGridEx 
  src\walle\widget\grid\MarvelGridExFilter 
  src\walle\widget\grid\MarvelGridExFreeze 
  src\walle\widget\grid\MarvelGridExWithFreezeColumn  

## 原有控件更新为最新控件所需适配：

    MarvelGrid   -- --  原使用配置可不做变更
    MarvelGridEx    -- 更改控件标签，在原有配置基础上添加 buttonType="noBorderBtn"
    MarvelGridExFilter -- 更改控件标签，原使用配置可不做变更
    MarvelGridExFreeze -- 更改控件标签，在原有配置基础上添加 buttonType="noBorderBtn"
    MarvelGridExWithFreezeColumn  -- 更改控件标签，在原有配置基础上添加 buttonType="dottedLineBtn"

  所涉及控件的共同修改点：
  
    1.业务侧修改点：
      
      a.更改控件引用路径；
      
      b.自动化测试影响分析：
  
    2.合并后功能变更
      
      功能合并为并集，不影响原有功能
    
    3.合并后样式变更：
    
      添加最小宽度220px限制
