/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'unicon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-uniE600': '&#xe600;',
		'icon-uniE601': '&#x65;',
		'icon-uniE602': '&#x63;',
		'icon-uniE603': '&#xe603;',
		'icon-uniE604': '&#x64;',
		'icon-uniE605': '&#x3c;',
		'icon-uniE606': '&#x73;',
		'icon-uniE607': '&#x70;',
		'icon-uniE609': '&#xe609;',
		'icon-location': '&#x6c;',
		'icon-volume-medium': '&#x76;',
		'icon-settings': '&#x53;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
