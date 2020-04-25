import { Provider } from "./provider";

export class OrderedAdditionalDetail {
    additionalDetailId : number
    count : number
    totalPrice : number
    totalTime : number
}

export class OrderedDetail {
    detailId: number;
    provider: Provider;
    count: number;
    orderedDetailPrice: number;
}
