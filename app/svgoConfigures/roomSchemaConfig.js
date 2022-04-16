const roomSchemaConfig = {
	// optional but recommended field
	path: 'path-to.svg',
	// all config fields are also available here
	multipass: true,
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
			name: 'removeFont-family',
			type: 'perItem',
			fn: item => {
				if (item.hasAttr('font-family')) {
					item.removeAttr('font-family')
				}
			},
		},
		{
			name: 'removeFont-size',
			type: 'perItem',
			fn: item => {
				if (item.hasAttr('font-size')) {
					item.removeAttr('font-size')
				}
			},
		},
		{
			name: 'removeFont-weight',
			type: 'perItem',
			fn: item => {
				if (item.hasAttr('font-weight')) {
					item.removeAttr('font-weight')
				}
			},
		},
		{
			name: 'removeFont-style',
			type: 'perItem',
			fn: item => {
				if (item.hasAttr('font-style')) {
					item.removeAttr('font-style')
				}
			},
		},
		{
			name: 'removeFillInPlaceGroupe',
			type: 'perItem',
			fn: ast => {
				if (ast.hasAttr('id')) {
					if (ast.attributes.id.split('_')[0] === 'place') {
						ast.children.forEach(element => {
							if (element.hasAttr('fill')) {
								element.removeAttr('fill')
							}
							if (element.hasAttr('stroke')) {
								element.removeAttr('stroke')
							}
							if (element.children.length > 0) {
								element.children.forEach(el => {
									if (el.hasAttr('fill')) {
										el.removeAttr('fill')
									}
									if (el.hasAttr('stroke')) {
										el.removeAttr('stroke')
									}
								})
							}
						})
					}
				}
			},
		},
	],
}

module.exports.roomSchemaConfig = roomSchemaConfig
