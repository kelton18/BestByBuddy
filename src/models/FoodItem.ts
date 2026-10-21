export type StorageLocation = 'fridge' | 'pantry' | 'freezer';

export interface FoodItem {
    id: string;
    name: string;
    quantity: number;
    location: StorageLocation;
    purchaseDate: string;
    expirationDate: string;
}