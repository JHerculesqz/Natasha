# 控件合并

## 合并来源：
  src\walle\widget\prompt\MarvelPrompt
  src\walle\widget\prompt\MarvelPromptGLobal

## 原有控件更新为最新控件所需适配：

    MarvelPrompt
    相当于全新控件,使用传参等有变化。
    MarvelPromptGLobal
    更改控件标签，原使用配置可不做变更。

  所涉及控件的共同修改点：
  
    1.业务侧修改点：
      
      a.更改控件引用路径；
      
      b.自动化测试影响分析：
        MarvelPrompt：无
        MarvelPromptGLobal：无
        
    2.合并后功能变更
      
      MarvelPrompt：相当于全新控件,使用传参等有变化。
      MarvelPromptGLobal：功能合并为并集，不影响原有功能
      
    
    3.合并后样式变更：
    
      无



