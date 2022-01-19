import { Component } from '@angular/core';

interface MenuItems {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li{
        cursor:pointer;
      }
    `
  ]
})
export class MenuComponent {
  menuItems: MenuItems[] = [
    {
      ruta: '/mapas/fullscreen',
      nombre: 'FullScreen'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'marcadores'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'propiedades'
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'Zoom Range'
    }
  ]
}
