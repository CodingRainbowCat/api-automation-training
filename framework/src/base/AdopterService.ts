import "dotenv/config";
import { ServiceBase } from "./ServiceBase.js";
import { Response } from "../models/responses/Response.js";
import { Adopter } from "../models/Adopter.js";

export class AdopterService extends ServiceBase {
  private static classInstance?: AdopterService;

  public constructor() {
    super("");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AdopterService();
    }

    return this.classInstance;
  }

  async getAdopter(id: number | any, config = this.defaultConfig): Promise<Response<Adopter>> {
    return await this.get<Adopter>(`${this.url}/adopters/${id}`, config);
  }

  async getAllAdopters(config = this.defaultConfig): Promise<Response<Adopter[]>> {
    return await this.get<Adopter[]>(`${this.url}/adopters`, config);
  }

  async postAdopter(adopter: Adopter | any, config = this.defaultConfig): Promise<Response<Adopter>> {
    return await this.post<Adopter>(`${this.url}/adopters`, adopter, config);
  }

  async deleteAdopter(id: number | any, config = this.defaultConfig): Promise<Response<Adopter>> {
    return await this.delete<Adopter>(`${this.url}/adopters/${id}`, config);
  }
}