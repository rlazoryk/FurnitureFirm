import { OrderedDetail, OrderedAdditionalDetail } from "./ordered-detail";

export class OrderedFurniture {
    furnitureId : number
    additionalDetails : OrderedAdditionalDetail[] = new Array<OrderedAdditionalDetail>();
    count : number
    totalPrice : number
    totalTime : number
}