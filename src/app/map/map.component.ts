import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../_services/marker.service';
import { DataApiService } from '../_services/data-api.service';
import { Estados } from '../models/estados';
import { Municipios } from '../models/municipios';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;

  selectedEstado;
  selectedMunicipio;
  selectedUnidad;

  arrEstados=[];
  arrMunicipios=[];
  arrActividades=[];

  constructor(private markerService: MarkerService,private dataApiService:DataApiService) { }

  ngAfterViewInit(): void {
    this.initMap();
    //this.markerService.makeCapitalMarkers(this.map);
    this.getEstados();
    this.getUnidades();
    this.buscarDenues();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tiles.addTo(this.map);
  }

  private getEstados(){
    this.dataApiService.getEstados().subscribe((estados:any)=>{
      this.arrEstados=estados;
    })
  }

  private changeEstado(){
    this.dataApiService.getMunicipios(this.selectedEstado).subscribe((municipios:any)=>{
      this.arrMunicipios=municipios;
    });
  }

  private getUnidades(){
    this.dataApiService.getUnidades().subscribe((unidades:any)=>{
      this.arrActividades=unidades;
    });
  }
  private buscarDenues(){
    this.markerService.makeDenuesMarkers(this.map,this.selectedEstado,this.selectedMunicipio,this.selectedUnidad);
  }
}