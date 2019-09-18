# 控件合并

## 合并来源：
  src\walle\widget\search\MarvelSearch
  src\walle\widget\search\MarvelSearchWithDropDown

## 原有控件更新为最新控件所需适配：

    MarvelSearch   
      更改控件标签，原使用配置可不做变更
      getSearcheVal API 返回值变更 strSearchVal —> {strSearchVal:'XXX'}
    MarvelSearchWithDropDown    -- 更改控件标签，原使用配置可不做变更
    
  所涉及控件的共同修改点：
  
    1.业务侧修改点：
      
      a.更改控件引用路径；
      
      b.自动化测试影响分析：
        MarvelSearch由于控件合并导致html结构变更，自动化需关注
        MarvelSearchWithDropDown 无自动化影响
        
    2.合并后功能变更
      
      功能合并为并集，不影响原有功能
    
    3.合并后样式变更：
    
      无
