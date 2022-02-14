const fs = require('fs')
const { optimize } = require('svgo')
const names = require('./office_city_names')

const previewsSVGOConfig = {
	// optional but recommended field
	path: 'path-to.svg',
	// all config fields are also available here
	multipass: true,
	plugins: [
		'removeStyleElement',
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false,
					cleanupIDs: true,
				},
			},
		},
		// {
		// 	name: 'removeAttrs',
		// 	params: {
		// 		attrs: 'fill:#fff',
		// 	},
		// },

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
			name: 'fff',
			type: 'perItem',
			fn: (item, params, info) => {
				let end = true
				if (item.name == 'path' && end) {
					if (item.attributes.fill === '#fff') {
						item.removeAttr('fill')
					}
				}
			},
		},

		{
			name: 'removeTextFillPreview',
			type: 'perItem',
			params: {
				type: 'element',
				name: 'text',
			},
			fn: (item, params, info) => {
				if (item.name == params.name) {
					if (item.hasAttr('fill')) {
						item.removeAttr('fill')
					}
				}
			},
		},
	],
}

const sourseFolderPath = './src/Source_SVG'
const resultLocalPath = `./src/Result_Previews_SVG/${names.office}_${names.city}_`

let pathes = fs
	.readdirSync(sourseFolderPath, () => {})
	.map(path => sourseFolderPath + '/' + path)

pathes.forEach(path => {
	let roomName = path
		.split('')
		.filter(el => el >= 0)
		.join('')
		.trim()

	fs.readFile(path, 'utf8', (error, data) => {
		const result = optimize(data, previewsSVGOConfig)
		const optimizedSvgString = result.data

		// save result in local result folder
		fs.writeFile(
			`${resultLocalPath}${roomName}.svg`,
			optimizedSvgString,
			() => {}
		)
	})
})
