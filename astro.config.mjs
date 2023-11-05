import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://cosmos-cloud.io/doc',
	integrations: [
		starlight({
			title: 'Cosmos Docs',
			logo: {
				alt: 'Cosmos Logo',
				src: '/src/assets/logo.png',
				replacesTitles: false,
			},
			social: {
				github: 'https://github.com/azukaar/Cosmos-Server',
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
			},
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Getting Started',
					link: '',
				},
				{
					label: 'First Setup',
					link: '/guides/setup',
				},
				{
					label: 'Cosmos Market',
					link: '/guides/market',
				},
				{
					label: 'ServApps',
					link: '/guides/servapps',
				},
				{
					label: 'URLS',
					link: '/guides/urls',
				},
				{
					label: 'Users',
					link: '/guides/users',
				},
				{
					label: 'Constellation VPN',
					link: '/guides/constellation-vpn',
				},
				{
					label: 'Cosmos-Compose',
					link: '/guides/cosmos-compose',
				},
				{
					label: 'OpenID',
					link: '/guides/openid',
				},
				{
					label: 'Other Setups',
					link: '/guides/other-setups',
				},
				{
					label: 'Common Issues and Troubleshooting',
					link: '/guides/debugging',
				},
			],
		}),
	],
});
