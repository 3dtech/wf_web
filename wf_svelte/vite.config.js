import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig, loadEnv } from 'vite';
import  fs from 'node:fs/promises';
import { viteSingleFile } from "vite-plugin-singlefile"
import { viteStaticCopy } from 'vite-plugin-static-copy'

const EMBED_JS = `<script type="text/javascript" src="./js/dist/2d/latest/Wayfinder2D.debug.js"></script>
				  <script type="text/javascript" src="./js/dist/mobile/latest/WayfinderMobile.debug.js"></script>`;
const __env = loadEnv("", process.cwd())
const wfPackage = process.env.WF_PACKAGE || process.env.VITE_WF_PACKAGE || __env.VITE_WF_PACKAGE || "";
const isWordpressPackage = wfPackage.indexOf("wordpress") > -1;
const ignoreOpt = ["map", "mapSize"];
console.log('__env', __env, process.cwd())
function parseOptions(env, prefix) {
	let entries = Object.entries(env).filter((key) => {
		return key && key[0] && key[0].toLowerCase().indexOf(prefix) == 0 && ignoreOpt.indexOf(key[0].toLowerCase().substring(prefix.length + 1)) == -1;
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
	plugins: [svelte(), ...(!isWordpressPackage ? [viteSingleFile({
		inlinePattern: ['*.css']
	})] : []),
	viteStaticCopy({
      targets: [
        {
          src: 'static/*',
          dest: './',
        },
      ],
    }),
		{
			name: 'index-html-prebuild',
			transformIndexHtml: {
				order: 'pre', // Tells Vite to run this before other processes
				async handler() {
					// Do some logic; whatever you want
					if (wfPackage) {
						console.log('Running pre-build HTML transformation', wfPackage);
						let html = await fs.readFile('./html/' + wfPackage + '.html', 'utf8');
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
					console.log('Running post-build HTML transformation', wfPackage);
					if (ctx.path == "/index.html") {
						if (isWordpressPackage) {
							src = src.replace(/src\="[^"]*(index-[^"/]+\.js)"/, 'src="%dir%/$1"')
							src = src.replace(/<script type="module"(?![^>]*data-cookieconsent)/, '<script type="module" data-cookieconsent="ignore"')
							src = src.replace(/\s*<link[^>]+href="[^"]*wfmap\.css"[^>]*>/, '')
							src = src.replace('%EMBED%', '')
						}
						else {
							src = src.replace('%WF_OPTIONS%', wf_options)
							src = src.replace('%WT_OPTIONS%', wt_options)
							src = src.replace('%WF_SETTINGS%', wf_settings)
							if (__env['VITE_WF_SCRIPTS'] === 'local') {
								src = src.replace('%EMBED%', EMBED_JS)
							}
							else {
								src = src.replace('%EMBED%', '')
							}
						}
						return src;
					}

					return src;
				}
			}
		}
	],
	build: {
		outDir: isWordpressPackage ? '../wfmap/app/': './dist',
		emptyOutDir: true, // also necessary
		assetsDir: isWordpressPackage ? '' : 'assets',
		rollupOptions: isWordpressPackage ? {
			output: {
				assetFileNames: assetInfo => assetInfo.name && assetInfo.name.endsWith('.css')
					? 'wfmap.css'
					: '[name]-[hash][extname]',
			},
		} : undefined,
	}
});
