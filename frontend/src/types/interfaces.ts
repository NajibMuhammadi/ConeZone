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

interface OrderItem extends CartItem { }

export interface Order {
    items: OrderItem[],
    isApproved: boolean,
}
export interface MenuStore {
    // menu: {
    //     iceCream: ItemType[];
    // };
    // setMenu: (newMenu: { iceCream: ItemType[] }) => void;
    cart: CartItem[];
    setCart: (newCart: CartItem[]) => void;
    addToCart: (item: ItemType) => void;
    totalQuantity: () => number;
    totalPrice: () => number;
    order: Order | null;
    setOrder: () => void;
    approveOrder: () => void;
}

/**
 * Författare Ida
 * Skapat en ItemType interface för våra items i databasen.
 * Denna berättar om det är strängar, booleans, numbers eller arrays som våra items är byggda av
 */

// Författare Lisa
// Skapar interfaces för cartItem, Order och MenuStore