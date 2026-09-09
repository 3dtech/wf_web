import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig, loadEnv } from 'vite';
import  fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { viteStaticCopy } from 'vite-plugin-static-copy'

const EMBED_JS = `<script type="text/javascript" src="./js/dist/2d/latest/Wayfinder2D.debug.js"></script>
				  <script type="text/javascript" src="./js/dist/mobile/latest/WayfinderMobile.debug.js"></script>`;
const __env = loadEnv("", process.cwd())
const buildTarget = process.env.WF_BUILD_TARGET || "";
const requestedPackage = process.env.WF_PACKAGE || process.env.npm_config_template || process.env.VITE_WF_PACKAGE || __env.VITE_WF_PACKAGE || "";
const wfPackage = requestedPackage || (buildTarget === "wordpress" ? "wordpress" : "");
const isWordpressPackage = buildTarget === "wordpress" || wfPackage.indexOf("wordpress") > -1;
const ignoreOpt = ["map", "mapSize"];
const customModuleId = "virtual:wf-custom";
const resolvedCustomModuleId = `\0${customModuleId}`;

if (wfPackage && !/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(wfPackage)) {
	throw new Error(`Invalid WF_PACKAGE value: ${wfPackage}`);
}

const customDirectory = path.resolve(process.cwd(), "custom", wfPackage || "__default__");
const customTemplate = path.join(customDirectory, "index.html");
const customConfig = path.join(customDirectory, "config.json");
const customScript = path.join(customDirectory, "index.js");
const customStyle = path.join(customDirectory, "index.css");
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

function escapeHtmlAttribute(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

function normalizeOptions(options) {
	return Object.fromEntries(
		Object.entries(options).map(([key, value]) => [key, String(value)]),
	);
}

async function getBuildConfiguration() {
	let options = JSON.parse(parseOptions(__env, "vite_wf"));
	let settings = JSON.parse(parseOptions(__env, "vite_wf_settings"));

	if (existsSync(customConfig)) {
		let config;
		try {
			config = JSON.parse(await fs.readFile(customConfig, "utf8"));
		} catch (error) {
			throw new Error(`Unable to read client configuration ${customConfig}.`, { cause: error });
		}

		if (!config || typeof config !== "object" || Array.isArray(config)) {
			throw new Error(`Client configuration ${customConfig} must contain a JSON object.`);
		}

		if (config.options !== undefined && (!config.options || typeof config.options !== "object" || Array.isArray(config.options))) {
			throw new Error(`The options value in ${customConfig} must be a JSON object.`);
		}

		if (config.settings !== undefined && (!config.settings || typeof config.settings !== "object" || Array.isArray(config.settings))) {
			throw new Error(`The settings value in ${customConfig} must be a JSON object.`);
		}

		options = { ...options, ...(config.options || {}) };
		settings = { ...settings, ...(config.settings || {}) };
	}

	return {
		options: normalizeOptions(options),
		settings,
	};
}

function customFilesPlugin() {
	return {
		name: "wf-custom-files",
		resolveId(id) {
			if (id === customModuleId) {
				return resolvedCustomModuleId;
			}
		},
		load(id) {
			if (id !== resolvedCustomModuleId) {
				return;
			}

			const imports = [];
			if (existsSync(customStyle)) {
				imports.push(`import ${JSON.stringify(customStyle)};`);
			}

			if (existsSync(customScript)) {
				imports.push(`export { default } from ${JSON.stringify(customScript)};`);
			} else {
				imports.push("export default function initializeCustomClient() {}");
			}

			return imports.join("\n");
		},
	};
}


export default defineConfig({
	define: {
		"global": {},
	},
	server: {
		open: "dev.html",
	},
	plugins: [svelte(), customFilesPlugin(),
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
						const legacyTemplate = path.resolve(process.cwd(), 'html', `${wfPackage}.html`);
						const template = existsSync(customTemplate) ? customTemplate : legacyTemplate;

						if (!existsSync(template)) {
							throw new Error(`No template found for ${wfPackage}. Expected ${customTemplate} or ${legacyTemplate}.`);
						}

						let html = await fs.readFile(template, 'utf8');
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
					const config = await getBuildConfiguration();
					let wf_options = escapeHtmlAttribute(JSON.stringify(config.options));
					let wt_options = parseOptions(__env, "vite_wt");
					let wf_settings = escapeHtmlAttribute(JSON.stringify(config.settings));
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
