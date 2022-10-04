				<footer class="main-footer">
					<div class="pull-right hidden-xs">
						<b>Versi</b> <?= AmbilVersi()?>
					</div>
					<strong>Aplikasi <a href="https://github.com/OpenSID/OpenSID" target="_blank"> OpenSID</a>, dikembangkan oleh <a href="https://www.facebook.com/groups/OpenSID/" target="_blank">Komunitas OpenSID</a>.</strong>
				</footer>
			</div>
		</div>

		<!-- jQuery 3 -->
		<script src="<?= asset('bootstrap/js/jquery.min.js') ?>"></script>
		<!-- Jquery UI -->
		<script src="<?= asset('bootstrap/js/jquery-ui.min.js') ?>"></script>
		<script src="<?= asset('bootstrap/js/jquery.ui.autocomplete.scroll.min.js') ?>"></script>

		<script src="<?= asset('bootstrap/js/moment.min.js') ?>"></script>
		<!-- Bootstrap 3.3.7 -->
		<script src="<?= asset('bootstrap/js/bootstrap.min.js') ?>"></script>
		<!-- Select2 -->
		<script src="<?= asset('bootstrap/js/select2.full.min.js') ?>"></script>
		<!-- DataTables -->
		<script src="<?= asset('bootstrap/js/jquery.dataTables.min.js') ?>"></script>
		<script src="<?= asset('bootstrap/js/dataTables.bootstrap.min.js') ?>"></script>
		<!-- bootstrap color picker -->
		<script src="<?= asset('bootstrap/js/bootstrap-colorpicker.min.js') ?>"></script>
		<!-- bootstrap Date time picker -->
		<script src="<?= asset('bootstrap/js/bootstrap-datetimepicker.min.js') ?>"></script>
		<script src="<?= asset('bootstrap/js/id.js') ?>"></script>
		<!-- bootstrap Date picker -->
		<script src="<?= asset('bootstrap/js/bootstrap-datepicker.min.js') ?>"></script>
		<script src="<?= asset('bootstrap/js/bootstrap-datepicker.id.min.js') ?>"></script>
		<!-- Bootstrap WYSIHTML5 -->
		<script src="<?= asset('bootstrap/js/bootstrap3-wysihtml5.all.min.js') ?>"></script>
		<!-- Slimscroll -->
		<script src="<?= asset('bootstrap/js/jquery.slimscroll.min.js') ?>"></script>
		<!-- FastClick -->
		<script src="<?= asset('bootstrap/js/fastclick.js') ?>"></script>
		<!-- AdminLTE App -->
		<script src="<?= asset('js/adminlte.min.js') ?>"></script>
		<script src="<?= asset('js/validasi.js') ?>"></script>
		<script src="<?= asset('js/jquery.validate.min.js') ?>"></script>
		<script src="<?= asset('js/localization/messages_id.js') ?>"></script>
		<!-- Numeral js -->
		<script src="<?= asset('js/numeral.min.js') ?>"></script>
		<!-- Script-->
		<script src="<?= asset('js/script.js') ?>"></script>
		<script src="<?= asset('js/custom-select2.js') ?>"></script>
		<script src="<?= asset('js/custom-datetimepicker.js') ?>"></script>

		<!-- Token Field -->
		<?php if ($this->controller == 'bumindes_kader'): ?>
			<script src="<?= asset('bootstrap/js/bootstrap-tokenfield.min.js') ?>"></script>
		<?php endif ?>

		<?php if (config_item('demo_mode')): ?>
			<script src="<?= asset('js/demo.js') ?>"></script>
		<?php endif ?>


		<!-- NOTIFICATION-->
		<script type="text/javascript">

			$('document').ready(function() {
				if ($('#success-code').val() == 1) {
					notify = 'success';
					notify_msg = 'Data berhasil disimpan';
				} else if ($('#success-code').val() == -1) {
					notify = 'error';
					notify_msg = 'Data gagal disimpan <?= addslashes($this->session->error_msg) ?>';
				} else if ($('#success-code').val() == -2) {
					notify = 'error';
					notify_msg = 'Data gagal disimpan, nama id sudah ada!';
				} else if ($('#success-code').val() == -3) {
					notify = 'error';
					notify_msg = 'Data gagal disimpan, nama id sudah ada!';
				} else if ($('#success-code').val() == 4) {
					notify = 'success';
					notify_msg = 'Data berhasil dihapus';
				} else if ($('#success-code').val() == -4) {
					notify = 'error';
					notify_msg = 'Data gagal dihapus';
				} else if ($('#success-code').val() == 5) {
					notify = 'success';
					notify_msg = 'Data berhasil diunggah';
				} else {
					notify = '';
					notify_msg = '';
				}
				notification(notify, notify_msg);
				$('#success-code').val('');

				// Sidebar
				if (typeof (Storage) !== 'undefined' && localStorage.getItem('sidebar') === 'false') {
					$("#sidebar_collapse").addClass('sidebar-collapse');
				}

				$('.sidebar-toggle').on('click', function() {
					localStorage.setItem('sidebar', $("#sidebar_collapse").hasClass('sidebar-collapse'));
				});
			});
		</script>
		<?php $_SESSION['success'] = 0 ?>
	</body>
</html>
