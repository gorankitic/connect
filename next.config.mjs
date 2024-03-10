// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//           {
//             protocol: 'https',
//             hostname: "utfs.io",
//             pathname: '**',
//           },
//         ],
//       },
// };


import { expand } from "dotenv-expand";

expand({ parsed: { ...process.env } });

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "utfs.io",
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
