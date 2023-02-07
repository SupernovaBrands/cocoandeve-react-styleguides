/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false
const isProd = process.env.NODE_ENV === 'production'
let assetPrefix = '_'
let basePath = '/'

if (isProd) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
  basePath = '/cocoandeve-react-styleguides'
}

const nextConfig = {
	reactStrictMode: false,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});

		return config;
	}
};

const ghPages =  {
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    loader: 'imgix',
    path: 'the "domain" of your Imigix source',
  },
}

if (isProd) {
	module.exports = {...nextConfig, ...ghPages};
} else {
	module.exports = nextConfig;
}
