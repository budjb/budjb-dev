import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import DocumentHead from '../components/document-head';
import BlogIndex from '../components/blog-index';
import Pagination from '../components/pagination';

const Template = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <DocumentHead title="Home" />
      <BlogIndex posts={posts} className="limited-content-width pb-3 p-lg-3" />
      <Pagination
        currentPage={pageContext.currentPage}
        numPages={pageContext.numPages}
        className="limited-content-width pb-3 px-2 px-lg-3 px-lg-0"
      />
    </Layout>
  );
};

export default Template;

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip) {
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
                gatsbyImageData(width: 820, height: 300, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
