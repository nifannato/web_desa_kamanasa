<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title><?= $this->setting->login_title . ' ' . ucwords($this->setting->sebutan_desa) . (($header['nama_desa']) ? ' ' . $header['nama_desa'] : '') . get_dynamic_title_page_from_path() ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="robots" content="noindex">
		<link rel="stylesheet" href="<?= asset('css/login-style.css') ?>" media="screen">
		<link rel="stylesheet" href="<?= asset('css/login-form-elements.css') ?>" media="screen">
		<link rel="stylesheet" href="<?= asset('bootstrap/css/bootstrap.bar.css') ?>" media="screen">
		<?php if (is_file('desa/pengaturan/siteman/siteman.css')): ?>
			<link rel='Stylesheet' href="<?= base_url('desa/pengaturan/siteman/siteman.css') ?>">
		<?php endif ?>
		<?php if (is_file(LOKASI_LOGO_DESA . 'favicon.ico')): ?>
			<link rel="shortcut icon" href="<?= base_url(LOKASI_LOGO_DESA . 'favicon.ico') ?>">
		<?php else: ?>
			<link rel="shortcut icon" href="<?= base_url('favicon.ico') ?>"/>
		<?php endif ?>

		<style type="text/css">
			<?php if ($latar_login): ?>
				body.login {
					background-image: url('<?= base_url($latar_login) ?>');
				}
			<?php endif ?>
		</style>
		<script src="<?= asset('bootstrap/js/jquery.min.js') ?>"></script>
		<script src="<?= asset('js/jquery.validate.min.js') ?>"></script>
		<script src="<?= asset('js/validasi.js') ?>"></script>
		<script src="<?= asset('js/localization/messages_id.js') ?>"></script>
		<?php require __DIR__ . '/head_tags.php' ?>
	</head>
	<body class="login">
		<div class="top-content">
			<div class="inner-bg">
				<div class="container">
					<div class="row">
						<div class="col-sm-4 col-sm-offset-4 form-box">
							<div class="form-top">
								<a href="<?=site_url() ?>"><img src="<?=gambar_desa($header['logo']) ?>" alt="<?=$header['nama_desa']?>" class="img-responsive" /></a>
								<div class="login-footer-top"><h1><?=ucwords($this->setting->sebutan_desa)?> <?=$header['nama_desa']?></h1>
									<h3>
										<br /><?=$header['alamat_kantor']?><br />Kodepos <?=$header['kode_pos']?>
										<br /><?=ucwords($this->setting->sebutan_kecamatan)?> <?=$header['nama_kecamatan']?><br /><?=ucwords($this->setting->sebutan_kabupaten)?> <?=$header['nama_kabupaten']?>
									</h3>
								</div>
								<hr />
							</div>
							<div class="form-bottom">
								<form id="validasi" class="login-form" action="<?=site_url('siteman/auth')?>" method="post" >
									<?php if ($this->session->siteman_wait == 1): ?>
										<div class="error login-footer-top">
											<p id="countdown" style="color:red; text-transform:uppercase"></p>
										</div>
									<?php else: ?>
										<div class="form-group">
											<input name="username" type="text" placeholder="Nama pengguna" <?php jecho($this->session->siteman_wait, 1, 'disabled') ?> value="" class="form-username form-control required">
										</div>
										<div class="form-group">
											<input name="password" id="password" type="password" placeholder="Kata sandi" <?php jecho($this->session->siteman_wait, 1, 'disabled') ?> value="" class="form-username form-control required">
										</div>
										<div class="form-group">
											<input type="checkbox" id="checkbox" class="form-checkbox"> Tampilkan kata sandi
										</div>
										<hr />
										<button type="submit" class="btn">MASUK</button>
										<?php if ($this->session->siteman == -1 && $this->session->siteman_try < 4): ?>
											<div class="error">
												<p style="color:red; text-transform:uppercase">Login Gagal.<br />Nama pengguna atau kata sandi yang Anda masukkan salah!<br />
												<?php if ($this->session->siteman_try): ?>
													Kesempatan mencoba <?= ($this->session->siteman_try - 1) ?> kali lagi.</p>
												<?php endif ?>
											</div>
										<?php elseif ($this->session->siteman == -2): ?>
											<div class="error">
												Redaksi belum boleh masuk, SID belum memiliki sambungan internet!
											</div>
										<?php endif ?>
									<?php endif ?>
								</form>
								<hr/>
								<div class="login-footer-bottom"><a href="https://github.com/OpenSID/OpenSID" target="_blank">OpenSID</a> <?= AmbilVersi() ?></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<script>
			function start_countdown() {
				var times = eval(<?= json_encode($this->session->siteman_timeout)?>) - eval(<?= json_encode(time())?>);
				var menit = Math.floor(times / 60);
				var detik = times % 60;
				timer = setInterval(function(){
					detik--;
					if (detik <= 0 && menit >=1) {
						detik = 60;
						menit--;
					}

					if (menit <= 0 && detik <= 0) {
						clearInterval(timer);
						location.reload();
					} else {
						document.getElementById("countdown").innerHTML = "<b>Gagal 3 kali silakan coba kembali dalam " + menit + " MENIT " + detik + " DETIK </b>";
					}
				}, 1000)
			}

			$('document').ready(function() {
				var pass = $("#password");
				$('#checkbox').click(function() {
					if (pass.attr('type') === "password") {
						pass.attr('type', 'text');
					} else {
						pass.attr('type', 'password')
					}
				});

				if ($('#countdown').length) {
					start_countdown();
				}
			});
		</script>
	</body>
</html>
