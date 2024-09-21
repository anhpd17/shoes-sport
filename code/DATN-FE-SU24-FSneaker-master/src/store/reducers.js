import { combineReducers } from 'redux'

const cartReducer = (
    state = {
        items: [],
        badge: 0
    },
    action
) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const productId = action.payload

            const isIdExist = state.find((item) => (item = productId))

            if (!isIdExist) {
                return (state = {
                    items: [...state.items, productId],
                    badge: ++state.badge
                })
            }

        case 'REMOVE_FROM_CART':
            return state - 1
        case 'REMOVE_ALL_CART':
            return 0
        case 'REMOVE_FROM_CART_CUSTOM':
            return state - action.payload.quantity
        case 'UPDATE_CART_QUANTITY':
            return state + action.payload.quantity
        case 'UPDATE_ALL_QUANTITY':
            console.log(action.payload, 'vo')
            const productIds = action.payload
            return (state = {
                items: productIds,
                badge: productIds?.length
            })

        default:
            return state
    }
}

const rootReducer = combineReducers({
    cart: cartReducer
})

export default rootReducer
