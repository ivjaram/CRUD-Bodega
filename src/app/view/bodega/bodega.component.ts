import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interface/Producto';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {

  constructor() { }
 /*  @Input() producto:Producto []= {
    descripcion: String,
    precio: Number,
    cantidad: Number
  } */
  ngOnInit(): void {
  }

}
