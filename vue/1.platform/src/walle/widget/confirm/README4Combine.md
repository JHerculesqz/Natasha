# 控件合并

## 合并来源：
  src\walle\widget\dialog\MarvelConfirm
  src\walle\widget\dialog\MarvelConfirmEx

## 原有控件更新为最新控件所需适配：

    MarvelConfirm   -- --  原使用配置可不做变更
    MarvelConfirmEx
      更改控件标签
      合并后功能变更：属性名称 canDrag 改为 draggable 默认值由true 改为false 
      

  所涉及控件的共同修改点：
  
    1.业务侧修改点：
      
      a.更改控件引用路径；
      
      b.自动化测试影响分析：
        控件内按钮控件变更为src\walle\widget\btn\MarvelButton，自动化影响同MarvelButton
        
    2.合并后功能变更
      
      功能合并为并集，不影响原有功能
    
    3.合并后样式变更：
    
      无
