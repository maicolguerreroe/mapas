import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container{
        height:100%;
        width:100%;
      }

      .row{
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left:50px;
        padding: 10px;
        position: fixed;
        width:400px;
        z-index:999;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-79.88017703482014, -2.1380069803534734];

  constructor() {
    console.log('constructor', this.divMapa);
  }
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { });
    this.mapa.off('zoomend', () => { });
    this.mapa.off('move', () => { });
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    //movimiento del mapa
    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    })
  }

  zoomIn() {
    this.mapa.zoomIn();
  }
  zoomOut() {
    this.mapa.zoomOut();
  }
  zoomCambio(valor: string) {
    this.mapa.setZoom(parseInt(valor));
  }
}
