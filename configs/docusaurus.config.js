// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const {themes: prismThemes} = require('prism-react-renderer');
const fs = require('fs');
const path = require('path');

// Dynamically generate navbar items from docs folder structure
function getDocsNavbarItems() {
  const docsPath = path.join(__dirname, 'docs');
  const items = [];
  
  try {
    const entries = fs.readdirSync(docsPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        // Extract number prefix and name (e.g., "1_ggtv" -> "GGTV")
        const match = entry.name.match(/^\d+_(.+)$/);
        if (match) {
          const sidebarId = entry.name.replace(/^\d+_/, '');
          const label = match[1].toUpperCase();
          
          console.log(`Navbar item: ${entry.name} -> sidebarId: ${sidebarId}, label: ${label}`);
          
          items.push({
            type: 'docSidebar',
            sidebarId: sidebarId,
            position: 'left',
            label: label,
          });
        }
      }
    }
    
    // Sort by directory name (which includes the number prefix)
    items.sort((a, b) => a.sidebarId.localeCompare(b.sidebarId));
    console.log('Navbar items generated:', items.map(i => i.sidebarId));
  } catch (error) {
    console.warn('Could not read docs directory:', error);
  }
  
  return items;
}

const siteName= process.env.SITE_NAME || 'GGV Blogs'
const projectName= process.env.PROJECT_NAME || siteName
const baseUrl = process.env.BASE_URL || '/'
const url = process.env.URL || 'https://www.kingtech.nl'
const customCss = process.env.CUSTOM_CSS
const brand = process.env.BRAND || 'KingTech'
const logo = process.env.LOGO || 'https://www.gravatar.com/avatar/1c367716e9c649121b5b877ad2f1b72f'
const favicon = process.env.FAVICON || 'https://www.gravatar.com/avatar/1c367716e9c649121b5b877ad2f1b72f'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: siteName,
  tagline: siteName,
  url: url,
  baseUrl: baseUrl,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: favicon,
  organizationName: brand, // Usually your GitHub org/user name.
  projectName: projectName, // Usually your repo name.
  presets: [
    [
      'classic',
      {
        docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            routeBasePath: "/",
        },
        blog: false, // Optional: disable the blog plugin
        // ...
        
        theme: {
            //customCss: customCss ? require.resolve(customCss) : undefined,
            customCss: require.resolve('./static/custom-css.css'),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: siteName,
        logo: {
          alt: `${ brand } Logo`,
          src: logo,
        },
        items: [
          ...getDocsNavbarItems(),
          {
            href: url,
            label: brand,
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} ${ brand }.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

module.exports = config;
