## 项目简介
---
+ 搭建ReactNative基础框架，其中主要实现路由导航和引入redux框架管理应用数据和状态

###Redux＋Redux-thunk+React-redux+Redux-act
---
+ Redux:提供可预测的状态管理，用以构建一致化的应用
+ React-redux：Redux的react绑定库
+ Redux-thunk：实现异步ActionCreator
+ 使用流程：
	+ 创建ActionType
	+ 根据ActionType定义Action
	+ 完成Action定义之后，定义Reducer（管理state）。`通过dispatch方法刷新State。Action => Dispatcher => Store => View`
	+ 定义Store
	+ 通过combineReducers合并多个模块的reducer
	+ 通过Provider组件将Store注入进整个app
	
		```
//用redux-thunk支持异步Action
//Middleware提供的是位于action发起之后，到达reducer之前的扩展点
import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer  from '../reducers/index';
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export default function configureStore(initialState){
	const store = createStoreWithMiddleware(rootReducer,initialState);
	return store;
}
		```
	+ Redux-act：Redux创建Actions和Reducers的便利第三方库

###ReactComponentWithPureRenderMixin
---
+ 减少刷新次数

##项目结构说明
---
####Containers目录
---
####Components目录
---
####reducers目录
---
+ 管理State
+ 更新用户数据

####selectors目录
---
+ 查询state数据
####utils目录
---