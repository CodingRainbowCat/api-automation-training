import axios from "axios";
import "dotenv/config";
export class ApiClientBase {
    constructor() {
        this.client = axios;
        axios.defaults.headers.common = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        axios.defaults.validateStatus = () => true;
    }
}
