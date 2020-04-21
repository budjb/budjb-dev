import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogImage = ({ post }) => {
  const image = post.frontmatter.coverPhoto;

  if (image) {
    const as = () => <Image fluid={image.childImageSharp.fluid} className="cover-photo" alt="" />;
    return (
      <Link to={post.fields.slug}>
        <Card.Img as={as} />
      </Link>
    );
  }

  return '';
};

const BlogSection = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug;
  const innerHtml = post.frontmatter.description || post.excerpt;

  return (
    <Card className="item">
      <BlogImage post={post} />
      <Card.Body>
        <Card.Title as="h2">
          <Link to={post.fields.slug}>{title}</Link>
        </Card.Title>
        <Card.Text dangerouslySetInnerHTML={{ __html: innerHtml }} />
        <Link className="mb-3 d-inline-block" to={post.fields.slug}>
          Read more &rarr;
        </Link>
        <div class="meta mb-1">
          <span className="meta-item">Published {post.frontmatter.date}</span>
          <span className="meta-item">{post.frontmatter.author}</span>
          <span className="meta-item">{post.frontmatter.readtime} read</span>
        </div>
      </Card.Body>
    </Card>
  );
};

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  const currentPage = pageContext.currentPage;
  const numPages = pageContext.numPages;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : `/page/${currentPage - 1}`;
  const nextPage = `/page/${currentPage + 1}`;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <section class=" blog-list limited-content-width py-3 py-lg-5 px-lg-3">
        {posts.map(({ node }) => (
          <BlogSection post={node} />
        ))}

        <div class="pagination d-flex flex-row justify-content-between">
          <div className="text-left" style={{ flex: '1 1 0' }}>
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                <FontAwesomeIcon icon={faArrowLeft} /> Previous
              </Link>
            )}
          </div>
          <div className="text-center" style={{ flex: '1 1 0' }}>
            Page {currentPage} of {numPages}
          </div>
          <div className="text-right" style={{ flex: '1 1 0' }}>
            {!isLast && (
              <Link to={nextPage} rel="next">
                Next <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogIndex;

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
            topic
            author
            readtime
            description
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
