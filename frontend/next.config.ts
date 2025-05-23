import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	/* config options here */
};

// next.config.js
module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:8080/api/:path*", // или твой внешний бэкенд
			},
		];
	},
};

export default nextConfig;
