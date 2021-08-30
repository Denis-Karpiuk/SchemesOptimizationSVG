module.exports = {
	plugins: [
		'convertStyleToAttrs',
		'removeStyleElement',
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false,
					cleanupIDs: false,
				},
			},
		},
		{
			name: 'addAttributesToSVGElement',
			params: {
				attributes: ['fill="none"'],
			},
		},
		{
			name: 'removeAttrXMLSPACe',
			type: 'perItem',
			fn: item => {
				if (item.hasAttr('xml:space')) {
					item.removeAttr('xml:space')
				}
				if (item.hasAttr('xmlns:xlink')) {
					item.removeAttr('xmlns:xlink')
				}
				if (item.hasAttr('xmlns:ev')) {
					item.removeAttr('xmlns:ev')
				}
				if (item.hasAttr('xmlns:svg')) {
					item.removeAttr('xmlns:svg')
				}
			},
		},
		{
			name: 'rename xlink:href',
			type: 'perItem',
			fn: item => {
				if (item.hasAttr('xlink:href')) {
					item.addAttr({
						name: 'xlinkHref',
						value: `${item.attributes['xlink:href']}`,
					})
					item.removeAttr('xlink:href')
				}
			},
		},
		{
			name: 'removeAllFillStroke',
			type: 'perItem',
			fn: item => {
				if (item.hasAttr('fill')) {
					item.removeAttr('fill')
				}
			},
		},
	],
}
