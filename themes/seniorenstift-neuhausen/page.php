<?php
/**
 * Seiten
 *
 * @package BBSB
 **/

get_header();
?>

<main class="main content" id="main" content="true">
  <div class="section dark-blue">
		<div class="page-wrap">
		<?php
		   the_breadcrumb();
		?>
	 </div>
  </div>
<?php
//the_title();
the_post();
the_content();
?>
</main>
<?php
get_footer(); ?>
