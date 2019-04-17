<?php

function ww_events_render_block_latest_post( $attributes, $content ) {
	global $post;

	if ( function_exists( 'tribe_get_events' ) ) {
		$events = tribe_get_events(
			array(
				'posts_per_page'   => 3,
				'start_date'       => date( 'Y-m-d H:i:s' ),
				'tribe_events_cat' => 'Allgemein',
			)
		);
	}

	if ( $events ) {

		$month         = '';
		$current_month = false;
		$events_code   = '<div class="event-box"><h2>Kommende Veranstaltungen</h2>';

		foreach ( $events as $post ) {
			setup_postdata( $post );

			$events_code .= '<article class="event-item"><a class="e-link" href="' . esc_url( get_permalink() ) . '">
			<div class="e-date">';

				$events_code .= '<span class="date">' . esc_html( tribe_get_start_date( $post, false, 'd.m.' ) ) . '</span>';
				$events_code .= '<span class="year">' . esc_html( tribe_get_start_date( $post, false, 'Y' ) ) . '</span>';

			$events_code .= '</div>';
			$events_code .= '<div class="e-title">
				<span class="title">' . get_the_title() . '</span>
				<svg role="img" class="symbol" aria-hidden="true" focusable="false">
					<use xlink:href="' . esc_url( get_template_directory_uri() ) . '/img/icons.svg#button-next"></use>
				</svg></div></a></article>';

		}

		wp_reset_postdata();
	} else {
		$events_code = '<p>Keine Veranstaltungen</p>';
	}

	$events_code .= '</div>';

	if ( $events ) {
		$events_code .= '<a class="btn btn-std" href="' . esc_url( home_url( '/veranstaltungen/' ) ) . '">
			<svg role="img" class="symbol" aria-hidden="true" focusable="false">
				<use href="' . esc_url( get_template_directory_uri() ) . '/img/icons.svg#button-next"></use>
			</svg>
			<span>Alle Veranstaltungen anzeigen</span>
		</a>';
	}

	return $events_code;
}

register_block_type(
	'ww/events', array(
		'render_callback' => 'ww_events_render_block_latest_post',
	)
);
