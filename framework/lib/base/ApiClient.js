import "dotenv/config";
import { ApiClientBase } from "./ApiClientBase.js";
export class ApiClient extends ApiClientBase {
    constructor() {
        super();
    }
    static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new ApiClient();
        }
        return this.classInstance;
    }
}
