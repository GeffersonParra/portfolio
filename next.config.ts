import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  reactCompiler: true,
};

export default withNextIntl(nextConfig);