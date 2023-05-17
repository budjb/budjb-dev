/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const DocumentHead = ({ description, lang = 'en', meta = [], title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const pageDescription = description || site.siteMetadata.description;
  const pageTitle = title ? `${title} | ${site.siteMetadata.title}` : site.siteMetadata.title;
  const pageMeta = [
    {
      name: `description`,
      content: pageDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: pageDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.social.twitter,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: pageDescription,
    },
    ...meta,
  ];

  return (
    <>
      <html lang={lang} />
      <title>{pageTitle}</title>
      {pageMeta.map(({ name, content }) => (
        <meta name={name} content={content} />
      ))}
    </>
  );
};

export default DocumentHead;
