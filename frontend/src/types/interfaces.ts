export interface ItemType {
    pk: string,
    sk?: string,
    category: string,
    components: string[],
    desc: string,
    image: string,
    name: string,
    popular: boolean,
    price: number
}

export interface NewItem {
    name: string,
    desc: string,
    price: number,
    category: string,
    image: string,
    popular: boolean,
    components: string[]
}

export interface CartItem extends Pick<ItemType, 'sk' | 'name' | 'image' | 'price'> {
    qty: number;
}

export interface CounterProps {
    item: CartItem;
}

export interface CustomerDetails {
    name: string;
    phone: string;
    email: string;
}

export interface Order {
    pk?: string,
    sk?: string,
    items: CartItem[];
    customerDetails: CustomerDetails;
    paymentMethod: string;
    totalPrice: number;
    isApproved?: boolean;
    isDone?: boolean;
    isPickedUp?: boolean;
    kitchenMessage?: string
}

export interface MenuStore {
    cart: CartItem[];
    setCart: (newCart: CartItem[]) => void;
    addToCart: (item: ItemType) => void;
    removeFromCart: (sk: string) => void;
    clearCart: () => void;
    totalQuantity: () => number;
    totalPrice: () => number;
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    order: Order | null;
    setOrder: (name: string, phone: string, email: string) => void;
}

export interface RegisterType {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export interface LoginType {
    usernameOrEmail: string;
    password: string;
}

export interface updatedOrder {
    items: CartItem[],
    totalPrice: number
}

export interface adminApprove {
    sk: string
    isApproved?: boolean,
    isDone?: boolean,
    isPickedUp?: boolean,
    kitchenMessage?: string
}

/**
 * Författare Ida
 * Skapat en ItemType interface för våra items i databasen.
 * Denna berättar om det är strängar, booleans, numbers eller arrays som våra items är byggda av
 * Skapade interface för adminApprove, updatedOrder,newItem
 */

// Författare Lisa
// Skapar interfaces för cartItem, CounterProps, Order, CustomerDetails och MenuStore