# 控件合并

## 合并来源：

src\walle\widget\dialog\MarvelConfirm

src\walle\widget\dialog\MarvelConfirmEx


## 使用处变更为最新合并控件，修改点如下

### 更改控件名和引用路径: src\walle\widget\dialog\xxxx  改为  src\walle\widget\confirm\xxxx

### MarvelConfirm  

    业务侧修改点：
    更改控件引用路径；

    合并后功能变更：
    添加width属性，用于设置提示框宽度
    添加maxContH属性，用于设置提示框最大高度，超出会出现纵向滚动条
    添加confirmTitle属性，用于设置提示框标题
    在属性type原有枚举类型"error"、"warning"、"tip"、的基础上添加自定义类型"custom"
      若type选择为"custom"可自定义以下配置：
      confirmIcon：提示图标自定义
      confirmIconColor：提示图标颜色自定义
      confirmSubTitle：提示副标题自定义
    添加confirmContLst配置用于设置提示框内容，类型为数组，参考如下
    confirmContLst:[{
              key:"Description:",
              value:"Failed to create services."
            }]
            
    合并后样式变更：
    添加最小宽度330px限制
    
    自动化测试影响分析：无 
    
### MarvelConfirmEx

    业务侧修改点：
        更改控件名和引用路径
    
        合并后功能变更：
        属性名称 canDrag 改为 draggable 默认值由true 改为false （！！业务侧注意修改）
        
        自动化测试影响分析：此控件未曾在自动化测试背景下使用，无自动化影响。 

