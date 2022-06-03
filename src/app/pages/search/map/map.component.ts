import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
interface Position {
  lat: number;
  lng: number;
}
let markers: google.maps.Marker[] = [];
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  private _map: google.maps.Map | undefined;
  @Input() set setMarkers(value: number | undefined | null) {
    this.deleteMarkers();
    if (value) {
      for (let i = 0; i < value; i++) {
        const lat = Math.random() * (41.916667 - 41.316667) + 41.316667;
        const lng = Math.random() * (44.983333 - 44.383333) + 44.383333;

        this.addMarker({
          lat,
          lng,
        });
      }
    }
  }
  constructor() {}

  ngOnInit() {
    this.addMap();
  }

  addMap() {
    let loader = new Loader({
      apiKey: 'AIzaSyCFhZlmhDj3u1SqK67ZD8eDMb_9zIRg7Wg',
    });
    loader.load().then(() => {
      const myLatLng = new google.maps.LatLng(41.716667, 44.783333);

      this._map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: myLatLng,
          zoom: 7,
        }
      );
    });
  }
  addMarker(position: Position) {
    const marker = new google.maps.Marker({
      position,
      map: this._map,
    });
    markers.push(marker);
  }
  setMapOnAll(map: google.maps.Map | null) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
  hideMarkers() {
    this.setMapOnAll(null);
  }
  deleteMarkers(): void {
    this.hideMarkers();
    markers = [];
  }
  showMarkers(): void {
    this.setMapOnAll(this._map as google.maps.Map);
  }
}
