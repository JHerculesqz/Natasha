# 控件合并

## 合并来源：
  src\walle\widget\loading\MarvelLoading  
  src\walle\widget\loading\MarvelILoadingIconPublic 
  src\walle\widget\loading\MarvelLoadingPublic   
  src\walle\widget\loading\MarvelLoadingPublicEx  

## 原有控件更新为最新控件所需适配：

    MarvelLoading
    api 传参变化：
      imsgMarvelLoadingShow(strLoadingMsg) —> imsgMarvelLoadingShow(strKey, strLoadingMsg)
      imsgMarvelLoadingHide() —> imsgMarvelLoadingHide(strKey)
      imsgMarvelLoadingCancel() —> imsgMarvelLoadingCancel(strKey)
    MarvelILoadingIconPublic   -- --  原使用配置可不做变更
      在原有配置基础上添加 :onlyIcon="true"
    MarvelLoadingPublic   -- --  原使用配置可不做变更
      在原有配置基础上添加 :hasCancelBtn="false"
      不再传入showList属性，showList为控件内部维护的数据，使用侧通过api（imsgMarvelLoadingShow、imsgMarvelLoadingHide、imsgMarvelLoadingCancel）来设置showList。
    MarvelLoadingPublicEx   -- --  原使用配置可不做变更
      不再传入showList属性，showList为控件内部维护的数据，使用侧通过api（imsgMarvelLoadingShow、imsgMarvelLoadingHide、imsgMarvelLoadingCancel）来设置showList。

    
  所涉及控件的共同修改点：
  
    1.业务侧修改点：
      
      a.更改控件引用路径；
      
      b.自动化测试影响分析：
        合并后增加了一些属性配置，部分属性已class的形式作用在html结构上。故业务侧需要关注由class变化导致的xpath变更。
        
    2.合并后功能变更
      
      功能合并为并集，api传参有变更需业务侧适配。
    
    3.合并后样式变更：
    
      无
