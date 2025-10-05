import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Loader } from '@googlemaps/js-api-loader';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  @ViewChild(GoogleMap) mapComponent!: GoogleMap;

  private map!: google.maps.Map;
  private markers: google.maps.Marker[] = [];

  showFilters = true;
  cidadePesquisada = '';
  loading = false;

  // 🌎 Mantém o foco nos EUA
  center: google.maps.LatLngLiteral = { lat: 37.0902, lng: -95.7129 };
  zoom = 4;

  private readonly GOOGLE_API_KEY = 'AIzaSyDPtqWXc1hKQE-zDoxIQ2sKC42R-H2A0II';
  private readonly AQICN_TOKEN = 'c0b4595f744359cb7d397a3da7bcc9acea41917a';
  // private readonly AQICN_TOKEN = '4rfrgrgtggtg';

  constructor(private zone: NgZone,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    await this.initMap();
  }

  /** 🗺️ Inicializa o mapa */
  private async initMap() {
    const loader = new Loader({
      apiKey: this.GOOGLE_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });

    await loader.load();

    const mapElement = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapElement, {
      center: this.center,
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true, // mantém o zoom se quiser
      rotateControl: false, // 🚫 tira os botões de rotação 3D
      tilt: 0, // 🔥 força o mapa a ficar plano
    });

    // Carrega estações ao inicializar
    this.map.addListener('idle', () =>
      this.zone.run(() => this.carregarEstacoesVisiveis())
    );
    await this.carregarEstacoesVisiveis();
  }

  /** 🔍 Busca cidade e centraliza o mapa */
  async buscarCidade() {
    if (!this.cidadePesquisada.trim()) return;
    this.loading = true;

    try {
      const geoRes = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          this.cidadePesquisada
        )}&key=${this.GOOGLE_API_KEY}`
      );
      const geoData = await geoRes.json();

      if (geoData.status !== 'OK' || !geoData.results.length) {
        alert('Cidade não encontrada!');
        return;
      }

      const location = geoData.results[0].geometry.location;
      this.center = { lat: location.lat, lng: location.lng };
      this.map.setCenter(this.center);
      this.map.setZoom(8);

      await this.carregarEstacoesVisiveis();
    } catch (err) {
      console.error('Erro ao buscar cidade:', err);
      alert('Falha ao buscar cidade.');
    } finally {
      this.loading = false;
    }
  }

  /** 🌫️ Carrega estações AQI visíveis no mapa */
  private async carregarEstacoesVisiveis() {
    if (!this.map) return;

    const bounds = this.map.getBounds();
    if (!bounds) return;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const url = `https://api.waqi.info/map/bounds/?token=${
      this.AQICN_TOKEN
    }&latlng=${sw.lat()},${sw.lng()},${ne.lat()},${ne.lng()}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.status !== 'ok' || !data.data.length) return;

      // Limpa marcadores antigos
      this.markers.forEach((m) => m.setMap(null));
      this.markers = [];

      data.data.forEach((station: any) => {
        const aqi = Number(station.aqi);
        if (isNaN(aqi) || aqi <= 0) return;

        const color = this.getAQIColor(aqi);

        const marker = new google.maps.Marker({
          position: { lat: station.lat, lng: station.lon },
          map: this.map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 15,
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 1,
          },
          label: {
            text: `${aqi}`,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '13px',
          },
          title: `AQI: ${aqi}`,
        });

        this.markers.push(marker);
      });
    } catch (err) {
      console.error('Erro ao carregar AQI:', err);
    }
  }

  /** 🎨 Cores do AQI */
  private getAQIColor(aqi: number): string {
    if (aqi <= 50) return '#009966';
    if (aqi <= 100) return '#FFDE33';
    if (aqi <= 150) return '#FF9933';
    if (aqi <= 200) return '#CC0033';
    if (aqi <= 300) return '#660099';
    return '#7E0023';
  }

  abrirRegisterModal() {
    this.modalService.open(RegisterComponent, {
      centered: true,
      size: 'md',
    });
  }
}
