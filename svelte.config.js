import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

	},
	vite: {
		ssr: {
			noExternal: [ 'dayjs' ]
		},
		resolve: {
			alias: {
				'@comp': path.resolve('./src/components'),
			}
		}
	}
};
export default config;
