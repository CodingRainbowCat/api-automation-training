import "dotenv/config";
import { ServiceBase } from "./ServiceBase.js";
import { Response } from "../models/responses/Response.js";
import { Staff } from "../models/Staff.js";

export class StaffService extends ServiceBase {
  private static classInstance?: StaffService;

  public constructor() {
    super("/staff");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new StaffService();
    }

    return this.classInstance;
  }

  async getAllStaff(config = this.defaultConfig): Promise<Response<Staff[]>> {
    return await this.get<Staff[]>(`${this.url}`, config);
  }

  async getStaff(id: number | any, config = this.defaultConfig): Promise<Response<Staff>> {
    return await this.get<Staff>(`${this.url}/${id}`, config);
  }

  async postStaff(staff: Staff | any, config = this.defaultConfig): Promise<Response<Staff>> {
    return await this.post<Staff>(`${this.url}`, staff, config);
  }

  async deleteStaff(id: number | any, config = this.defaultConfig): Promise<Response<Staff>> {
    return await this.delete<Staff>(`${this.url}/${id}`, config);
  }

}
