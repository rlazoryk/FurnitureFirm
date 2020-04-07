import { OrderedFurniture } from "./ordered-furniture";

export class OrderRequest {
    orderedFurnitures : OrderedFurniture[] = new Array<OrderedFurniture>();
    totalPrice : number
}