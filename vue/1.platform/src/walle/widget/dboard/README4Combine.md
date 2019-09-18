# 控件合并

## 合并来源：
  src\walle\widget\dashboard\MarvelDashboard
  src\walle\widget\dashboard\MarvelDashboardAdatptToContH

## 原有控件更新为最新控件所需适配：

    MarvelDashboard   -- --  原使用配置可不做变更
    MarvelDashboardAdatptToContH    -- 更改控件标签，在原有配置基础上添加 添加配置项:bIsAdaptToContent="true"

  所涉及控件的共同修改点：
  
    1.业务侧修改点：
      
      a.更改控件引用路径；
      
      b.自动化测试影响分析：
        无
        
    2.合并后功能变更
      
      功能合并为并集，不影响原有功能
    
    3.合并后样式变更：
    
      无
