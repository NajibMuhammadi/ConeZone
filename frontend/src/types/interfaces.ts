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

export interface CartItem {
    sk: string,
    qty: number,
    name: string,
    image: string,
    price: number
}

export interface CounterProps {
    item: CartItem;
}

export interface CustomerDetails {
    name: string;
    phone: string;
    email: string;
    paymentMethod: string;
}

interface OrderItem extends CartItem { }

export interface Order {
    items: OrderItem[],
    customerDetails: CustomerDetails;
    isApproved: boolean,
}

interface KitchenOrder {
    sk: string;
    customerDetails: CustomerDetails;
    items: OrderItem[];
    totalPrice: number;
    paymentMethod: string;
    // status: 'incoming' | 'ongoing' | 'done'; // Status for the order
}

export interface MenuStore {
    cart: CartItem[];
    setCart: (newCart: CartItem[]) => void;
    addToCart: (item: ItemType) => void;
    clearCart: () => void;
    removeFromCart: (sk: string) => void;
    totalQuantity: () => number;
    totalPrice: () => number;
    order: {
        items: OrderItem[];
        customerDetails: {
            name: string;
            phone: string;
            email: string;
            paymentMethod: string;
        };
        isApproved: boolean;
    } | null;
    setOrder: (name: string, phone: string, email: string, paymentMethod: string) => void;
    approveOrder: () => void;
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    kitchenOrders: KitchenOrder[];
    addKitchenOrder: (order: KitchenOrder) => void;
}

/**
 * Författare Ida
 * Skapat en ItemType interface för våra items i databasen.
 * Denna berättar om det är strängar, booleans, numbers eller arrays som våra items är byggda av
 */

// Författare Lisa
// Skapar interfaces för cartItem, CounterProps, Order, CustomerDetails och MenuStore