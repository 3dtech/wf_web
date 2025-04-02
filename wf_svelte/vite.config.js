import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig, loadEnv } from 'vite';
import  fs from 'node:fs/promises';
import { viteSingleFile } from "vite-plugin-singlefile"


const __env = loadEnv("", process.cwd())
const ignoreOpt = ["map", "mapSize"];

function parseOptions(env, prefix) {
	let entries = Object.entries(env).filter((key) => {
		return key && key[0].toLowerCase().indexOf(prefix) == 0 && ignoreOpt.indexOf(key[0].toLowerCase().substring(prefix.length + 1)) == -1;
	});

	entries = entries.map(v => {
		return [v[0].toLowerCase().substring(prefix.length + 1), v[1]]
	})
	let _env = Object.fromEntries(entries);
	return JSON.stringify(_env);
}


export default defineConfig({
	define: {
		"global": {},
	},
	server: {
		open: "dev.html",
	},
	plugins: [svelte(), viteSingleFile({
		inlinePattern: ['*.css']
	}),
		{
			name: 'index-html-prebuild',
			transformIndexHtml: {
				order: 'pre', // Tells Vite to run this before other processes
				async handler() {
					console.log('pre', process.env.WF_PACKAGE)
					// Do some logic; whatever you want
					if (process.env.WF_PACKAGE) {
						let html = await fs.readFile('./html/' + process.env.WF_PACKAGE + '.html', 'utf8');
						console.log('html', html)
						return html;
					}

					return await fs.readFile('./html/dev.html', { encoding: 'utf8' });
				}
			},
		},
		{
			name: 'index-html-after-build',
			transformIndexHtml: {
				order: 'post',
				async handler(src, ctx) {
					let wf_options = parseOptions(__env, "vite_wf");
					let wt_options = parseOptions(__env, "vite_wt");
					let wf_settings = parseOptions(__env, "vite_wf_settings");

					if (ctx.path == "/index.html") {
						if (process.env.WF_PACKAGE.indexOf("wordpress") > -1 ) {
							src = src.replace(/src\="[.](.*)"/, 'src="%dir%$1"')
							
						}
						else {
							src = src.replace('%WF_OPTIONS%', wf_options)
							src = src.replace('%WT_OPTIONS%', wt_options)
							src = src.replace('%WF_SETTINGS%', wf_settings)
						}
						return src;
					}

					

					return src;
				}
			}
		}
	],
	build: {
		outDir: process.env.WF_PACKAGE.indexOf("wordpress") > -1  ? '../wfmap/app/': './dist',
		emptyOutDir: true, // also necessary
	}
});
