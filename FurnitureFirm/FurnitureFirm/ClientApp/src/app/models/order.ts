export class Order {
    orderId: number
    orderDate: Date
    totalPrice: number
    workerId: number
    status: string
    customer: {
        name: string
        phoneNumber: string
    }
    deliveryInfo: {
        street : string
        building : number
        city : {
            name: string
        }
    }
    paymentSystem: {
        name: string
    }
    profit: {
        money: number
    }
    furnitureOrderRows: {
        count: number
        totalFurniturePrice: number
        furniture: {
            name: string
        }
    }
}