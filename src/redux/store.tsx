/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/
import {StoreState} from 'types'
//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore} from 'redux'
//引入汇总之后的reducer
import reducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//引入redux-thunk，用于支持异步action
// import thunk from 'redux-thunk'
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'


const persistConfig = {
	key: 'root',
	storage,
  }

const persistedReducer = persistReducer(persistConfig, reducer)
//暴露store 
const store:StoreState =createStore(persistedReducer,composeWithDevTools());
const persistor = persistStore(store)

export{
	store,
	persistor
}