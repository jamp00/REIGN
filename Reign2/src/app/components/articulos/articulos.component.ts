import { Component, OnInit } from '@angular/core';

import { ArticulosService } from '../../services/articulos.service';
import { Articulo } from '../../models/Articulo';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = [];
  constructor( public articuloService : ArticulosService ) { }

  ngOnInit() {
    this.articuloService.getArticulos()
      .subscribe(
        articulo => {
          console.log(articulo)
          this.articulos = articulo;
        },
        err => console.log(err)
      )
  }

}
