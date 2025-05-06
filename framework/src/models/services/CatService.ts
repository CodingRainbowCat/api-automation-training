import "dotenv/config";
import { ServiceBase } from "../../base/ServiceBase.js";
import { Response } from "../responses/Response.js";
import { Cat } from "../Cat.js";

export class CatService extends ServiceBase {

  public constructor() {
    super("");
  }

  async getCat(id: number | any, config = this.defaultConfig): Promise<Response<Cat>> {
    return await this.get<Cat>(`${this.url}/cats/${id}`, config);
  }

  async postCat(cat: Cat | any, config = this.defaultConfig): Promise<Response<Cat>> {
    return await this.post<Cat>(`${this.url}/cats`, cat, config);
  }

  async deleteCat(id: number | any, config = this.defaultConfig): Promise<Response<Cat>> {
    return await this.delete<Cat>(`${this.url}/cats/${id}`, config);
  }

  async getAllCats(config = this.defaultConfig): Promise<Response<Cat[]>> {
    return await this.get<Cat[]>(`${this.url}/cats`, config);
  }

  async updateCatStaffOrAdopt(id: number | any, data: Partial<Cat>, config = this.defaultConfig): Promise<Response<Cat>> {
    return await this.patch<Cat>(`${this.url}/cats/${id}`, data, config);
  }

  async updateCat(id: number | any, cat: Cat | any, config = this.defaultConfig): Promise<Response<Cat>> {
    return await this.put<Cat>(`${this.url}/cats/${id}`, cat, config);
  }
}
