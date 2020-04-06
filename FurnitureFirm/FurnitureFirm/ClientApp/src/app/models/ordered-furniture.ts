import { Detail } from "./detail";

export class OrderedFurniture {
    furnitureId : number
    additionalDetails : { [detailId: number] : number; } = {}
    count : number
}