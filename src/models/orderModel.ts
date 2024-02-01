import { DropdownOption } from "./dropdownModel";

export interface RazorOrderDetail {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: null;
    offer_id: null;
    status: string;
    attempts: number;
    notes: never[];
    created_at: number;
} 

export interface CheckoutDetailForm {
    address: string;
    city: string;
    cState: DropdownOption | null;
    landmark: string;
    pincode: string;
    mobile_number: string;
  }



export interface OrderItem {
    order: string;
    productId: string;
    title: string;
    category: string;
    quantity: number;
    price: number;
}

export interface Order {
    orderId: string;
    user: string;
    orderDate: string;
    totalAmount: number;
    status: string;
    orderItems:OrderItem[]
}