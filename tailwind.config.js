/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			'border-card': 'hsl(var(--border-card) / <alpha-value>)',
  			primary: 'hsl(var(--primary))',
  			'primary-foreground': 'hsl(var(--primary-foreground))',
  			secondary: 'hsl(var(--secondary))',
  			'secondary-foreground': 'hsl(var(--secondary-foreground))',
  			muted: 'hsl(var(--muted))',
  			'muted-foreground': 'hsl(var(--muted-foreground))',
  			accent: 'hsl(var(--accent))',
  			'accent-foreground': 'hsl(var(--accent-foreground))',
  			destructive: 'hsl(var(--destructive))',
  			'destructive-foreground': 'hsl(var(--destructive-foreground))',
  			'destructive-bright': 'hsl(var(--destructive-bright))',
  			warning: 'hsl(var(--warning))',
  			'warning-foreground': 'hsl(var(--warning-foreground))',
  			success: 'hsl(var(--success))',
  			'success-foreground': 'hsl(var(--success-foreground))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			card: 'hsl(var(--card))',
  			'card-foreground': 'hsl(var(--card-foreground))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			DEFAULT: 'var(--radius)'
  		},
  		keyframes: {
  			'fade-in-0': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'fade-out-0': {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			},
  			'zoom-in-95': {
  				'0%': {
  					transform: 'scale(.95)'
  				},
  				'100%': {
  					transform: 'scale(1)'
  				}
  			},
  			'zoom-out-95': {
  				'0%': {
  					transform: 'scale(1)'
  				},
  				'100%': {
  					transform: 'scale(.95)'
  				}
  			},
  			'slide-in-from-top-2': {
  				'0%': {
  					transform: 'translateY(-0.5rem)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-from-bottom-2': {
  				'0%': {
  					transform: 'translateY(0.5rem)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-from-left-2': {
  				'0%': {
  					transform: 'translateX(-0.5rem)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-from-right-2': {
  				'0%': {
  					transform: 'translateX(0.5rem)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			}
  		},
  		animation: {
  			'fade-in-0': 'fade-in-0 0.2s ease-out',
  			'fade-out-0': 'fade-out-0 0.2s ease-in',
  			'zoom-in-95': 'zoom-in-95 0.2s ease-out',
  			'zoom-out-95': 'zoom-out-95 0.2s ease-in',
  			'slide-in-from-top-2': 'slide-in-from-top-2 0.2s ease-out',
  			'slide-in-from-bottom-2': 'slide-in-from-bottom-2 0.2s ease-out',
  			'slide-in-from-left-2': 'slide-in-from-left-2 0.2s ease-out',
  			'slide-in-from-right-2': 'slide-in-from-right-2 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
