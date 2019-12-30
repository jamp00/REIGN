import { Component, OnInit, ViewChild, ViewRef, ViewContainerRef } from '@angular/core';

import { ArticulosService } from '../../services/articulos.service';
import { Articulo } from '../../models/Articulo';
import { MatExpansionModule, MatAccordion } from '@angular/material';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulos: Articulo[] = [];
  @ViewChild('acordion', {static: false}) public acordion : MatAccordion;

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

  ngAfterViewInit() {
    console.log(this.acordion);
    // this returns null
}

  Eliminar(obj){
    var id = obj._id;
    alert("Algo hace: " +id );
    this.articuloService.updateStateArticulo( id )
      .subscribe(
        articulo => {
          console.log("Articulo id: " +id+ ", actualizado")
        },
        err => console.log(err)
      )

      console.log(this.acordion.hideToggle);

/*
      const selectedRow: number = this.grid.getSelectedRowIndexes()[0];
      if (this.grid.getSelectedRowIndexes().length) {
          (this.grid.dataSource as object[]).splice(selectedRow, 1);
      } else {
          alert('No records selected for delete operation');
      }
      this.grid.refresh();
*/
  }

}


