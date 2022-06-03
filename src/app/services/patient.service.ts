import { Inject, Injectable } from '@angular/core';
import { API_TOKEN } from '../shared/tokens';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Patient } from '../models/user-models';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(
    @Inject(API_TOKEN) private baseUrl: string,
    private httpClient: HttpClient
  ) {}
  url = `${this.baseUrl}/member`;

  // /api/v1/member/
  getPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${this.url}/`);
  }
  // /api/v1/member/{entityNo}
  getPatientByEntity(entityNo: number): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.url}/${entityNo}`);
  }
  // /api/v1/member/search
  searchPatientByName(
    firstName?: string,
    lastName?: string
  ): Observable<Patient[]> {
    let params = new HttpParams();
    if (firstName) {
      params = params.set('firstName', firstName);
    }

    if (lastName) {
      params = params.set('lastName', lastName);
    }
    if (!firstName && !lastName)
      return this.httpClient.get<Patient[]>(`${this.url}/`);
    return this.httpClient.get<Patient[]>(`${this.url}/search`, { params });
  }
}
