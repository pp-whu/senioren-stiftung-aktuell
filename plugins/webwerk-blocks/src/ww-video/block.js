/**
 * BLOCK: WW - Kachelelement
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
// import './style.scss';
import './editor.scss';

const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, MediaUploadCheck, RichText } = wp.editor;
const { Button, TextControl } = wp.components;

registerBlockType( 'ww/video', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'WW - Video', // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		'WW - Video',
		'Webwerk',
	],
  attributes: {
    videoID: {
      type: 'number'
    },
		videoLocalURL: {
        type: 'string',
    },
		videoRemoteURL: {
        type: 'string',
    },
		imageID: {
      type: 'number'
    },
		imageURL: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src',
    },
		imageAlt: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'alt',
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
								videoID,
                videoLocalURL,
								videoRemoteURL,
                imageID,
								imageURL,
								imageAlt,
                svgURL,
            },
            setAttributes,
        } = props;

				// setAttributes({videoRemoteURL: ''});

        function onChangeVideoURL( content ) {
            setAttributes( { videoRemoteURL: content } )
        }

				function removeVideo() {
            setAttributes( {
							videoRemoteURL: '',
							videoLocalURL: '',
						} )
        }


		const onSelectVideo = ( media ) => {
            setAttributes( {
                videoLocalURL: media.url,
								videoID: media.id,
            } );
        };

				var videoCode;
				if ( attributes.videoRemoteURL ) {
					videoCode = <iframe id="player" src={attributes.videoRemoteURL}></iframe>;
				} else if ( attributes.videoLocalURL ) {
					videoCode = <video id="player" class="video-js vjs-fluid" controls preload="auto" data-setup="{}">
						  <source src={attributes.videoLocalURL} type="video/mp4" />
								<p class="vjs-no-js">Ihr Browser kann dieses Video nicht wiedergeben.<br/>
						    <a href="#">Sie können diesen Film hier herunterladen.</a>
								</p>
						</video>;
				}

    	return ([
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ onSelectVideo }
						allowedTypes={ ['video'] }
						value={ videoID }
						render={ ( { open } ) => (
							<Button onClick={ open }>
								Video hinzufügen/ändern
							</Button>
						) }
					/>
				</MediaUploadCheck>,
				<TextControl
					label="Videoadresse"
					onChange={onChangeVideoURL}
					value={videoRemoteURL}
				/>,
				<Button onClick={ removeVideo }>
					Video entfernen
				</Button>,
				<div className={className}>
				{ videoCode }
				</div>
    	]);
  },

  save( { attributes } ) {
		var videoCode;
		if ( attributes.videoRemoteURL ) {
			videoCode = <iframe id="player" src={attributes.videoRemoteURL}></iframe>;
		} else if ( attributes.videoLocalURL ) {
			videoCode = <video id="player" class="video-js vjs-fluid" controls preload="auto" data-setup="{}">
				  <source src={attributes.videoLocalURL} type="video/mp4" />
						<p class="vjs-no-js">Ihr Browser kann dieses Video nicht wiedergeben.<br/>
				    <a href={attributes.videoLocalURL}>Sie können diesen Film hier herunterladen.</a>
						</p>
				</video>;
		}
    return videoCode;
  }
});
