import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['tasks'] 
  };

const rootReducer = combineReducers({
    tasks:taskReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleWare) => (
        getDefaultMiddleWare({
            serializableCheck:false,
        })
    )
    
})

export const persistor = persistStore(store)
