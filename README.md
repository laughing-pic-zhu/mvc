#简易的mvc实现
##思路整理
 - view无状态,实例初始化的时候确定该实例和model之间的关系，按指定的数据格式渲染dom，并以观察者的身份观察model的变化。
 - model承载着应用的逻辑和数据交互，数据变化后通知所有观察者view变化。
 
##功能整理
- eventEmit观察者函数实现
	- on 添加观察者
	- trigger 触发观察
	- off 取消事件观察
	- once 只观察一次
- View 负责将model数据转化为dom，并且model变化的时候作出相应的响应
	- delegateEvents 将this.events对象转化为dom事件
	- template 为view对应指定的模版
	- tagName,className 为模版包裹一层特定的dom
	- render 将指定model通过模版渲染成dom
	- initialize 初始化调用
- Model 
	- 封装操作model数据的方法，并一一对应触发相应的变化
	