import "dotenv/config";
import { ServiceBase } from "./ServiceBase.js";
import { Response, Order, Inventory } from "../models";
import { DeleteOrderResponse } from "../models/responses/DeleteOrderResponse.js";

export class StoreService extends ServiceBase {
  private static classInstance?: StoreService;

  public constructor() {
    super("/store");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new StoreService();
    }

    return this.classInstance;
  }

  async getInventory(config = this.defaultConfig): Promise<Response<Inventory>> {
    return await this.get<Inventory>(`${this.url}/inventory`, config);
  }

  //WIP
  async postOrder(order: Order, config = this.defaultConfig): Promise<Response<Order>> {
    return await this.post<Order>(`${this.url}/order`, order, config);
  }

  async getOrder(id: number, config = this.defaultConfig): Promise<Response<Order>> {
    return await this.get<Order>(`${this.url}/order/${id}`, config);
  }

  async deleteOrder(id: number, config = this.defaultConfig): Promise<Response<DeleteOrderResponse>> {
    return await this.delete<DeleteOrderResponse>(`${this.url}/order/${id}`, config);
  }
}
