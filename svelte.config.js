import adapter from 'sveltejs-adapter-ipfs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '200.html'
		})
	}
};

export default config;