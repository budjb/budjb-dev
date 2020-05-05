import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import BlogIndex from '../components/blog-index';
import Pagination from '../components/pagination';
import SEO from '../components/seo';
import _ from 'lodash';

export default ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  const tagName = pageContext.tag;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={tagName} />
      <header className="bg-dark">
        <h1 className="py-3 py-lg-5 px-2 px-lg-4 text-center text-gray-300 text-uppercase">{tagName}</h1>
      </header>
      <BlogIndex posts={posts} className="limited-content-width pb-3 p-lg-3" />
      <Pagination
        currentPage={pageContext.currentPage}
        numPages={pageContext.numPages}
        pathPrefix={`/tags/${_.kebabCase(tagName)}`}
        className="limited-content-width pb-3 px-2 px-lg-3 px-lg-0"
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query taggedBlogListQuery($skip: Int!, $limit: Int!, $tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            author
            readtime
            description
            tags
            coverPhoto {
              childImageSharp {
                fluid(maxWidth: 820, maxHeight: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
