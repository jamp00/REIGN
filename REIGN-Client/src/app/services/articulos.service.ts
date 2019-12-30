import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Articulo } from '../models/Articulo';


@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor( public http: HttpClient ) { }

  getArticulos(){
    return this.http.get<Articulo[]>('http://localhost:3000/articles/estado');
  }

  updateStateArticulo(id){
    return this.http.get('http://localhost:3000/articles/estado/' +id);
  }

}
