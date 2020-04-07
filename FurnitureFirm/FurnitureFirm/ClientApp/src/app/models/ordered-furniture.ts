import { OrderedDetail } from "./ordered-detail";

export class OrderedFurniture {
    furnitureId : number
    additionalDetails : OrderedDetail[] = new Array<OrderedDetail>();
    count : number
    totalPrice : number
    totalTime : number
}