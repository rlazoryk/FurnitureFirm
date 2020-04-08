import { OrderedDetail } from "./ordered-detail";

export class DetailsOrderRequest {
  orderedFurnitures: OrderedDetail[] = new Array<OrderedDetail>();
  totalPrice: number;
}
