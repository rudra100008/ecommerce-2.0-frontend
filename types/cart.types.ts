
export interface CartRequest{
    userId: number;
    cartItems: CartItemRequest[]
}
export interface CartItemRequest{
    quantity: number;
    productId: number;
}
export interface Cart{
    id:number;
    userId:number;
    cartItems:CartItem[];
}
export interface CartItem{
    id:number;
    quantity:number;
    productId: number;
    reservationId: number;
    priceAtAddTime: number;
    discountAtAddTime: number;
}

export interface CartState{
    cart: Cart | null;
    setCart: (cart: Cart) => void;
    clearCart: () => void;
}