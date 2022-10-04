<?php defined('BASEPATH') || exit('No direct script access allowed'); ?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="https://www.facebook.com/2008/fbml">
<head>
	<?php $this->load->view("$folder_themes/commons/meta"); ?>
</head>
<body>
<!--
<div id="preloader">
		<div id="status">&nbsp;</div>
</div>
-->
<a class="scrollToTop" href="#"><i class="fa fa-angle-up"></i></a>
<div class="container" style="background-color: #f6f6f6;">
	<header id="header">
		<?php $this->load->view("$folder_themes/partials/header"); ?>
	</header>
	<div id="navarea">
		<?php $this->load->view("$folder_themes/partials/menu_head"); ?>
	</div>
	<div class="row">
		<section>
			<div class="content_bottom">
				<div class="col-lg-12 col-md-12">
					<?php $this->load->view($halaman_peta); ?>
				</div>
			</div>
		</section>
	</div>
</div>
<footer id="footer">
	<?php $this->load->view("$folder_themes/partials/footer_top"); ?>
	<?php $this->load->view("$folder_themes/partials/footer_bottom"); ?>
</footer>
<?php $this->load->view("$folder_themes/commons/meta_footer"); ?>
</body>
</html>
