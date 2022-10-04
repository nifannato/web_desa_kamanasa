$(document).ready(function() {

	var table = $('#syarat_surat').DataTable({
		'processing': true,
		'paging': false,
		'info': false,
		'ordering': false,
		'searching': false,
		'ajax': {
			'url': SITE_URL + '/fmandiri/surat/cek_syarat',
			'type': "POST",
			data: function ( d ) {
				d.id_surat = $("#id_surat").val();
				d.id_permohonan = $("#id_permohonan").val();
			},
		},
		//Set column definition initialisation properties.
		"columnDefs": [
			{
				"targets": [ 0 ], //first column / numbering column
				"orderable": false, //set not orderable
			},
		],
		'aoColumnDefs': [
			{
				"sClass": "padat", "aTargets": [0, 2]
			}
		],
		'language': {
			'url': BASE_URL + '/assets/bootstrap/js/dataTables.indonesian.lang'
		},
		'drawCallback': function () {
			$('.dataTables_paginate > .pagination').addClass('pagination-sm no-margin');
			processInfo(table.page.info());
		}
	});

	function processInfo(info) {
		if (info.recordsTotal <= 0) {
			$('.ada_syarat').hide();
		} else {
			$('.ada_syarat').show();
		}
	}

	$('#id_surat').change(function() {
		table.ajax.reload();
	});

	// Perbaharui daftar pilihan dokumen setelah ada perubahan daftar dokumen yg tersedia
	// Beri tenggang waktu supaya database dokumen selesai di-initialise
	setTimeout(function() {
		// Ambil instance dari datatable yg sudah ada
		var dokumen = $('#dokumen').DataTable({"retrieve": true});
		dokumen.on( 'draw', function () {
			table.ajax.reload();
		} );
	}, 500);

	if ($('input[name=id_permohonan]').val()) {
		$('#id_surat').attr('disabled','disabled');
	}

	$('#validasi').submit(function() {
		var validator = $("#validasi").validate();
		var syarat = $("select[name='syarat[]']");
		var i;
		for (i = 0; i < syarat.length; i++) {
			if (!validator.element(syarat[i])) {
				$("#kata_peringatan").text('Syarat belum dilengkapi');
				$("#dialog").modal('show');
				return false;
			}
		};
	});

	$('.datatable-polos').DataTable({
		'pageLength': 10,
		'responsive': true,
		'aoColumnDefs': [
			{
				"sClass": "padat", "aTargets": [0]
			}
		],
		'language': {
			'url': BASE_URL + '/assets/bootstrap/js/dataTables.indonesian.lang'
		}
	});

	function show_alert(type, title, content) {
		const icon = type == 'red' ? 'fa fa-warning' : 'fa fa-check';
		$.alert({
			"type": type,
			"title": title,
			"content": content,
			"icon": icon,
			"backgroundDismiss": true
		});
	}

	$('#unggah_dokumen').validate();

	$('#dokumen').DataTable({
		'paging': false,
		'ordering': false,
		'info': true,
		'searching': false,
		'responsive': true,
		'rowReorder': {
			'selector': 'td:nth-child(2)'
		},
		'ajax': SITE_URL + '/fmandiri/surat/ajax_table_surat_permohonan',
		'language': {
			url: BASE_URL + '/assets/bootstrap/js/dataTables.indonesian.lang'
		},
		"columnDefs": [
		 {
				"targets": [5, 6],
				"visible": false
			}
		],
		'aoColumnDefs': [
			{
				"sClass": "padat", "aTargets": [0, 1]
			},
			{
				'aTargets': [1],
				'mData': 'aksi',
				'mRender': function (data, type, row) {
					let action = ``;
					if (row[1] && row[6] == 1) {
						action = `<button type="button" class="btn bg-orange btn-sm edit text-center" data-toggle="modal" data-target="#modal" data-title="Ubah Data" title="Ubah Data"  title="Ubah Data" data-id="${row[1]}"><i class="fa fa-edit"></i></button> <button type="button" class="btn bg-red btn-sm delete text-center" title="Hapus Data" data-id="${row[1]}"><i class="fa fa-trash"></i></button>`;
					}
					return action;
				}
			}
		]
	});

	$('#tambah_dokumen').click(function () {
		$('#unggah_dokumen').trigger('reset');
		$('#file').addClass('required');
		$('.anggota_kk').attr("disabled", false);
		$('.anggota_kk').attr("checked", false);
		$('#myModalLabel').text('Tambah Dokumen');
	})

	$('#list_dokumen').on('click', '.edit', function () {
		let id = $(this).attr('data-id');
		$('#unggah_dokumen').trigger('reset');
		$('#myModalLabel').text('Ubah Dokumen');
		$('#file').removeClass('required');
		$('#modal .modal-body').LoadingOverlay('show');
		$.ajax({
			url: SITE_URL + '/fmandiri/surat/ajax_get_dokumen_pendukung',
			type: 'POST',
			data: {
				id_dokumen: id
			},
			success: function (response) {
				$('#unggah_dokumen').validate().resetForm();
				$('#id_dokumen').val(response.id);
				$('#nama_dokumen').val(response.nama);
				$('#id_syarat').val(response.id_syarat);
				$('#old_file').val(response.satuan);
				$('#modal .modal-body').LoadingOverlay('hide');

				//anggota lain
				$('.anggota_kk').attr("checked", false);
				for (let [key, value] of Object.entries(data.anggota)) {
					if (value.id_pend != data.id_pend) {
						let id_anggota = '#anggota_' + value.id_pend;
						$(id_anggota).attr("checked", true);
					}
				}

				switch (data.success) {
					case -1:
						show_alert('red', 'Error', data.message);
						$('#modal').modal('hide');
						break;
					default:
						break;
				}
			},
			error: function (err) {
				console.log(err);
			}
		})
	});

	$('#list_dokumen').on('click', '.delete', function() {
		let id = $(this).attr('data-id');
		$.confirm({
			'title': 'Konfirmasi',
			'content': 'Apakah Anda yakin ingin menghapus data ini?',
			'icon': 'fa fa-warning',
			'buttons': {
				'confirm': {
					'text': 'Hapus',
					'btnClass': 'btn btn-danger',
					'action': function() {
						$('#modal .modal-body').LoadingOverlay('show');
						$.ajax({
							url: SITE_URL + '/fmandiri/surat/ajax_hapus_dokumen_pendukung',
							type: 'POST',
							data: {
								id_dokumen: id
							},
							success: function(response) {
								$('#modal .modal-body').LoadingOverlay('hide');
								switch (response.success) {
									case -1:
										show_alert('red', 'Error', response.message);
										break;
									default:
										show_alert('green', 'Sukses', 'Berhasil menghapus');
										$('#dokumen').DataTable().ajax.reload();
										break;
								}
							}
						})
					},
				},
				'cancel': {
					'text': 'Batalkan'
				}
			}
		})
	});

	$('#unggah_dokumen').submit(function (e) {
		e.preventDefault();
		if ($(this).valid()) {
			$('#modal .modal-body').LoadingOverlay("show");
			$.ajax({
				url: SITE_URL + '/fmandiri/surat/ajax_upload_dokumen_pendukung',
				type: 'POST',
				data: new FormData(this),
				processData: false,
				contentType: false,
				cache: false,
				async: true,
				success: function (response) {
					$('#modal .modal-body').LoadingOverlay("hide");
					switch (response.success) {
						case -1:
							show_alert('red', 'Error', response.message);
							break;
						default:
							$('#dokumen').DataTable().ajax.reload();
							$('#unggah_dokumen').trigger('reset');
							$('#modal').modal('hide');
							show_alert('green', 'Sukses', response.message);
							break;
					}
				},
				error: function (e) {
					console.log(e);
				},
			})
		}
	});
});
