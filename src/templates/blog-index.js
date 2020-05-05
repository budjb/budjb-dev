import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import BlogIndex from '../components/blog-index';
import Pagination from '../components/pagination';

export default ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <BlogIndex posts={posts} className="limited-content-width pb-3 p-lg-3" />
      <Pagination
        currentPage={pageContext.currentPage}
        numPages={pageContext.numPages}
        className="limited-content-width pb-3 px-2 px-lg-3 px-lg-0"
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
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
