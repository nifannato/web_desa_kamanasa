<div class="content-wrapper">
	<section class="content-header">
		<h1>Daftar Inventaris Jalan, Irigasi Dan Jaringan</h1>
		<ol class="breadcrumb">
			<li><a href="<?= site_url('hom_sid')?>"><i class="fa fa-home"></i> Home</a></li>
			<li class="active">Daftar Inventaris Jalan, Irigasi Dan Jaringan</li>
		</ol>
	</section>
	<section class="content" id="maincontent">
		<form id="mainformexcel" name="mainformexcel"method="post" class="form-horizontal">
			<div class="row">
				<div class="col-md-3">
					<?php $this->load->view('inventaris/menu_kiri.php')?>
				</div>
				<div class="col-md-9">
					<div class="box box-info">
						<div class="box-header with-border">
							<?php if ($this->CI->cek_hak_akses('u')): ?>
								<a href="<?= site_url('inventaris_jalan/form')?>" class="btn btn-social btn-flat btn-success btn-sm btn-sm visible-xs-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block"  title="Tambah Data Baru">
									<i class="fa fa-plus"></i>Tambah Data
								</a>
							<?php endif; ?>
							<a href="#" class="btn btn-social btn-flat bg-purple btn-sm btn-sm visible-xs-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block" title="Cetak Data" data-remote="false" data-toggle="modal" data-target="#cetakBox" data-title="Cetak Inventaris">
								<i class="fa fa-print"></i>Cetak
							</a>
							<a href="#" class="btn btn-social btn-flat bg-navy btn-sm btn-sm visible-xs-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block"  title="Unduh Data" data-remote="false" data-toggle="modal" data-target="#unduhBox" data-title="Unduh Inventaris">
								<i class="fa fa-download"></i>Unduh
							</a>
						</div>
						<div class="box-body">
							<div class="row">
								<div class="col-sm-12">
									<div class="row">
										<div class="col-sm-12">
											<div class="table-responsive">
												<table id="tabel4" class="table table-bordered dataTable table-hover">
													<thead class="bg-gray">
														<tr>
															<th class="text-center" rowspan="2">No</th>
															<th class="text-center" rowspan="2">Aksi</th>
															<th class="text-center" rowspan="2">Nama Barang</th>
															<th class="text-center" rowspan="2">Kode Barang / Nomor Registrasi</th>
															<th class="text-center" rowspan="2">Kondisi (B, KB, RB)</th>
															<th class="text-center" rowspan="2">Jenis Konstruksi</th>
															<th class="text-center" rowspan="2">Luas (M<sup>2</sup>)</th>
															<th class="text-center" colspan="2">Dokumen Kepemilikan</th>
															<th class="text-center" rowspan="2">Status Tanah</th>
															<th class="text-center" rowspan="2">Asal Usul</th>
															<th class="text-center" rowspan="2">Harga (Rp)</th>
														</tr>
														<tr>
															<th class="text-center" style="text-align:center;" rowspan="1">Tanggal</th>
															<th class="text-center" style="text-align:center;" rowspan="1">Nomor</th>
														</tr>
													</thead>
													<tbody>
														<?php foreach ($main as $data): ?>
															<?php if ($data->status == '1'): ?>
																<tr style='background-color:#cacaca'>
															<?php else: ?>
																<tr>
															<?php endif; ?>
																<td></td>
																<td nowrap>
																	<?php if ($data->mutasi == null && $this->CI->cek_hak_akses('u')): ?>
																		<a href="<?= site_url('inventaris_jalan/form_mutasi/' . $data->id); ?>" title="Mutasi Data" class="btn bg-olive btn-flat btn-sm"><i class="fa fa-external-link-square"></i></a>
																	<?php endif; ?>
																	<a href="<?= site_url('inventaris_jalan/view/' . $data->id); ?>" title="Lihat Data" class="btn bg-info btn-flat btn-sm"><i class="fa fa-eye"></i></a>
																	<?php if ($this->CI->cek_hak_akses('u')): ?>
																		<a href="<?= site_url('inventaris_jalan/edit/' . $data->id); ?>" title="Edit Data"  class="btn bg-orange btn-flat btn-sm"><i class="fa fa-edit"></i></a>
																	<?php endif; ?>
																	<?php if ($this->CI->cek_hak_akses('h')): ?>
																		<a href="#" data-href="<?= site_url("api_inventaris_jalan/delete/{$data->id}")?>" class="btn bg-maroon btn-flat btn-sm"  title="Hapus" data-toggle="modal" data-target="#confirm-delete"><i class="fa fa-trash-o"></i></a>
																	<?php endif; ?>
																</td>
																<td><?= $data->nama_barang; ?></td>
																<td><?= $data->kode_barang; ?><br><?= $data->register; ?></td>
																<td><?= $data->kondisi; ?></td>
																<td><?= $data->kontruksi; ?></td>
																<td>
																	<?= (empty($data->luas)) ? '-' : $data->luas ?>
																</td>
																<td>
																	<?= (empty(date('d M Y', strtotime($data->tanggal_dokument)))) ? '-' : date('d M Y', strtotime($data->tanggal_dokument)) ?>
																</td>
																<td>
																	<?= (empty($data->no_dokument)) ? '-' : $data->no_dokument ?>
																</td>
																<td><?= $data->status_tanah; ?></td>
																<td><?= $data->asal; ?></td>
																<td><?= number_format($data->harga, 0, '.', '.'); ?></td>
															</tr>
														<?php endforeach; ?>
													</tbody>
													<tfoot>
														<tr>
															<th colspan="11" class="text-right">Total:</th>
															<th><?= number_format($total, 0, '.', '.'); ?></th>
														</tr>
													</tfoot>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
							<?php $this->load->view('inventaris/inventaris_global_dialog_unduh') ?>
							<?php $this->load->view('inventaris/inventaris_global_dialog_cetak') ?>
						</div>
					</div>
				</div>
			</div>
		</form>
	</section>
</div>
<?php $this->load->view('global/confirm_delete'); ?>
<script>

	$("#form_cetak").click(function(event)
	{
		var link = '<?= site_url('inventaris_jalan/cetak'); ?>'+ '/' + $('#tahun_pdf').val() + '/' + $('#penandatangan_pdf').val();
		window.open(link, '_blank');
  });
	$("#form_download").click(function(event)
	{
		var link = '<?= site_url('inventaris_jalan/download'); ?>'+ '/' + $('#tahun').val() + '/' + $('#penandatangan').val();
		window.open(link, '_blank');
  });
</script>