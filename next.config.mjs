/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig = {
  output: 'export', // Configuración para exportación estática
  assetPrefix: assetPrefix, // Prefijo de los assets para GitHub Pages
  basePath: basePath, // Ruta base para GitHub Pages
  images: {
    unoptimized: true, // Desactiva la optimización de imágenes
  },
  webpack(config) {
    // Mantiene tu configuración actual de manejo de SVG
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reaplica la regla existente para svg que terminan en ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convierte todas las otras importaciones de *.svg en componentes de React
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // excluye si *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modifica la regla del cargador de archivos para ignorar *.svg
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
