import { Component, OnInit } from '@angular/core';
import 'leaflet';
import * as shp from 'shpjs';
declare let L;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	ngOnInit() {
		const m = L.map('map').setView([34.74161249883172, 18.6328125], 2);
      	const geo = L.geoJson({features: []}, { onEachFeature: function popUp(f, l) {
			const out = [];
			if (f.properties) {
				for (const key of Object.keys(f.properties)) {
					out.push(key + ' : ' + f.properties[key]);
				}
				l.bindPopup(out.join('<br />'));
			}
		}}).addTo(m);
		const base = 'assets/TM_WORLD_BORDERS_SIMPL-0.3.zip';
			shp(base).then(function(data) {
				geo.addData(data);
		});
	}
}
