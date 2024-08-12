import { useState, useEffect } from "@wordpress/element";
import { PanelBody, Button, TextControl } from "@wordpress/components";
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	PlainText,
	BlockControls
} from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes}) {
	const { heroBgId, heroBgUrl, heroTitle, heroLead } = attributes;

	const handleSelectBackgroundImage = (media) => {
		if (!media || !media.url) {
			return;
		}
		setAttributes({ heroBgId: media.id, heroBgUrl: media.url });
	}

	const handleTitleChange = (title) => {
		console.log(title);
		setAttributes({ heroTitle: title });
	}

	const handleLeadChange = (lead) => {
		setAttributes({ heroLead: lead });
	}

	useEffect(() => {
		console.log(`Here is the URL: ${heroBgUrl}`);
	}, [])

	return (
		<div {...useBlockProps()}>
			<div className="adminEbb-heroBlock">
				<div className="adminEbb-imageArea">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={handleSelectBackgroundImage}
							allowedTypes={["image"]}
							value={heroBgId}
							render={({ open }) => (
								<Button
									onClick={open}
									className={heroBgId ? "image-button" : "button"}
								>
									{heroBgId ? (
										<img
											src={heroBgUrl}
											alt="へろ画像"
											className="adminEbb-heroBlock__bg"
										/>
									) : (
										"Upload Background Image"
									)}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</div>
				<div className="adminEbb-titleArea">
					<hgroup className="adminEbb-titleArea__group">
						<span>
							<label>タイトル</label>
							<PlainText
								className="adminEbb-titleArea__title"
								value={heroTitle}
								onChange={handleTitleChange}
							/>
						</span>
						<span>
							<label>リード</label>
							<PlainText
								className="adminEbb-titleArea__lead"
								value={heroLead}
								onChange={handleLeadChange}
							/>
						</span>
					</hgroup>
				</div>
			</div>
		</div>
	);
}
