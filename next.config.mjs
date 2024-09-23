/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },

  devIndicators: {
    appIsrStatus: false,
  },
  webpack(config) {
    // Add rule to ignore HTML files from node_modules
    config.module.rules.push({
      test: /\.html$/,
      use: "ignore-loader", // Use 'ignore-loader' to ignore HTML files
    });

    return config;
  },
};
export default withNextIntl(nextConfig);
