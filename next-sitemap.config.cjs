/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.evolvetechsolutions.com.br',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.evolvetechsolutions.com.br/sitemap.xml',
    ],
  },
}
