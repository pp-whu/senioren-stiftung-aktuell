<?php

function ww_news_render_block_latest_post( $attributes, $content ) {

global $post;


	$args = array(
		'post_type'      => 'post',
		'posts_per_page' => 1,
	);

	$the_query = new WP_Query( $args );

	if ( $the_query->have_posts() ) {

		$a_days       = [ 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag' ];
		$a_months     = [ 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember' ];
		$news_content = '<div class="news-box">';

		while ( $the_query->have_posts() ) {
			$the_query->the_post();
			$img      = '';
			$date     = $a_days[ (int) get_the_date( 'w' ) ] . ', ' . get_the_date( 'd. ' ) . $a_months[ (int) get_the_date( 'n' ) - 1 ] . get_the_date( ' Y' );
			$media_id = get_post_thumbnail_id( $post->ID );
			if ( $media_id ) {
				$img = '<div class="n-img"><div>' . get_picture_tag( $media_id, array( 0 => 'news_small' ) ) . '</div></div>';
			}


			$news_content     .= '<article class="news-item"><a class="n-link" href="' . esc_url( get_permalink() ) . '">';
				$news_content .= '<div class="n-date">' . esc_html( $date ) . '</div>';
			$news_content     .= '<div class="n-text">
				<h2>' . get_the_title() . '</h2>
				' . $img . '
				' . get_the_content() . '

			</div></a></article>';



		}

		wp_reset_postdata();
	} else {
		$news_content .= '<p>Keine Beiträge.</p>';
	}

	$news_content .= '</div>';

	$news_content .= '<a class="btn btn-std" href="' . esc_url( home_url( '/aktuelle-beitraege/' ) ) . '">
		<svg role="img" class="symbol" aria-hidden="true" focusable="false">
			<use href="' . esc_url( get_template_directory_uri() ) . '/img/icons.svg#button-next"></use>
		</svg>
		<span>Aktuelle Beiträge anzeigen</span>
	</a>';

	return $news_content;
}

register_block_type(
	'ww/news', array(
		'render_callback' => 'ww_news_render_block_latest_post',
	)
);
