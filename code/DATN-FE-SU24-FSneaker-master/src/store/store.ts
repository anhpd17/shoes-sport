import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlice'
import { itemsSelectedReducer } from './slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        itemsSelected: itemsSelectedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            thunk: false
        })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
