import { OrderedDetail } from "./ordered-detail";

export class DetailsOrderRequest {
  orderedDetails: OrderedDetail[] = new Array<OrderedDetail>();
  totalPrice: number;
}
