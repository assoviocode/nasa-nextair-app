import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const SERVICE_URL = environment.api + '/setupsEnvioWhats';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  register(nome: string, numeroWhats: number) {
    const payload = {
      nome,
      numero: numeroWhats,
    };
    return this.httpClient.post<any>(`${SERVICE_URL}/hackathonNasa`, payload);
  }
}
