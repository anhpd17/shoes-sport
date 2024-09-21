export const addToCartStore = () => ({
    type: 'ADD_TO_CART'
})

export const removeFromCartStore = () => ({
    type: 'REMOVE_FROM_CART'
})
export const removeAllCartStore = () => ({
    type: 'REMOVE_ALL_CART'
})

export const updateCartQuantityStore = (quantity) => ({
    type: 'UPDATE_CART_QUANTITY',
    payload: { quantity }
})

export const updateAllCartQuantityStore = (quantity) => ({
    type: 'UPDATE_ALL_QUANTITY',
    payload: { quantity }
})

export const decreaseCustomCartQuantityStore = (quantity) => ({
    type: 'REMOVE_FROM_CART_CUSTOM',
    payload: { quantity }
})
