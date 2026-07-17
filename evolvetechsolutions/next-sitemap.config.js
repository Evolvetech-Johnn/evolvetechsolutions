/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || 'https://www.evolvetechsolutions.com.br',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/api/*'],
}
