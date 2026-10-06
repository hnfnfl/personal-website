import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./lib/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: 'hsl(var(--surface))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				'accent-2': 'hsl(var(--accent-2))',
				signal: 'hsl(var(--signal))',
				border: 'hsl(var(--border))',
				ring: 'hsl(var(--ring))',
			},
			fontFamily: {
				sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
			},
			maxWidth: {
				page: '76rem',
			},
			keyframes: {
				pulse_dot: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.35' },
				},
			},
			animation: {
				pulse_dot: 'pulse_dot 2.4s ease-in-out infinite',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
