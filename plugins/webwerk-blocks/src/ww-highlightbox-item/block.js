/**
 * BLOCK: WW - Highlightbox-Element
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
// import './style.scss';
import './editor.scss';

// import PostSelector from '@vermilion/post-selector';
import PostSelector from './PostSelector';

const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, MediaUploadCheck, RichText } = wp.editor;
const { Button } = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

registerBlockType( 'ww/highlightbox-item', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'WW - Highlightbox-Element', // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		'WW - Highlightbox-Element',
		'Webwerk',
	],
  parent: [ 'ww/highlightbox' ],
  attributes: {
    mediaID: {
      type: 'number'
    },
		mediaURL: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src',
    },
		mediaAlt: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'alt',
    },
		posts: {
      type: 'array',
      default: []
    },
		content: {
			source: 'html',
			selector: 'span',
		},
    headline: {
			source: 'html',
			selector: 'h2',
		},
    svgURL: {
        selector: 'use', // From tag use
        source: 'attribute', // binds an attribute of the tag
        attribute: 'href', // binds href of use: the svg url
    },
  },

  edit(props) {
        const {
            className,
						attributes,
            attributes: {
                content,
                headline,
								mediaID,
                mediaURL,
								mediaAlt,
								posts,
                svgURL,
            },
            setAttributes,
        } = props;

    var templateURL = ww_blocks.templateUrl;

    setAttributes({svgURL: templateURL + '/img/icons.svg#button-next'});

		const onSelectImage = ( media ) => {
            setAttributes( {
                mediaURL: media.url,
								mediaID: media.id,
                mediaAlt: media.alt,
            } );
        };

    	return ([
        <div className={ props.className }>
    		<MediaUploadCheck>
    			<MediaUpload
    				onSelect={ onSelectImage }
    				allowedTypes={ ALLOWED_MEDIA_TYPES }
    				value={ mediaID }
    				render={ ( { open } ) => (
    					<Button onClick={ open }>
    						{ ! mediaID ? 'Bild hinzufügen' : null }
    					</Button>
    				) }
    			/>
    		</MediaUploadCheck>
				<PostSelector
              onPostSelect={post => {
                attributes.posts.push(post);
                setAttributes({ posts: [...attributes.posts] });
              }}
              posts={attributes.posts}
              onChange={newValue => {
                setAttributes({ posts: [...newValue] });
              }}
              postType={'page'}
              limit="1"
            />
				<div class="highlight-item">
          <a class="h-item__link" href="#">
          <RichText
            tagName="h2"
            className={ className }
            value={ attributes.headline }
            onChange={ ( headline ) => setAttributes( { headline } ) }
            placeholder="Hier Überschrift eingeben."
            />
            <div class="h-img">
              { mediaID ? <img src={ mediaURL } alt={ mediaAlt } /> : null }
            </div>
            <div class="btn btn-std">
              <RichText
                tagName="span"
                className={ className }
                value={ attributes.content }
                onChange={ ( content ) => setAttributes( { content } ) }
                placeholder="Hier Text eingeben."
                />
            </div>
          </a>
				</div>
        </div>
    	]);
  },

  save( { attributes } ) {

    var url = attributes.posts.map(post => (
      post.url
    ));

    return (
      <div class="highlight-item">
        <a class="h-item__link" href={url[0]}>
          <h2>{ attributes.headline }</h2>
          <div class="h-img">
            <img src={ attributes.mediaURL } alt={ attributes.mediaAlt } />
          </div>
          <div class="btn btn-std">
            <svg role="img" class="symbol" aria-hidden="true" focusable="false">
              <use href={attributes.svgURL}></use>
            </svg>
            <RichText.Content tagName="span" value={ attributes.content } />
          </div>
        </a>
      </div>
    );
  }
});
