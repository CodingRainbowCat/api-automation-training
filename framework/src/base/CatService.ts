import "dotenv/config";
import { ServiceBase } from "./ServiceBase.js";
import { Response } from "../models/responses/Response.js";
import { Cat } from "../models/Cat.js";

export class CatService extends ServiceBase {
  private static classInstance?: CatService;

  public constructor() {
    super("");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new CatService();
    }

    return this.classInstance;
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
