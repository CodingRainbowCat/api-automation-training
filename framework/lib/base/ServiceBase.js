import { ApiClient } from "./ApiClient.js";
import { SessionManager } from "./SessionManager.js";
export class ServiceBase {
    constructor(endpointPath) {
        this.api = ApiClient.getInstance();
        this.url = this.baseUrl + endpointPath;
        this.defaultConfig = {};
    }
    get baseUrl() {
        return process.env["BASEURL"] ?? "";
    }
    // This is an example of how to authenticate to an API with basic auth.
    // TODO: Add authentication logic for the API you are testing
    async authenticate() {
        const username = process.env["USER"];
        const password = process.env["PASSWORD"];
        if (!username || !password) {
            throw new Error("Missing username or password in environment variables.");
        }
        const cachedToken = SessionManager.getCachedToken(username, password);
        if (cachedToken) {
            this.defaultConfig = {
                headers: { Cookie: "token=" + cachedToken },
            };
            return;
        }
        const credentials = {
            username,
            password,
        };
        const response = await this.post(`${this.baseUrl}/auth`, credentials);
        SessionManager.storeToken(username, password, response.data.token);
        this.defaultConfig = {
            headers: { Cookie: "token=" + response.data.token },
        };
    }
    async get(url, config = this.defaultConfig) {
        const startTime = Date.now();
        const response = await this.api.client.get(url, config);
        const endTime = Date.now();
        const customResponse = this.buildResponse(endTime, startTime, response);
        return customResponse;
    }
    async post(url, data, config = this.defaultConfig) {
        const startTime = Date.now();
        const response = await this.api.client.post(url, data, config);
        const endTime = Date.now();
        const customResponse = this.buildResponse(endTime, startTime, response);
        return customResponse;
    }
    async put(url, data, config = this.defaultConfig) {
        const startTime = Date.now();
        const response = await this.api.client.put(url, data, config);
        const endTime = Date.now();
        const customResponse = this.buildResponse(endTime, startTime, response);
        return customResponse;
    }
    async patch(url, data, config = this.defaultConfig) {
        const startTime = Date.now();
        const response = await this.api.client.patch(url, data, config);
        const endTime = Date.now();
        const customResponse = this.buildResponse(endTime, startTime, response);
        return customResponse;
    }
    async delete(url, config = this.defaultConfig) {
        const startTime = Date.now();
        const response = await this.api.client.delete(url, config);
        const endTime = Date.now();
        const customResponse = this.buildResponse(endTime, startTime, response);
        return customResponse;
    }
    async head(url, config = this.defaultConfig) {
        const startTime = Date.now();
        const response = await this.api.client.head(url, config);
        const endTime = Date.now();
        const customResponse = this.buildResponse(endTime, startTime, response);
        return customResponse;
    }
    async options(url, config = this.defaultConfig) {
        const startTime = Date.now();
        const response = await this.api.client.options(url, config);
        const endTime = Date.now();
        const customResponse = this.buildResponse(endTime, startTime, response);
        return customResponse;
    }
    buildResponse(endTime, startTime, response) {
        const responseTime = endTime - startTime;
        const customResponse = {
            data: response.data,
            status: response.status,
            headers: response.headers,
            responseTime: responseTime,
        };
        return customResponse;
    }
}
