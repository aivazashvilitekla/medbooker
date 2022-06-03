import { Inject, Injectable } from '@angular/core';
import { API_TOKEN } from '../shared/tokens';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Doctor } from '../models/user-models';
import { AttendType, Booking } from '../models';
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(
    @Inject(API_TOKEN) private baseUrl: string,
    private httpClient: HttpClient
  ) {}
  url = `${this.baseUrl}/practitioner`;

  // /api/v1/practitioner/
  getDoctors(): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(`${this.url}/`);
  }
  // /api/v1/practitioner/{entityNo}
  getDoctorByEntity(entityNo: number): Observable<Doctor> {
    return this.httpClient.get<Doctor>(`${this.url}/${entityNo}`);
  }
  // /api/v1/practitioner/search
  searchDoctorByName(
    firstName?: string,
    lastName?: string
  ): Observable<Doctor[]> {
    let params = new HttpParams();
    if (firstName) {
      params = params.set('firstName', firstName);
    }
    if (lastName) {
      params = params.set('lastName', lastName);
    }
    if (!firstName && !lastName)
      return this.httpClient.get<Doctor[]>(`${this.url}/`);

    return this.httpClient.get<Doctor[]>(`${this.url}/search`, { params });
  }
}
