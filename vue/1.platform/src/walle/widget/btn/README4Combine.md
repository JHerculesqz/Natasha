# 控件合并

## 合并来源：
  src\walle\widget\button\MarvelButton
  src\walle\widget\button\MarvelIconButton
  src\walle\widget\button\MarvelIconTxtButton
  src\walle\widget\button\MarvelTxtButton
  src\walle\widget\button\MarvelTabButton

## 原有控件更新为最新控件所需适配：

    MarvelButton   -- --  原使用配置可不做变更
    MarvelIconButton    -- 更改控件标签，在原有配置基础上添加 buttonType="noBorderBtn"
    MarvelIconTxtButton -- 更改控件标签，原使用配置可不做变更
    MarvelTxtButton -- 更改控件标签，在原有配置基础上添加 buttonType="noBorderBtn"
    MarvelTabButton  -- 更改控件标签，在原有配置基础上添加 buttonType="dottedLineBtn"

  所涉及控件的共同修改点：
  
    1.业务侧修改点：
      
      a.更改控件引用路径；
      
      b.自动化测试影响分析：
        新老MarvelButton控件均为单层html标签结构，合并后增加了一些属性配置，部分属性已class的形式作用在html结构上。故业务侧需要关注由class变化导致的xpath变更。
  
    2.合并后功能变更
      
      功能合并为并集，不影响原有功能
    
    3.合并后样式变更：
    
      添加最小宽度220px限制
