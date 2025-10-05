import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AirQualityService {
  // getAQIByCity(cidade: string): Observable<any> {
  //   const dados: Record<string, { aqi: number; nivel: string; coords: number[] }> = {
  //     'São Paulo': { aqi: 115, nivel: 'Não é saudável', coords: [-46.63, -23.55] },
  //     'Rio de Janeiro': { aqi: 55, nivel: 'Mau', coords: [-43.2, -22.9] },
  //     'Botucatu': { aqi: 35, nivel: 'Razoável', coords: [-48.45, -22.89] },
  //   };
  //   return of(dados[cidade] || { aqi: 20, nivel: 'Razoável', coords: [-46.63, -23.55] });
  // }
}
