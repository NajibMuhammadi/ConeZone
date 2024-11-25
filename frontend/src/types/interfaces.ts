export interface ItemType {
    pk: string,
    sk: string,
    category: string,
    components: string[],
    desc: string,
    image: string,
    name: string,
    popular: boolean,
    price: number
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

// interface OrderItem extends CartItem { }

export interface Order {
    sk: string,
    items: CartItem[];
    customerDetails: CustomerDetails;
    paymentMethod: string;
    totalPrice: number;
    isApproved?: boolean;
    isDone?: boolean;
}

// export interface OrderInput {
//     items: { name: string; qty: number; price: number }[];
//     customerDetails: CustomerDetails;
// }

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

/**
 * Författare Ida
 * Skapat en ItemType interface för våra items i databasen.
 * Denna berättar om det är strängar, booleans, numbers eller arrays som våra items är byggda av
 */

// Författare Lisa
// Skapar interfaces för cartItem, CounterProps, Order, CustomerDetails och MenuStore