import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

// Plugin to add each Tailwind color as a global CSS variable
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = theme('colors');
  
  const flattenColors = (colorsObj: any, prefix = '') => {
    return Object.entries(colorsObj).reduce((acc, [key, value]) => {
      if (typeof value === 'object') {
        Object.assign(acc, flattenColors(value, `${prefix}${key}-`));
      } else {
        acc[`--${prefix}${key}`] = value;
      }
      return acc;
    }, {} as Record<string, string>);
  };

  const newVars = flattenColors(allColors);

  addBase({
    ':root': newVars,
  });
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: '0',
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: '1',
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

export default config;
