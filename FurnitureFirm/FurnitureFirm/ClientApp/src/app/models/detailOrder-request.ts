import { OrderedDetail } from "./ordered-detail";

export class DetailsOrderRequest {
  orderRows: OrderedDetail[] = new Array<OrderedDetail>();
  totalPrice: number;
  workerId: number;
  providerId: number;
}
