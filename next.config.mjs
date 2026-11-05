/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the entire app is served as client-side static assets.
  // This reinforces the zero-knowledge guarantee: there is no server runtime
  // that could receive, process, or store any uploaded file.
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Trailing slashes make static hosting (e.g. GitHub Pages) resolve routes cleanly.
  trailingSlash: true,
};

export default nextConfig;
