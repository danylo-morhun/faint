/** @type {import("lint-staged").Configuration} */
export default {
  "*.{ts,tsx,js,jsx,mjs,cjs,json,css,md,yml,yaml}": "prettier --write",
}
