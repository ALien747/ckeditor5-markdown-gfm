/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module markdown-gfm/gfmdataprocessor
 */

import marked from './lib/marked/marked.js';
import toMarkdown from './lib/to-markdown/to-markdown.js';
import HtmlDataProcessor from '../engine/dataprocessor/htmldataprocessor.js';
import GFMRenderer from './lib/marked/renderer.js';
import converters from './lib/to-markdown/converters.js';

/**
 * This data processor implementation uses GitHub flavored markdown as input/output data.
 *
 * @implements module:engine/dataprocessor/dataprocessor~DataProcessor
 */
export default class GFMDataProcessor {
	constructor() {
		/**
		 * HTML data processor used to process HTML produced by the Markdown to HTML converter and the other way.
		 *
		 * @private
		 * @member {module:engine/dataprocessor/htmldataprocessor~HtmlDataProcessor}
		 */
		this._htmlDP = new HtmlDataProcessor();
	}

	/**
	 * Converts provided markdown string to view tree.
	 *
	 * @param {String} data Markdown string.
	 * @returns {module:engine/view/documentfragment~DocumentFragment} Converted view element.
	 */
	toView( data ) {
		const html = marked.parse( data, {
			gfm: true,
			breaks: true,
			tables: true,
			xhtml: true,
			renderer: new GFMRenderer()
		} );

		return this._htmlDP.toView( html );
	}

	/**
	 * Converts provided {@link module:engine/view/documentfragment~DocumentFragment} to data format - in this case markdown string.
	 *
	 * @param {module:engine/view/documentfragment~DocumentFragment} viewFragment
	 * @returns {String} Markdown string.
	 */
	toData( viewFragment ) {
		const html = this._htmlDP.toData( viewFragment );

		return toMarkdown( html, { gfm: true, converters } );
	}
}

