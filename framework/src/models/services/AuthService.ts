import "dotenv/config";
import { ServiceBase } from "../../base/ServiceBase.js";
import { Response } from "../responses/Response.js";
import { CredentialsModel } from "../request/CredentialsModel.js";
import { SessionResponse } from "../responses/SessionResponse.js";
import { RegisterResponse } from "../responses/RegisterResponse.js";

export class AuthService extends ServiceBase {

  public constructor() {
    super("/auth");
  }

  async register(credentials: CredentialsModel | any, config = this.defaultConfig): Promise<Response<RegisterResponse>> {
    return await this.post<RegisterResponse>(`${this.url}/register`, credentials, config);
  }

  async logIn(credentials: CredentialsModel | any, config = this.defaultConfig): Promise<Response<SessionResponse>> {
    return await this.post<SessionResponse>(`${this.url}/logIn`, credentials, config);
  }

  async refresh(refreshToken: string | any, config = this.defaultConfig): Promise<Response<SessionResponse>> {
    return await this.post<SessionResponse>(`${this.url}/refresh`, refreshToken, config);
  }
}