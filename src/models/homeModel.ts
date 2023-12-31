export interface ProductItem {
    title: string;
    description: string;
    price: number;
    discount_percentage: number;
    stock: number;
    category: string;
    images: string[];
    id: string;
    quantity?:number;
};