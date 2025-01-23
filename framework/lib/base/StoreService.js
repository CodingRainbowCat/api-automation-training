import "dotenv/config";
import { ServiceBase } from "./ServiceBase.js";
export class StoreService extends ServiceBase {
    constructor() {
        super("/store");
    }
    static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new StoreService();
        }
        return this.classInstance;
    }
    async getInventory(config = this.defaultConfig) {
        return await this.get(`${this.url}/inventory`, config);
    }
    //WIP
    async postOrder(order, config = this.defaultConfig) {
        return await this.post(`${this.url}/order`, order, config);
    }
    async getOrder(id, config = this.defaultConfig) {
        return await this.get(`${this.url}/order/${id}`, config);
    }
    async deleteOrder(id, config = this.defaultConfig) {
        return await this.delete(`${this.url}/order/${id}`, config);
    }
}
