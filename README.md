# 简易的mvc实现

## 思路整理
 - view无状态,实例初始化的时候确定该实例和model之间的关系，按指定的数据格式渲染dom，并以观察者的身份观察model的变化。
 - model承载着应用的逻辑和数据交互，数据变化后通知所有观察者view变化。
 
## 功能整理
- EventEmit
	- on 添加观察属性
	- trigger 触发被观察者指定属性变化
	- off 取消属性观察
	- once 只观察属性一次
- View 负责将model数据转化为dom，并且观察model变化
	- delegateEvents 将this.events对象转化为dom事件
	- listenTo 调用model的on函数,订阅model变化,并且记录下已订阅的model
	- stopListening 通过在listenTo纪录的model,通过off函数,来取消已纪录的model的订阅
	- template 为view指定对应的模版
	- tagName,className 为模版包裹一层特定的dom
	- render 将指定model通过模版渲染成dom
	- initialize 初始化调用
- Model (类型为object的model)
	- 继承EventEmit 构造函数原型上放上EventEmit实例达到继承效果
	- default Model内部数据默认值。实例化的时候，未传递参数的情况下的默认数据格式
	- 封装对内部数据的增删查改动作
		-  set(新增/修改属性值) 触发change事件,并判断是否拥有collection,有则继续触发collection的change事件
		-  clear(清空属性值) 触发destroy事件,并判断是否拥有collection,有则继续触发collection的change事件
		-  toJSON(遍历所有属性值),get(获取特定属性值)
	
	
- Collection(类型为array的model)
	- 继承EventEmit 构造函数原型上放上EventEmit实例达到继承效果
	- push models属性为array类型，push触发add
	- pop array pop,触发remove
	- each 遍历models
- extend
	- 生产环境下需要在保留原生View,Model类的功能情况下做一些业务拓展，这时候需要用到类的继承




	
	
	