import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ICategory } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly BASE_URL: string = `${environment.api}/category/`;

  constructor(private _http: HttpClient) {}

  public list(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(this.BASE_URL);
  }
}
