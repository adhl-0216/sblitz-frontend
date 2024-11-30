import { UUID } from "crypto";
import { Member } from "./Member";
import { Item } from "./Item";

export interface Bill {
    id: UUID;
    title: string;
    description: string | null;
    currency: string;
    totalAmount: number;
    ownderId: string;
    createdAt: Date;
    updatedAt: Date;
    items: Item[]
    members: Member[]
}
