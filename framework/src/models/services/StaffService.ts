import "dotenv/config";
import { ServiceBase } from "../../base/ServiceBase.js";
import { Response } from "../responses/Response.js";
import { Staff } from "../Staff.js";

export class StaffService extends ServiceBase {

  public constructor() {
    super("/staff");
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
