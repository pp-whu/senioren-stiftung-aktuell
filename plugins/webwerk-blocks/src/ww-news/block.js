/**
 * BLOCK: Webwerk - Aktuelles
 *
 * Registering a basic block with Gutenberg.
 * Block for displaying an events calendar.
 */

//  Import CSS.
// import './style.scss';
import './editor.scss';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { ServerSideRender } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ww/news', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'WW - Aktuelles', // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		'WW - Aktuelles',
		'Webwerk',
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
   edit( props ) {
         // ensure the block attributes matches this plugin's name
         return (
             <ServerSideRender
                 block="ww/news"
                 attributes={ props.attributes }
             />
         );
     },

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
   save() {
         // Rendering in PHP
         return null;
     },

} );
