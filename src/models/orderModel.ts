import { DropdownOption } from "./dropdownModel";

export interface OrderDetail {
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
    name: string;
    address: string;
    city: string;
    cState: DropdownOption | null;
    landmark: string;
    pincode: string;
    email: string;
    mobile_number: string;
  }
