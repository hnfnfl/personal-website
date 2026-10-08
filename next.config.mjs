/** @type {import('next').NextConfig} */
const nextConfig = {
  // Plain HTML/CSS/JS in out/, served by nginx in the Docker image.
  output: "export",
};

export default nextConfig;
