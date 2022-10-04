$(document).ready(function ()
{
	$('#resetme').click(function () {
		window.location.reload(false);
	});
});

var layers = {};

function set_marker(marker, daftar_path, judul, nama_wil, favico_desa)
{
	var daftar = JSON.parse(daftar_path);
	var jml = daftar.length;
	var jml_path;
	for (var x = 0; x < jml; x++)
	{
		if (daftar[x].path)
		{
			daftar[x].path = JSON.parse(daftar[x].path);
			jml_path = daftar[x].path[0].length;
			for (var y = 0; y < jml_path; y++)
			{
				daftar[x].path[0][y].reverse();
			}

			var label = L.tooltip({
				permanent: true,
				direction: 'center',
				className: 'text'
			}).setContent(judul + ' ' + daftar[x][nama_wil]);

			var point_style = {
				iconSize: [1, 1],
				iconAnchor: [0.5, 0.5],
				labelAnchor: [0.3, 0],
				iconUrl: favico_desa
			};

			var marker_style = {
				stroke: true,
				color: 'white',
				opacity: 1,
				weight: 3,
				fillColor: daftar[x].warna,
				fillOpacity: 0.8,
				dashArray: 4
			}

			daftar[x].path[0].push(daftar[x].path[0][0]);
			if (daftar[x].lng)
			{
				marker.push(turf.point([daftar[x].lng, daftar[x].lat], { content: label, style: L.icon(point_style) }));
			}
			marker.push(turf.polygon(daftar[x].path, { content: daftar[x][nama_wil], style: marker_style }));
		}
	}
}

function set_marker_multi(marker, daftar_path, judul, nama_wil, favico_desa) {
	var daftar = JSON.parse(daftar_path);
	var jml = daftar.length;
	var jml_path;
	for (var x = 0; x < jml; x++) {
		if (daftar[x].path) {
			daftar[x].path = JSON.parse(daftar[x].path)
			var jml_path_x = daftar[x].path.length;
			for (var a = 0; a < jml_path_x; a++) {
				for (var b = 0; b < daftar[x].path[a].length; b++) {
					jml_path = daftar[x].path[a][0].length;
					for (var z = 0; z < jml_path; z++) {
						daftar[x].path[a][0][z].reverse();
					}

					var label = L.tooltip({
						permanent: true,
						direction: 'center',
						className: 'text',
					}).setContent(judul + ' ' + daftar[x][nama_wil]);

					var point_style = {
						iconSize: [1, 1],
						iconAnchor: [0.5, 0.5],
						labelAnchor: [0.3, 0],
						iconUrl: favico_desa
					};

					var marker_style = {
						stroke: true,
						color: 'white',
						opacity: 1,
						weight: 3,
						fillColor: daftar[x].warna,
						fillOpacity: 0.8,
						dashArray: 4
					}

					daftar[x].path[a][0].push(daftar[x].path[a][0][0]);

					if (daftar[x].lng) {
						marker.push(turf.point([daftar[x].lng, daftar[x].lat], { content: label, style: L.icon(point_style) }));
					}
					
					marker.push(turf.polygon(daftar[x].path[a], { content: daftar[x][nama_wil], style: marker_style }));
				}
			}
		}
	}
}

function set_marker_desa(marker_desa, desa, judul, favico_desa) {
	var daerah_desa = JSON.parse(desa['path']);
	var jml = daerah_desa.length;

	var style_polygon = {
		stroke: true,
		color: '#de2d26',
		opacity: 1,
		weight: 3,
		fillColor: desa['warna'],
		fillOpacity: 0.8,
		dashArray: 4
	};

	var point_style = stylePointLogo(favico_desa);
	if (desa['lng']) {
		marker_desa.push(turf.point([desa['lng'], desa['lat']], { content: desa, style: L.icon(point_style) }));
	}

	for (var x = 0; x < jml; x++) {
		for (var i = 0; i < daerah_desa[x][0].length; i++)  {
			daerah_desa[x][0][i].reverse();
		}
		daerah_desa[x][0].push(daerah_desa[x][0][0]);
		marker_desa.push(turf.polygon(daerah_desa[x], { content: desa, style: style_polygon }));
	}
}


function set_marker_desa_content(marker_desa, desa, judul, favico_desa, contents)
{
	var daerah_desa = JSON.parse(desa['path']);
	var jml = daerah_desa.length;
	content = $(contents).html();
	var style_polygon = {
		stroke: true,
		color: '#de2d26',
		opacity: 1,
		weight: 3,
		fillColor: desa['warna'],
		fillOpacity: 0.8,
		dashArray: 4
	};

	var point_style = stylePointLogo(favico_desa);
	if (desa['lng'])
	{
		marker_desa.push(turf.point([desa['lng'], desa['lat']], { name: "kantor_desa", content: "Kantor Desa", style: L.icon(point_style) }));
	}

	for (var x = 0; x < jml; x++)
	{
		for (var i = 0; i < daerah_desa[x][0].length; i++) 
		{
			daerah_desa[x][0][i].reverse();
		}
		daerah_desa[x][0].push(daerah_desa[x][0][0]);
		marker_desa.push(turf.polygon(daerah_desa[x], { content: content, style: style_polygon }));
	}
}

function set_marker_persil_content(marker, daftar_path, judul, nama_wil, contents, favico_desa)
{
	var daftar = (daftar_path == 'null') ? new Array() :JSON.parse(daftar_path);
	var jml = daftar.length;
	var jml_path;

	for (var x = 0; x < jml; x++)
	{
		if (daftar[x].path)
		{
			var data = daftar[x];
			daftar[x].path = JSON.parse(daftar[x].path)
			jml_path = daftar[x].path[0].length;
			for (var y = 0; y < jml_path; y++)
			{
				daftar[x].path[0][y].reverse();
			}

			content = `
				<div class="persil">
					<h4>Leter C-Desa </h4>
					<h4><b>Nomor ${data.nomor}</b> </h4> 
					<hr>
					<table>
						<tbody>
							<tr>
								<td>Nama Pemilik Tanah </td>
								<td> : </td>
								<td> ${data.nama_kepemilikan} </td>
							</tr>
							<tr>
								<td>Kelas Tanah</td>
								<td> : </td>
								<td> ${data.kode} </td>
							</tr>
							<tr>
								<td>Lokasi</td>
								<td> : </td>
								<td> ${data.alamat} </td>
							</tr>
					</tbody></table>
				</div>
			` ;
			var label = L.tooltip({
				permanent: true,
				direction: 'center',
				className: 'text',
			}).setContent(judul + ' ' + daftar[x][nama_wil]);

			var point_style = {
				iconSize: [1, 1],
				iconAnchor: [0.5, 0.5],
				labelAnchor: [0.3, 0],
				iconUrl: favico_desa
			};

			var marker_style = {
				stroke: true,
				color: 'blue',
				opacity: 1,
				weight: 3,
				fillColor: daftar[x].warna,
				fillOpacity: 0.8,
				dashArray: 4
			}
			daftar[x].path[0].push(daftar[x].path[0][0]);
			marker.push(turf.polygon(daftar[x].path, { name: judul, content: content, style: marker_style }));
		}
	}
}

function set_marker_content(marker, daftar_path, judul, nama_wil, contents, favico_desa)
{
	var daftar = JSON.parse(daftar_path);
	var jml = daftar.length;
	var jml_path;
	for (var x = 0; x < jml; x++)
	{
		if (daftar[x].path)
		{
			daftar[x].path = JSON.parse(daftar[x].path)
			jml_path = daftar[x].path[0].length;
			for (var y = 0; y < jml_path; y++)
			{
				daftar[x].path[0][y].reverse();
			}

			content = $(contents + x).html();
			var label = L.tooltip({
				permanent: true,
				direction: 'center',
				className: 'text',
			}).setContent(judul + ' ' + daftar[x][nama_wil]);

			var point_style = {
				iconSize: [1, 1],
				iconAnchor: [0.5, 0.5],
				labelAnchor: [0.3, 0],
				iconUrl: favico_desa
			};

			var marker_style = {
				stroke: true,
				color: 'white',
				opacity: 1,
				weight: 3,
				fillColor: daftar[x].warna,
				fillOpacity: 0.8,
				dashArray: 4
			}

			daftar[x].path[0].push(daftar[x].path[0][0]);
			if (daftar[x].lng)
			{
				marker.push(turf.point([daftar[x].lng, daftar[x].lat], { content: label, style: L.icon(point_style) }));
			}
			marker.push(turf.polygon(daftar[x].path, { name: judul, content: content, style: marker_style }));
		}
	}
}

function set_marker_multi_content(marker, daftar_path, judul, nama_wil, contents, favico_desa)
{
	var daftar = JSON.parse(daftar_path);
	var jml = daftar.length;
	var jml_path;
	for (var x = 0; x < jml; x++)
	{
		if (daftar[x].path)
		{
			daftar[x].path = JSON.parse(daftar[x].path)
			var jml_path_x = daftar[x].path.length;
			for (var a = 0; a < jml_path_x; a++)
			{
				for (var b = 0; b < daftar[x].path[a].length; b++) 
				{
					jml_path = daftar[x].path[a][0].length;
					for (var z = 0; z < jml_path; z++)
					{
						daftar[x].path[a][0][z].reverse();
					}

					content = $(contents + x).html();
					var label = L.tooltip({
						permanent: true,
						direction: 'center',
						className: 'text',
					}).setContent(judul + ' ' + daftar[x][nama_wil]);

					var point_style = {
						iconSize: [1, 1],
						iconAnchor: [0.5, 0.5],
						labelAnchor: [0.3, 0],
						iconUrl: favico_desa
					};

					var marker_style = {
						stroke: true,
						color: 'white',
						opacity: 1,
						weight: 3,
						fillColor: daftar[x].warna,
						fillOpacity: 0.8,
						dashArray: 4
					}

					daftar[x].path[a][0].push(daftar[x].path[a][0][0]);

					if (daftar[x].lng)
					{
						marker.push(turf.point([daftar[x].lng, daftar[x].lat], {content: label, style: L.icon(point_style)}));
					}
					marker.push(turf.polygon(daftar[x].path[a], { name: judul, content: content, style: marker_style }));
				}
			}
		}
	}
}

function getBaseLayers(peta, access_token)
{
	//Menampilkan BaseLayers Peta
	var defaultLayer = L.tileLayer.provider('OpenStreetMap.Mapnik', { attribution: '<a href="https://openstreetmap.org/copyright">© OpenStreetMap</a> | <a href="https://github.com/OpenSID/OpenSID">OpenSID</a>' }).addTo(peta);

	if (access_token)
	{
		mbGLstr = L.mapboxGL({
			accessToken: access_token,
			style: 'mapbox://styles/mapbox/streets-v11',
			attribution: '<a href="https://www.mapbox.com/about/maps">© Mapbox</a> | <a href="https://github.com/OpenSID/OpenSID">OpenSID</a>',
		});

		mbGLsat = L.mapboxGL({
			accessToken: access_token,
			style: 'mapbox://styles/mapbox/satellite-v9',
			attribution: '<a href="https://www.mapbox.com/about/maps">© Mapbox</a> | <a href="https://github.com/OpenSID/OpenSID">OpenSID</a>',
		});

		mbGLstrsat = L.mapboxGL({
			accessToken: access_token,
			style: 'mapbox://styles/mapbox/satellite-streets-v11',
			attribution: '<a href="https://www.mapbox.com/about/maps">© Mapbox</a> | <a href="https://github.com/OpenSID/OpenSID">OpenSID</a>',
		});

	}
	else
	{
		mbGLstr = L.tileLayer.provider('OpenStreetMap.Mapnik', { attribution: '<a href="https://openstreetmap.org/copyright">© OpenStreetMap</a> | <a href="https://github.com/OpenSID/OpenSID">OpenSID</a>' }).addTo(peta);
		mbGLsat = L.tileLayer.provider('OpenStreetMap.Mapnik', { attribution: '<a href="https://openstreetmap.org/copyright">© OpenStreetMap</a> | <a href="https://github.com/OpenSID/OpenSID">OpenSID</a>' }).addTo(peta);
		mbGLstrsat = L.tileLayer.provider('OpenStreetMap.Mapnik', { attribution: '<a href="https://openstreetmap.org/copyright">© OpenStreetMap</a> | <a href="https://github.com/OpenSID/OpenSID">OpenSID</a>' }).addTo(peta);
	}

	var baseLayers = {
		'OpenStreetMap': defaultLayer,
		'OpenStreetMap H.O.T.': L.tileLayer.provider('OpenStreetMap.HOT', { attribution: '<a href="https://openstreetmap.org/copyright">© OpenStreetMap</a> | <a href="https://github.com/OpenSID/OpenSID">OpenSID</a>' }),
		'Mapbox Streets': mbGLstr,
		'Mapbox Satellite': mbGLsat,
		'Mapbox Satellite-Street': mbGLstrsat
	};
	return baseLayers;
}

function wilayah_property(marker) {
	var wilayah_property = L.geoJSON(turf.featureCollection(marker), {
		pmIgnore: true,
		showMeasurements: false,
		measurementOptions: {
			showSegmentLength: false
		},
		onEachFeature: function (feature, layer) {
			if (feature.properties.name == 'kantor_desa') {
				// Beri classname berbeda, supaya bisa gunakan css berbeda
				layer.bindPopup(feature.properties.content, { 'className': 'kantor_desa' });
			} else {
				layer.bindPopup(feature.properties.content);
			}
			layer.bindTooltip(feature.properties.content, { sticky: true, direction: 'top' });(feature.properties.style)
		},
		style: function (feature) {
			if (feature.properties.style) {
				return feature.properties.style;
			}
		},
		pointToLayer: function (feature, latlng) {
			if (feature.properties.style) {
				return L.marker(latlng, { icon: feature.properties.style });
			} else {
				return L.marker(latlng);
			}
			
		}
	});

	return wilayah_property;
}

function overlayWil(marker_desa, marker_dusun, marker_rw, marker_rt, sebutan_desa, sebutan_dusun) {
	var poligon_wil_desa = wilayah_property(marker_desa);
	var poligon_wil_dusun = wilayah_property(marker_dusun);
	var poligon_wil_rw = wilayah_property(marker_rw);
	var poligon_wil_rt = wilayah_property(marker_rt);

	var peta_desa = 'Peta Wilayah ' + sebutan_desa;
	var peta_dusun = 'Peta Wilayah ' + sebutan_dusun;
	var overlayLayers = new Object;
	overlayLayers[peta_desa] = poligon_wil_desa;
	overlayLayers[peta_dusun] = poligon_wil_dusun;
	overlayLayers['Peta Wilayah RW'] = poligon_wil_rw;
	overlayLayers['Peta Wilayah RT'] = poligon_wil_rt;

	return overlayLayers;
}

function getLatLong(x, y) 
{
	var hasil;
	if (x == 'Rectangle' || x == 'Line' || x == 'Poly')
	{
		hasil = JSON.stringify(y._latlngs);
	}

	else if(x == 'multi'){	
		hasil = JSON.stringify(y);	
	}	
		else
	{
		hasil = JSON.stringify(y._latlng);
	}

	hasil = hasil
		.replace(/\}/g, ']')
		.replace(/(\{)/g, '[')
		.replace(/(\"lat\"\:|\"lng\"\:)/g, '')
		.replace(/(\"alt\"\:)/g, '')
		.replace(/(\"ele\"\:)/g, '');

	return hasil;
}

function stylePolygonDesa()
{
	var style_polygon = {
		stroke: true,
		color: '#de2d26',
		opacity: 1,
		weight: 3,
		fillColor: warna,
		fillOpacity: 0.5,
		dashArray: 4
	};
	return style_polygon;
}

function stylePointLogo(url)
{
	var style = {
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -28],
		iconUrl: url
	};
	return style;
}

function editToolbarPoly()
{
	var options = {
		position: 'topright', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
		drawMarker: false, // adds button to draw markers
		drawCircleMarker: false, // adds button to draw markers
		drawPolyline: false, // adds button to draw a polyline
		drawRectangle: false, // adds button to draw a rectangle
		drawPolygon: true, // adds button to draw a polygon
		drawCircle: false, // adds button to draw a cricle
		cutPolygon: false, // adds button to cut a hole in a polygon
		editMode: true, // adds button to toggle edit mode for all layers
		removalMode: true, // adds a button to remove layers
	};
	return options;
}

function editToolbarLine()
{
	var options = {
		position: 'topright', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
		drawMarker: false, // adds button to draw markers
		drawCircleMarker: false, // adds button to draw markers
		drawPolyline: true, // adds button to draw a polyline
		drawRectangle: false, // adds button to draw a rectangle
		drawPolygon: false, // adds button to draw a polygon
		drawCircle: false, // adds button to draw a cricle
		cutPolygon: false, // adds button to cut a hole in a polygon
		editMode: true, // adds button to toggle edit mode for all layers
		removalMode: true, // adds a button to remove layers
	};
	return options;
}

function styleGpx()
{
	var style = {
		color: 'red',
		opacity: 1.0,
		fillOpacity: 1.0,
		weight: 3,
		clickable: true
	};
	return style;
}

function eximGpxRegion(layerpeta, multi = false)
{
	L.Control.FileLayerLoad.LABEL = '<img class="icon-map" src="' + BASE_URL + 'assets/images/gpx.png" alt="file icon"/>';
	L.Control.FileLayerLoad.TITLE = 'Impor GPX/KML';
			
	controlGpxPoly = L.Control.fileLayerLoad({
		addToMap: true,
		formats: [
			'.gpx',
			'.kml'
		],
		fitBounds: true,
		layerOptions: {
			pointToLayer: function (data, latlng) {
				return L.marker(latlng);
			},

		}
	});
	controlGpxPoly.addTo(layerpeta);

	controlGpxPoly.loader.on('data:loaded', function (e) {
		var type = e.layerType;
		var layer = e.layer;
		var coords = [];
		var geojson = turf.flip(layer.toGeoJSON());
		var shape_for_db = JSON.stringify(geojson);
		var polygon = L.geoJson(JSON.parse(shape_for_db), {
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng);
			},
			onEachFeature: function (feature, layer) {
				coords.push(feature.geometry.coordinates);
			}
		}).addTo(layerpeta)

		var jml = coords[0].length;
		for (var x = 0; x < jml; x++) {
			if (coords[0][x].length > 2) {
				coords[0][x].pop();
			};
		}

		var path = get_path_import(coords, multi);

		if (multi == true) {
			coords = new Array(coords);
		}

		document.getElementById('path').value = path;
	});

	return controlGpxPoly;
}

function eximGpxPoint(layerpeta) {
	L.Control.FileLayerLoad.LABEL = '<img class="icon-map" src="' + BASE_URL + 'assets/images/gpx.png" alt="file icon"/>';
	L.Control.FileLayerLoad.TITLE = 'Impor GPX/KML';
	
	controlGpxPoint = L.Control.fileLayerLoad({
		addToMap: false,
		formats: [
			'.gpx',
			'.kml'
		],
		fitBounds: true,
		layerOptions: {
			pointToLayer: function (data, latlng) {
				return L.marker(latlng);
			},

		}
	});
	controlGpxPoint.addTo(layerpeta);

	controlGpxPoint.loader.on('data:loaded', function (e) {
		var type = e.layerType;
		var layer = e.layer;
		var coords = [];
		var geojson = layer.toGeoJSON();
		var shape_for_db = JSON.stringify(geojson);
		var polygon = L.geoJson(JSON.parse(shape_for_db), {
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng);
				},
				onEachFeature: function (feature, layer) {
					coords.push(feature.geometry.coordinates);
				}
			}).addTo(layerpeta)

		document.getElementById('lat').value = coords[0][1];
		document.getElementById('lng').value = coords[0][0];

	});

	return controlGpxPoint;
}

function eximShp(layerpeta, multi = false)
{
	L.Control.Shapefile = L.Control.extend({
		onAdd: function (map) {
			var thisControl = this;

			var controlDiv = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control leaflet-control-command');

			// Create the leaflet control.
			var controlUI = L.DomUtil.create('div', 'leaflet-control-command-interior', controlDiv);

			// Create the form inside of the leaflet control.
			var form = L.DomUtil.create('form', 'leaflet-control-command-form', controlUI);
			form.action = '';
			form.method = 'post';
			form.enctype = 'multipart/form-data';

			// Create the input file element.
			var input = L.DomUtil.create('input', 'leaflet-control-command-form-input', form);
			input.id = 'file';
			input.type = 'file';
			input.accept = '.zip';
			input.name = 'uploadFile';
			input.style.display = 'none';

			L.DomEvent
				.addListener(form, 'click', function () {
					document.getElementById("file").click();
				})
				.addListener(input, 'change', function () {
					var input = document.getElementById('file');
					if (!input.files[0])
					{
						alert("Pilih file shapefile dalam format .zip");
					}
					else
					{
						file = input.files[0];
						fr = new FileReader();
						fr.onload = receiveBinary;
						fr.readAsArrayBuffer(file);
					}

					function receiveBinary()
					{
						geojson = fr.result
						var shpfile = new L.Shapefile(geojson).addTo(map);

						shpfile.once('data:loaded', function (e) {

							var type = e.layerType;
							var layer = e.layer;
							var coords = [];
							var geojson = turf.flip(shpfile.toGeoJSON());
							var shape_for_db = JSON.stringify(geojson);

							var polygon = L.geoJson(JSON.parse(shape_for_db), {
									pointToLayer: function (feature, latlng) {
										return L.circleMarker(latlng, { style: style });
									},
									onEachFeature: function (feature, layer) {
										coords.push(feature.geometry.coordinates);
									},

								})

							var jml = coords[0].length;
							for (var x = 0; x < jml; x++) {
								if (coords[0][x].length > 2) {
									coords[0][x].pop();
								};
							}

							var path = get_path_import(coords, multi);
							
							if (multi == true) {
								coords = new Array(coords);
							}

							document.getElementById('path').value = path;	

							layerpeta.fitBounds(shpfile.getBounds());
						});
					}
				});

			controlUI.title = 'Impor Shapefile (.Zip)';
			
			return controlDiv;
		},
	});

	L.control.shapefile = function (opts)	{
		return new L.Control.Shapefile(opts);
	};

	L.control.shapefile({ position: 'topleft' }).addTo(layerpeta);

	return eximShp;
}

function geoLocation(layerpeta)
{
	var lc = L.control.locate({
		drawCircle: false,
		icon: 'fa fa-map-marker',
		locateOptions: { enableHighAccuracy: true },
		strings: {
			title: "Lokasi Saya",
			popup: "Anda berada di sekitar {distance} {unit} dari titik ini"
		}

	}).addTo(layerpeta);

	layerpeta.on('locationfound', function (e) {
		layerpeta.setView(e.latlng)
	});

	layerpeta.on('startfollowing', function () {
		layerpeta.on('dragstart', lc._stopFollowing, lc);
	}).on('stopfollowing', function () {
		layerpeta.off('dragstart', lc._stopFollowing, lc);
	});
	return lc;
}

function hapusPeta(layerpeta)
{
	layerpeta.on('pm:globalremovalmodetoggled', function (e) {
		document.getElementById('path').value = '';
	});
	return hapusPeta;
}

function hapuslayer(layerpeta)	
{	
	layerpeta.on('pm:remove', function (e) {	
		var type = e.layerType;	
		var layer = e.layer;	
		var latLngs;	
		
		// set value setelah create polygon	
		var last_path =  document.getElementById('path').value;	
		var new_path = getLatLong('Poly', layer).toString();	
		last_path = last_path.replace(new_path,'')	
			.replace(',,',',')	
			.replace('[,','[')	
			.replace(',]',']')	
		document.getElementById('path').value = last_path	
		document.getElementById('zoom').value = layerpeta.getZoom();	
	});	

	return hapusPeta;	
}

function updateZoom(layerpeta)
{
	layerpeta.on('zoomend', function (e) {
		document.getElementById('zoom').value = layerpeta.getZoom();
	});
	return updateZoom;
}

function addPetaPoly(layerpeta)
{
	layerpeta.on('pm:create', function (e) {
		var type = e.layerType;
		var layer = e.layer;
		var latLngs;

		if (type === 'circle')
		{
			latLngs = layer.getLatLng();
		}
		else
			latLngs = layer.getLatLngs();

		var p = latLngs;
		var polygon = L.polygon(p, { color: '#A9AAAA', weight: 4, opacity: 1, showMeasurements: true, measurementOptions: { showSegmentLength: false } })
			.addTo(layerpeta)

		polygon.on('pm:edit', function (e) {
			document.getElementById('path').value = getLatLong('Poly', e.target).toString();
			document.getElementById('zoom').value = layerpeta.getZoom();
		});

		layerpeta.fitBounds(polygon.getBounds());

		// set value setelah create polygon
		document.getElementById('path').value = getLatLong('Poly', layer).toString();
		document.getElementById('zoom').value = layerpeta.getZoom();
	});
	return addPetaPoly;
}

function addPetaLine(layerpeta, jenis, tebal, warna)
{
	var jenis = jenis ?? 'solid';
	var tebal = tebal ?? 1;
	var warna = warna ?? '#A9AAAA';

	layerpeta.on('pm:create', function (e) {
		var type = e.layerType;
		var layer = e.layer;
		var latLngs;

		if (type === 'circle')
		{
			latLngs = layer.getLatLng();
		}
		else
			latLngs = layer.getLatLngs();

		var p = latLngs;
		var polygon = L.polyline(p, {
			color: warna, weight: tebal, opacity: 1, dashArray: jenis_garis(jenis), showMeasurements: true, measurementOptions: { showSegmentLength: false }
		}).addTo(layerpeta)

		polygon.on('pm:edit', function (e) {
			document.getElementById('path').value = getLatLong('Line', e.target).toString();
		});

		layerpeta.fitBounds(polygon.getBounds());

		// set value setelah create polygon
		document.getElementById('path').value = getLatLong('Line', layer).toString();
	});
	return addPetaLine;
}

function old_value(id_path) {
	return layers[id_path]
}

function addPetaMultipoly(layerpeta)	
{	
	
	layerpeta.on('pm:create', function (e) 	
	{	
		var type = e.layerType;	
		var layer = e.layer;	
		var latLngs;	
	
		// set value setelah create polygon	
		if (document.getElementById('path').value == '') {document.getElementById('path').value = '[]'}

		var last_path =  JSON.parse(document.getElementById('path').value);	
		var new_path = JSON.parse(getLatLong('Poly', layer).toString());	
		last_path.push(new_path) // gabungkan value lama dengan yang baru	

		e.layer.on('pm:edit', function (f) {	
			var id_path = f.target._leaflet_id;
			var _path = new Array();

			for (i in layerpeta._layers)
			{
				if (layerpeta._layers[i]._path != undefined && layers[i])
				{
					try
					{
						_path.push(layerpeta._layers[i]._latlngs);
					}
					catch (e)
					{
						alert("problem with " + e + layerpeta._layers[i]);
					}
				}
			}
			
			var new_path = getLatLong('multi', _path).toString();	
			document.getElementById('path').value= new_path; 
			document.getElementById('zoom').value = layerpeta.getZoom();	 
		})	
		layers [e.layer._leaflet_id] = last_path[0]
		
		document.getElementById('path').value = JSON.stringify(last_path)	
		document.getElementById('zoom').value = layerpeta.getZoom();	
	});	
	return addPetaPoly;	
}

function showCurrentPolygon(wilayah, layerpeta, warna) {
	var daerah_wilayah = wilayah;
	daerah_wilayah[0].push(daerah_wilayah[0][0]);
	var poligon_wilayah = L.polygon(wilayah, {
		showMeasurements: true,
		measurementOptions: { showSegmentLength: false }
	})
		.addTo(layerpeta)

	poligon_wilayah.on('pm:edit', function (e) {
		document.getElementById('path').value = getLatLong('Poly', e.target).toString();
		document.getElementById('zoom').value = layerpeta.getZoom();
	})

	var layer = poligon_wilayah;
	var geojson = layer.toGeoJSON();
	var shape_for_db = JSON.stringify(geojson);
	var gpxData = togpx(JSON.parse(shape_for_db));

	$("#exportGPX").on('click', function (event) {
		data = 'data:text/xml;charset=utf-8,' + encodeURIComponent(gpxData);
		$(this).attr({
			'href': data,
			'target': '_blank'
		});
	});

	layerpeta.fitBounds(poligon_wilayah.getBounds());

	// set value setelah create polygon
	document.getElementById('path').value = getLatLong('Poly', layer).toString();
	document.getElementById('zoom').value = layerpeta.getZoom();

	return showCurrentPolygon;
}

function showCurrentMultiPolygon(wilayah, layerpeta, warna) {	
	var area_wilayah = JSON.parse(JSON.stringify(wilayah));	
	var bounds = new Array()

	var path  = new Array();	
	for (var i = 0; i < wilayah.length; i++) {	
		var daerah_wilayah = area_wilayah[i];	
		daerah_wilayah[0].push(daerah_wilayah[0][0]);	
		var poligon_wilayah = L.polygon(daerah_wilayah, {	
			showMeasurements: true,	
			measurementOptions: { showSegmentLength: false }	
		}).addTo(layerpeta)	
		layers [poligon_wilayah._leaflet_id] = wilayah[i]	
		poligon_wilayah.on('pm:edit', function (e) {	
			var old_path = getLatLong('Poly', {_latlngs:layers[e.target._leaflet_id]}).toString();	
			var new_path = getLatLong('Poly', e.target).toString();	
			var value_path = document.getElementById('path').value; //ambil value pada input	
				
			document.getElementById('path').value = value_path.replace(old_path,new_path)	
			document.getElementById('zoom').value = layerpeta.getZoom();	
			layers[e.target._leaflet_id] =  JSON.parse(JSON.stringify(e.target._latlngs)); // update value layers	
		})	
		var layer = poligon_wilayah;	
		var geojson = layer.toGeoJSON();	
		var shape_for_db = JSON.stringify(geojson);	
		var gpxData = togpx(JSON.parse(shape_for_db));

		$("#exportGPX").on('click', function (event) {	
			data = 'data:text/xml;charset=utf-8,' + encodeURIComponent(gpxData);	
			$(this).attr({	
				'href': data,	
				'target': '_blank'	
			});	
		});	

		bounds.push(poligon_wilayah.getBounds())
		// set value setelah create masing2 polygon	
		path.push(layer._latlngs);	
	}
	
	layerpeta.fitBounds(bounds);
	document.getElementById('path').value = getLatLong('multi', path).toString()	
	document.getElementById('zoom').value = layerpeta.getZoom();	
	return showCurrentPolygon;	
}

function showCurrentPoint(posisi1, layerpeta)
{
	var lokasi_kantor = L.marker(posisi1, { draggable: true }).addTo(layerpeta);
	lokasi_kantor.on('dragend', function (e) {
		$('#lat').val(e.target._latlng.lat);
		$('#lng').val(e.target._latlng.lng);
		$('#map_tipe').val("HYBRID");
		$('#zoom').val(layerpeta.getZoom());
	})

	layerpeta.on('zoomstart zoomend', function (e) {
		$('#zoom').val(layerpeta.getZoom());
	})

	$('#lat').on("input", function (e) {
		if (!$('#validasi1').valid())
		{
			$("#simpan_kantor").attr('disabled', true);
			return;
		} else {
			$("#simpan_kantor").attr('disabled', false);
		}
	})

	$('#lng').on("input", function (e) {
		if (!$('#validasi1').valid())
		{
			$("#simpan_kantor").attr('disabled', true);
			return;
		}
		else
		{
			$("#simpan_kantor").attr('disabled', false);
		}
	})

	var geojson = lokasi_kantor.toGeoJSON();
	var shape_for_db = JSON.stringify(geojson);
	var gpxData = togpx(JSON.parse(shape_for_db));

	$("#exportGPX").on('click', function (event) {
		data = 'data:text/xml;charset=utf-8,' + encodeURIComponent(gpxData);
		$(this).attr({
			'href': data,
			'target': '_blank'
		});
	});

	var lc = L.control.locate({
		drawCircle: false,
		icon: 'fa fa-map-marker',
		strings: {
			title: "Lokasi Saya",
			locateOptions: { enableHighAccuracy: true },
			popup: "Anda berada disekitar {distance} {unit} dari titik ini"
		}

	}).addTo(layerpeta);

	layerpeta.on('locationfound', function (e) {
		$('#lat').val(e.latlng.lat);
		$('#lng').val(e.latlng.lng);
		lokasi_kantor.setLatLng(e.latlng);
		layerpeta.setView(e.latlng)
	});

	layerpeta.on('startfollowing', function () {
		layerpeta.on('dragstart', lc._stopFollowing, lc);
	}).on('stopfollowing', function () {
		layerpeta.off('dragstart', lc._stopFollowing, lc);
	});

	return showCurrentPoint;
}

function showCurrentLine(wilayah, layerpeta, jenis, tebal, warna)
{
	var jenis = jenis ?? 'solid';
	var tebal = tebal ?? 1;
	var warna = warna ?? '#A9AAAA';

	var poligon_wilayah = L.polyline(wilayah, {
		color: warna, weight: tebal, opacity: 1, dashArray: jenis_garis(jenis), showMeasurements: true, measurementOptions: { showSegmentLength: false } 
	}).addTo(layerpeta)

	poligon_wilayah.on('pm:edit', function (e) {
		document.getElementById('path').value = getLatLong('Line', e.target).toString();
	})

	var layer = poligon_wilayah;
	var geojson = layer.toGeoJSON();
	var shape_for_db = JSON.stringify(geojson);
	var gpxData = togpx(JSON.parse(shape_for_db));

	$("#exportGPX").on('click', function (event) {
		data = 'data:text/xml;charset=utf-8,' + encodeURIComponent(gpxData);
		$(this).attr({
			'href': data,
			'target': '_blank'
		});
	});

	layerpeta.fitBounds(poligon_wilayah.getBounds());

	// set value setelah create polygon
	document.getElementById('path').value = getLatLong('Line', layer).toString();

	return showCurrentLine;
}

function showCurrentArea(wilayah, layerpeta)
{
	var daerah_wilayah = wilayah;
	daerah_wilayah[0].push(daerah_wilayah[0][0]);
	var poligon_wilayah = L.polygon(wilayah, { showMeasurements: true, measurementOptions: { showSegmentLength: false } })
		.addTo(layerpeta)

	poligon_wilayah.on('pm:edit', function (e) {
		document.getElementById('path').value = getLatLong('Poly', e.target).toString();
	})

	var layer = poligon_wilayah;
	var geojson = layer.toGeoJSON();
	var shape_for_db = JSON.stringify(geojson);
	var gpxData = togpx(JSON.parse(shape_for_db));

	$("#exportGPX").on('click', function (event) {
		data = 'data:text/xml;charset=utf-8,' + encodeURIComponent(gpxData);
		$(this).attr({
			'href': data,
			'target': '_blank'
		});
	});

	layerpeta.fitBounds(poligon_wilayah.getBounds());

	// set value setelah create polygon
	document.getElementById('path').value = getLatLong('Poly', layer).toString();

	return showCurrentArea;
}

function setMarkerCustom(marker, layercustom)
{
	if (marker.length != 0) {
		var geojson = L.geoJSON(turf.featureCollection(marker), {
			pmIgnore: true,
			showMeasurements: true,
			measurementOptions: { showSegmentLength: false },
			onEachFeature: function (feature, layer) {
				layer.bindPopup(feature.properties.content);
				layer.bindTooltip(feature.properties.content);
			},
			style: function (feature) {
				if (feature.properties.style)
				{
					return feature.properties.style;
				}
			},
			pointToLayer: function (feature, latlng) {
				if (feature.properties.style)
				{
					return L.marker(latlng, { icon: feature.properties.style });
				}
				else
					return L.marker(latlng);
			}
		});

		layercustom.addLayer(geojson);
	}

	return setMarkerCustom;
}

function setMarkerCluster(marker, markersList, markers)
{
	if (marker.length != 0)
	{
		var geojson = L.geoJSON(turf.featureCollection(marker), {
			pmIgnore: true,
			showMeasurements: true,
			measurementOptions: { showSegmentLength: false },
			onEachFeature: function (feature, layer) {
				layer.bindPopup(feature.properties.content);
				layer.bindTooltip(feature.properties.content);
			},
			style: function (feature) {
				if (feature.properties.style) {
					return feature.properties.style;
				}
			},
			pointToLayer: function (feature, latlng) {
				if (feature.properties.style) {
					return L.marker(latlng, { icon: feature.properties.style });
				}
				else
					return L.marker(latlng);
			}
		});

		markersList.push(geojson);
		markers.addLayer(geojson);
	}

	return setMarkerCluster;
}

function setMarkerClusterP(marker, markersListP, markersP)
{
	if (marker.length != 0)
	{
		var geojson = L.geoJSON(turf.featureCollection(marker), {
			pmIgnore: true,
			showMeasurements: true,
			measurementOptions: { showSegmentLength: false },
			onEachFeature: function (feature, layer) {
				layer.bindPopup(feature.properties.content);
				layer.bindTooltip(feature.properties.content);
			},
			style: function (feature) {
				if (feature.properties.style)
				{
					return feature.properties.style;
				}
			},
			pointToLayer: function (feature, latlng) {
				if (feature.properties.style)
				{
					return L.marker(latlng, { icon: feature.properties.style });
				}
				else
					return L.marker(latlng);
			}
		});

		markersListP.push(geojson);
		markersP.addLayer(geojson);
	}

	return setMarkerClusterP;
}

function set_marker_area(marker, daftar_path, foto_area) {
	var daftar = (daftar_path == 'null') ? new Array() :JSON.parse(daftar_path);
	var jml = daftar.length;
	var jml_path;
	var foto;
	var content_area;
	var lokasi_gambar = foto_area;

	for (var x = 0; x < jml; x++)
	{
		if (daftar[x].path)
		{
			daftar[x].path = JSON.parse(daftar[x].path)
			jml_path = daftar[x].path[0].length;
			for (var y = 0; y < jml_path; y++)
			{
				daftar[x].path[0][y].reverse()
			}

			if (daftar[x].foto)
			{
				foto = '<img src="' + lokasi_gambar + 'sedang_' + daftar[x].foto + '" style=" width:200px;height:140px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;border:2px solid #555555;"/>';
			}
			else
				foto = "";

			var area_style = {
				stroke: true,
				opacity: 1,
				weight: 3,
				fillColor: daftar[x].color,
				fillOpacity: 0.5
			}

			content_area =
				'<div id="content">' +
				'<div id="siteNotice">' +
				'</div>' +
				'<h4 id="firstHeading" class="firstHeading">' + daftar[x].nama + '</h4>' +
				'<div id="bodyContent">' + foto +
				'<p>' + daftar[x].desk + '</p>' +
				'</div>' +
				'</div>';

			daftar[x].path[0].push(daftar[x].path[0][0])
			marker.push(turf.polygon(daftar[x].path, { content: content_area, style: area_style }));
		}
	}
}

function set_marker_garis(marker, daftar_path, foto_garis) {
	var daftar = (daftar_path == 'null') ? new Array() :JSON.parse(daftar_path);
	var jml = daftar.length;
	var coords;
	var lengthOfCoords;
	var foto;
	var content_garis;
	var lokasi_gambar = foto_garis;

	for (var x = 0; x < jml; x++)
	{
		if (daftar[x].path)
		{
			daftar[x].path = JSON.parse(daftar[x].path)
			coords = daftar[x].path;
			lengthOfCoords = coords.length;
			for (i = 0; i < lengthOfCoords; i++)
			{
				holdLon = coords[i][0];
				coords[i][0] = coords[i][1];
				coords[i][1] = holdLon;
			}

			if (daftar[x].foto)
			{
				foto = '<img src="' + lokasi_gambar + 'sedang_' + daftar[x].foto + '" style=" width:200px;height:140px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;border:2px solid #555555;"/>';
			}
			else
				foto = "";

			content_garis =
				'<div id="content">' +
				'<div id="siteNotice">' +
				'</div>' +
				'<h4 id="firstHeading" class="firstHeading">' + daftar[x].nama + '</h4>' +
				'<div id="bodyContent">' + foto +
				'<p>' + daftar[x].desk + '</p>' +
				'</div>' +
				'</div>';

			var garis_style = {
				stroke: true,
				opacity: 1,
				weight: daftar[x].tebal,
				color: daftar[x].color,
				dashArray: jenis_garis(daftar[x].jenis_garis)
			}

			marker.push(turf.lineString(coords, { content: content_garis, style: garis_style }));
		}
	}
}

function set_marker_lokasi(marker, daftar_path, path_icon, foto_lokasi)
{
	var daftar = (daftar_path == 'null') ? new Array() :JSON.parse(daftar_path);
	var jml = daftar.length;
	var foto;
	var content_lokasi;
	var lokasi_gambar = foto_lokasi;
	var path_foto = path_icon;
	var point_style = {
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -28],
	};

	for (var x = 0; x < jml; x++)
	{
		if (daftar[x].lat)
		{
			point_style.iconUrl = path_foto + daftar[x].simbol;
			if (daftar[x].foto)
			{
				foto = '<img src="' + lokasi_gambar + 'sedang_' + daftar[x].foto + '" style=" width:200px;height:140px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;border:2px solid #555555;"/>';
			}
			else
				foto = '';

			content_lokasi =
				'<div id="content">' +
				'<div id="siteNotice">' +
				'</div>' +
				'<h4 id="firstHeading" class="firstHeading">' + daftar[x].nama + '</h4>' +
				'<div id="bodyContent">' + foto +
				'<p>' + daftar[x].desk + '</p>' +
				'</div>' +
				'</div>';

			marker.push(turf.point([daftar[x].lng, daftar[x].lat], { content: content_lokasi, style: L.icon(point_style) }));
		}
	}
}

function set_marker_lokasi_pembangunan(marker, daftar_path, path_icon, foto_lokasi, link_progress)
{
	var daftar = (daftar_path == 'null') ? new Array() :JSON.parse(daftar_path);
	var jml = daftar.length;
	var foto;
	var content_lokasi;
	var lokasi_gambar = foto_lokasi;

	for (var x = 0; x < jml; x++)
	{
		if (daftar[x].lat)
		{
			if (daftar[x].foto)
			{
				foto = '<img src="' + lokasi_gambar + daftar[x].foto + '" style=" width:300px;height:240px;border-radius:1px;-moz-border-radius:3px;-webkit-border-radius:1px;"/>';
			}
			else
				foto = '';

			content_lokasi =
				'<div id="content">' +
				'<h4><b style="color:red"><center>Kegiatan Pembangunan</center></b></h4>' +
				'<div id="bodyContent">' + foto +
				'</div>'
				+ '<table>'
				+ '<tr>'
				+ '<td width="100px">Nama Kegiatan</td>'
				+ '<td width="10px">:</td>'
				+ '<td><b style="color:red">' + daftar[x].judul + '</b></td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td width="100px">Lokasi</td>'
				+ '<td width="10px">:</td>'
				+ '<td>' + daftar[x].alamat + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td width="100px">Sumber Dana</td>'
				+ '<td width="10px">:</td>'
				+ '<td>' + daftar[x].sumber_dana + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td width="100px">Anggaran</td>'
				+ '<td width="10px">:</td>'
				+ '<td class="rupiah">Rp. ' + formatRupiah(daftar[x].anggaran) + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td width="100px">Volume</td>'
				+ '<td width="10px">:</td>'
				+ '<td>' + daftar[x].volume + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td width="100px">Pelaksana</td>'
				+ '<td width="10px">:</td>'
				+ '<td>' + daftar[x].pelaksana_kegiatan + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td width="100px">Tahun Anggaran</td>'
				+ '<td width="10px">:</td>'
				+ '<td>' + daftar[x].tahun_anggaran + '</td>'
				+ '</tr>'
				+ '</table>'
				+ '<center><a href="' + link_progress + daftar[x].slug + '" target="_blank" class="btn btn-flat bg-red btn-sm"><i class="fa fa-info"></i> Selengkapnya</a>'
				+ '</div>';

			marker.push(turf.point([daftar[x].lng, daftar[x].lat], { content: content_lokasi, style: L.icon({ "iconSize": [16, 16], "iconUrl": path_icon }) }));
		}
	}
}

//Menampilkan OverLayer Area, Garis, Lokasi
function tampilkan_layer_area_garis_lokasi(peta, daftar_path, daftar_garis, daftar_lokasi, path_icon, foto_area, foto_garis, foto_lokasi)
{
	var marker_area = [];
	var marker_garis = [];
	var marker_lokasi = [];
	var markers = new L.MarkerClusterGroup();
	var markersList = [];

	var layer_area = L.featureGroup();
	var layer_garis = L.featureGroup();
	var layer_lokasi = L.featureGroup();

	var layerCustom = {
		"Infrastruktur Desa": {
			"Infrastruktur (Area)": layer_area,
			"Infrastruktur (Garis)": layer_garis,
			"Infrastruktur (Lokasi)": layer_lokasi
		}
	};

	//OVERLAY AREA
	if (daftar_path)
	{
		set_marker_area(marker_area, daftar_path, foto_area);
	}

	//OVERLAY GARIS
	if (daftar_garis)
	{
		set_marker_garis(marker_garis, daftar_garis, foto_garis);
	}

	//OVERLAY LOKASI DAN PROPERTI
	if (daftar_lokasi)
	{
		set_marker_lokasi(marker_lokasi, daftar_lokasi, path_icon, foto_lokasi);
	}

	setMarkerCustom(marker_area, layer_area);
	setMarkerCustom(marker_garis, layer_garis);
	setMarkerCluster(marker_lokasi, markersList, markers);

	peta.on('layeradd layerremove', function () {
		peta.eachLayer(function (layer) {
			if (peta.hasLayer(layer_lokasi)) {
				peta.addLayer(markers);
			} else {
				peta.removeLayer(markers);
				peta._layersMaxZoom = 19;
			}
		});
	});

	return layerCustom;
}

//Menampilkan OverLayer Area, Garis, Lokasi plus Lokasi Pembangunan
function tampilkan_layer_area_garis_lokasi_plus(peta, daftar_path, daftar_garis, daftar_lokasi, daftar_lokasi_pembangunan, path_icon, path_icon_pembangunan, foto_area, foto_garis, foto_lokasi, foto_lokasi_pembangunan, link_progress, daftar_persil) {
	var marker_area = [];
	var marker_garis = [];
	var marker_lokasi = [];
	var marker_persil = [];
	var marker_lokasi_pembangunan = [];
	var markers = new L.MarkerClusterGroup();
	var markersList = [];
	var markersP = new L.MarkerClusterGroup();
	var markersListP = [];

	var layer_area = L.featureGroup();
	var layer_garis = L.featureGroup();
	var layer_lokasi = L.featureGroup();
	var layer_lokasi_pembangunan = L.featureGroup();
	

	var layerCustom = {
		"Infrastruktur Desa": {
			"Infrastruktur (Area)": layer_area,
			"Infrastruktur (Garis)": layer_garis,
			"Infrastruktur (Lokasi)": layer_lokasi,
			"Infrastruktur (Lokasi Pembangunan)": layer_lokasi_pembangunan,
		}
	};

	//OVERLAY AREA
	if (daftar_path)
	{
		set_marker_area(marker_area, daftar_path, foto_area);
	}

	//OVERLAY GARIS
	if (daftar_garis)
	{
		set_marker_garis(marker_garis, daftar_garis, foto_garis);
	}

	//OVERLAY LOKASI DAN PROPERTI
	if (daftar_lokasi)
	{
		set_marker_lokasi(marker_lokasi, daftar_lokasi, path_icon, foto_lokasi);
	}

	//OVERLAY LOKASI PEMBANGUNAN
	if (daftar_lokasi_pembangunan)
	{
		set_marker_lokasi_pembangunan(marker_lokasi_pembangunan, daftar_lokasi_pembangunan, path_icon_pembangunan, foto_lokasi_pembangunan, link_progress);
	}

	//OVERLAY C-desa 
	if (daftar_persil)
	{
		var layer_persil = L.featureGroup();
		layerCustom['Infrastruktur Desa']['Letter C-Desa'] = layer_persil;
		set_marker_persil_content(marker_persil, daftar_persil, 'Persil', 'nomor', '#isi_popup_persil_', path_icon_pembangunan);
		setMarkerCustom(marker_persil, layer_persil);
	}

	setMarkerCustom(marker_area, layer_area);
	setMarkerCustom(marker_garis, layer_garis);
	setMarkerCluster(marker_lokasi, markersList, markers);
	setMarkerClusterP(marker_lokasi_pembangunan, markersListP, markersP);
	

	peta.on('layeradd layerremove', function () {
		peta.eachLayer(function (layer) {
			if (peta.hasLayer(layer_lokasi)) {
				peta.addLayer(markers);
			} else {
				peta.removeLayer(markers);
				peta._layersMaxZoom = 19;
			}
		});
	});

	peta.on('layeradd layerremove', function () {
		peta.eachLayer(function (layer) {
			if (peta.hasLayer(layer_lokasi_pembangunan)) {
				peta.addLayer(markersP);
			} else {
				peta.removeLayer(markersP);
				peta._layersMaxZoom = 19;
			}
		});
	});

	return layerCustom;
}

function clearMap(peta)
{
	for (i in peta._layers)
	{
		if (peta._layers[i]._path != undefined)
		{
			try
			{
				peta.removeLayer(peta._layers[i]);
			}
			catch (e)
			{
				console.log("problem with " + e + peta._layers[i]);
			}
		}
	}
}

$(document).ready(function ()
{
	$('#modalKecil').on('show.bs.modal', function (e) {
		var link = $(e.relatedTarget);
		var title = link.data('title');
		var modal = $(this)
		modal.find('.modal-title').text(title)
		$(this).find('.fetched-data').load(link.attr('href'));
	});

	$('#modalSedang').on('show.bs.modal', function (e) {
		var link = $(e.relatedTarget);
		var title = link.data('title');
		var modal = $(this)
		modal.find('.modal-title').text(title)
		$(this).find('.fetched-data').load(link.attr('href'));
	});

	$('#modalBesar').on('show.bs.modal', function (e) {
		var link = $(e.relatedTarget);
		var title = link.data('title');
		var modal = $(this)
		modal.find('.modal-title').text(title)
		$(this).find('.fetched-data').load(link.attr('href'));
	});
	return false;
})

//Cetak Peta ke PNG
function cetakPeta(layerpeta)
{
	L.control.browserPrint({
		documentTitle: "Peta_Wilayah",
		printModes: [
			L.control.browserPrint.mode.auto("Auto"),
			L.control.browserPrint.mode.landscape("Landscape"),
			L.control.browserPrint.mode.portrait("Portrait")
		],
	}).addTo(layerpeta);

	L.Control.BrowserPrint.Utils.registerLayer(L.MarkerClusterGroup, 'L.MarkerClusterGroup', function (layer, utils) {
		return layer;
	});

	L.Control.BrowserPrint.Utils.registerLayer(L.MapboxGL, 'L.MapboxGL', function (layer, utils) {
		return L.mapboxGL(layer.options);
	}
	);

	window.print = function () {
		return domtoimage
			.toPng(document.querySelector(".grid-print-container"))
			.then(function (dataUrl) {
				var link = document.createElement('a');
				link.download = layerpeta.printControl.options.documentTitle || "exportedMap" + '.png';
				link.href = dataUrl;
				link.click();
			});
	};
	return cetakPeta;
}

//Menambahkan legend ke peta dusun/rw/rt
function setlegendPeta(legenda, layerpeta, legendData, judul, nama_wil, judul_wil_atas)
{
	var daftar = JSON.parse(legendData);
	var div = L.DomUtil.create('div', 'info legend');
	var labels = ['<strong>Legenda' + ' ' + ' - ' + ' ' + judul + '</strong>'];

	for (var x = 0; x < daftar.length; x++)
	{
		if (daftar[x].path)
		{
			legenda.onAdd = function (layerpeta) {
				var categories = [judul + ' ' + daftar[x][nama_wil]];
				if (judul === 'RT')
				{
					var categories = [judul + ' ' + daftar[x][nama_wil] + ' ' + judul_wil_atas + ' ' + daftar[x].rw + ' ' + daftar[x].dusun];
				}
				if (judul === 'RW')
				{
					var categories = [judul + ' ' + daftar[x][nama_wil] + ' ' + judul_wil_atas + ' ' + daftar[x].dusun];
				}
				for (var i = 0; i < categories.length; i++)
				{
					div.innerHTML +=
						labels.push(
							'<i class="circle" style="background:' + daftar[x].warna + '"></i> ' +
							(categories[i] ? categories[i] + '<br>' : '+'));
				}
				div.innerHTML = labels.join('<br>');
				return div;
			}
			legenda.addTo(layerpeta);
		}
	}
	setlegendPrint(legenda, layerpeta, legendData, judul, nama_wil, judul_wil_atas);
	return setlegendPeta;
}

function setlegendPrint(legenda, layerpeta, legendData, judul, nama_wil, judul_wil_atas)
{
	layerpeta.on("browser-print-start", function (e) {
		var daftar = JSON.parse(legendData);
		var div = L.DomUtil.create('div', 'info legend');
		var labels = ['<strong>Legenda' + ' ' + ' - ' + ' ' + judul + '</strong>'];

		for (var x = 0; x < daftar.length; x++)
		{
			if (daftar[x].path)
			{
				legenda.onAdd = function (layerpeta) {
					var categories = [judul + ' ' + daftar[x][nama_wil]];
					if (judul === 'RT')
					{
						var categories = [judul + ' ' + daftar[x][nama_wil] + ' ' + judul_wil_atas + ' ' + daftar[x].rw + ' ' + daftar[x].dusun];
					}
					if (judul === 'RW')
					{
						var categories = [judul + ' ' + daftar[x][nama_wil] + ' ' + judul_wil_atas + ' ' + daftar[x].dusun];
					}
					for (var i = 0; i < categories.length; i++)
					{
						div.innerHTML +=
							labels.push(
								'<i class="circle" style="background:' + daftar[x].warna + '"></i> ' +
								(categories[i] ? categories[i] + '<br>' : '+'));
					}
					div.innerHTML = labels.join('<br>');
					return div;
				}
				legenda.addTo(e.printMap);
			}
		}
	});
	return setlegendPrint;
}

//Menambahkan legend ke peta desa
function setlegendPetaDesa(legenda, layerpeta, legendData, judul, nama_wil) {
	var daftar = JSON.parse(legendData['path']);

	for (var x = 0; x < daftar.length; x++)
	{
		legenda.onAdd = function (layerpeta) {
			var div = L.DomUtil.create('div', 'info legend');
			var labels = ['<strong>Legenda' + ' ' + ' - ' + ' ' + judul + '</strong>'];
			var categories = [judul + ' ' + legendData['nama_desa']];
			for (var i = 0; i < categories.length; i++)
			{
				div.innerHTML +=
					labels.push(
						'<i class="circle" style="background:' + legendData['warna'] + '"></i> ' +
						(categories[i] ? categories[i] + '<br>' : '+'));
			}
			div.innerHTML = labels.join('<br>');
			return div;
		}
		legenda.addTo(layerpeta);
	}

	layerpeta.on("browser-print-start", function (e) {
		L.control.scale({ position: 'bottomleft' }).addTo(e.printMap);
		legenda.addTo(e.printMap);
	});

	return setlegendPetaDesa;
}

//loading Peta Sebaran Covid - data geoJSON dari API BNPB-https://bnpb-inacovid19.hub.arcgis.com/datasets/data-harian-kasus-per-provinsi-covid-19-indonesia
function peta_covid(mylayer, mymap, img)
{
	var peta_covid = $.getJSON("https://opendata.arcgis.com/datasets/0c0f4558f1e548b68a1c82112744bad3_0.geojson", function (data) {
		var datalayer = L.geoJson(data, {
			onEachFeature: function (feature, layer) {
				var custom_icon = L.icon({ "iconSize": 32, "iconUrl": img });
				layer.setIcon(custom_icon);
				var popup_0 = L.popup({ "maxWidth": "100%" });
				var html_a = $('<div id="html_a" style="width: 100.0%; height: 100.0%;">'
					+ '<h4><b>' + feature.properties.Provinsi + '</b></h4>'
					+ '<table><tr>'
					+ '<th style="color:red">Positif&nbsp;&nbsp;</th>'
					+ '<th style="color:green">Sembuh&nbsp;&nbsp;</th>'
					+ '<th style="color:black">Meninggal&nbsp;&nbsp;</th>'
					+ '</tr><tr>'
					+ '<td><center><b style="color:red">' + feature.properties.Kasus_Posi + '</b></center></td>'
					+ '<td><center><b style="color:green">' + feature.properties.Kasus_Semb + '</b></center></td>'
					+ '<td><center><b>' + feature.properties.Kasus_Meni + '</b></center></td>'
					+ '</tr></table></div>')[0];
				popup_0.setContent(html_a);
				layer.bindPopup(popup_0, { 'className': 'covid_pop' });
				layer.bindTooltip(feature.properties.Provinsi, { sticky: true, direction: 'top' });
			},
		});
		mylayer.addLayer(datalayer);
	});
	return peta_covid;
}

//loading Peta Desa Pengguna OpenSID (Data dari API Server)
function pantau_desa(layer_desa, tracker_host, kode_desa, img, token)
{
	var pantau_desa = $.getJSON(tracker_host + '/index.php/api/wilayah/geoprov?token=' + token + '&kode_desa=' + kode_desa, function (data) {
		var datalayer = L.geoJson(data, {
			onEachFeature: function (feature, layer) {
				var custom_icon = L.icon({ "iconSize": [16, 16], "iconUrl": img });
				layer.setIcon(custom_icon);
				var popup_0 = L.popup({ "maxWidth": "100%" });
				var customOptions = { 'maxWidth': '325', 'className': 'covid_pop' };
				var html_a = $('<div id="html_a" style="width: 100.0%; height: 100.0%;">'
					+ '<h4><b style="color:red">' + feature.properties.desa + '</b></h4>'
					+ '<table>'
					+ '<tr>'
					+ '<td><b style="color:green">Alamat : ' + feature.properties.alamat + '</b></td>'
					+ '</tr>'
					+ '<tr>'
					+ '<td><b style="color:green">Kecamatan : ' + feature.properties.kec + '</b></td>'
					+ '</tr>'
					+ '<tr>'
					+ '<td><b style="color:green">Kab/Kota : ' + feature.properties.kab + '</b></td>'
					+ '</tr>'
					+ '<tr>'
					+ '<td><b style="color:green">Provinsi : ' + feature.properties.prov + '</b></td>'
					+ '</tr>'
					+ '<tr>'
					+ '<td><b style="color:green">Website : ' + '<a href="' + 'http://' + feature.properties.web + '" + " target=\"_blank\">' + 'http://' + feature.properties.web + '</a>' + '</b></td>'
					+ '</tr>'
					+ '</table></div>')[0];
				popup_0.setContent(html_a);
				layer.bindPopup(popup_0, customOptions);
				layer.bindTooltip(feature.properties.desa, { sticky: true, direction: 'top' });
			},
		});
		layer_desa.addLayer(datalayer);
		var infodesa = data;
		var nama_prov = infodesa.nama_provinsi;
		var jml_desa_prov = infodesa.jml_desa_prov;
		var lat = infodesa.lat;
		var lng = infodesa.lng;
		let attributes = ['nama_prov', 'jml_desa_prov'];
		attributes.forEach(function (attr) {
			$(`.${attr}`).html(eval(attr));
		})

		$.ajax({
			type: 'GET',
			url: tracker_host + '/index.php/api/wilayah/geokab?token=' + token + '&kode_desa=' + kode_desa,
			dataType: 'json',
			success: function (data) {
				var nama_kab = data.nama_kabupaten;
				var jml_desa_kab = data.jml_desa_kab;
				let attributes = ['nama_kab', 'jml_desa_kab'];
				attributes.forEach(function (attr) {
					$(`.${attr}`).html(eval(attr));
				})
			}
		});

		$.ajax({
			type: 'GET',
			url: tracker_host + '/index.php/api/wilayah/geokec?token=' + token + '&kode_desa=' + kode_desa,
			dataType: 'json',
			success: function (data) {
				var nama_kec = data.nama_kecamatan;
				var jml_desa_kec = data.jml_desa_kec;
				let attributes = ['nama_kec', 'jml_desa_kec'];
				attributes.forEach(function (attr) {
					$(`.${attr}`).html(eval(attr));
				})
			}
		});

		$.ajax({
			type: 'GET',
			url: tracker_host + '/index.php/api/wilayah/geoneg?token=' + token,
			dataType: 'json',
			success: function (data) {
				var nama_negara = data.nama_negara;
				var jml_desa = data.jml_desa;
				let attributes = ['nama_negara', 'jml_desa'];
				attributes.forEach(function (attr) {
					$(`.${attr}`).html(eval(attr));
				})
			}
		});

	});
	return pantau_desa;
}

function get_path_import(coords, multi = false) {

	var path = JSON.stringify(coords)
		.replace(']],[[', '],[')
		.replace(']],[[', '],[')
		.replace(']],[[', '],[')
		.replace(']],[[', '],[')
		.replace(']],[[', '],[')
		.replace(']],[[', '],[')
		.replace(']],[[', '],[')
		.replace(']],[[', '],[')
		.replace(']],[[', '],[')
		.replace(']],[[', '],[')
		.replace(']]],[[[', '],[')
		.replace(']]],[[[', '],[')
		.replace(']]],[[[', '],[')
		.replace(']]],[[[', '],[')
		.replace(']]],[[[', '],[')
		.replace('[[[[[', '[[[')
		.replace(']]]]]', ']]]')
		.replace('[[[[', '[[[')
		.replace(']]]]', ']]]')
		.replace(/,0]/g, ']')
		.replace('],null]', ']');

	if (multi == true) {
		path = ''.concat('[', path, ']');
	}

	return path;
}

function jenis_garis(jenis) {
	if (jenis == 'dotted')  {
		dashArray = '1,15';
	} else if (jenis == 'dashed') {
		dashArray = '10,15';
	} else {
		// solid
		dashArray = '0';
	}

	return dashArray;
}