import { Provider } from "./provider";

export class Detail {
    detailId: number;
    name: string;
    price: number;
    colorName: string;
    materialName: string;
    producerName: string;
    provider: Provider;
    description: string;
    timeToIntegrate: number;
}
