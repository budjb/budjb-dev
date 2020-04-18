import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faArrowLeft, faArrowRight, faLightbulb } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import SEO from '../components/seo';

const presets = {
  lightbulb: faLightbulb
};

const BlogImage = ({ post }) => {
  const image = post.frontmatter.coverPhoto;

  if (image) {
    return <Image fluid={image.childImageSharp.fluid} className="mr-3 img-fluid post-thumb d-none d-md-flex" alt=""/>;
  }

  const preset = post.frontmatter.coverIconPreset;
  const icon = preset in presets ? presets[preset] : faQuoteLeft;

  return (
    <div className="mr-3 d-none d-md-flex post-thumb justify-content-center align-items-center theme-bg-dark text-white" style={{fontSize: "3rem"}}>
      <FontAwesomeIcon icon={icon}/>
    </div>
  );
};

const BlogSection = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug;
  const innerHtml = post.frontmatter.description || post.excerpt;
  
  return (
    <div class="item mb-5" key={post.fields.slug}>
      <div class="media">
        <Link to={post.fields.slug}><BlogImage post={post}/></Link>
        <div class="media-body">
          <h1 class="h2 title mb-1">
            <Link to={post.fields.slug}>{title}</Link>
          </h1>
          <div class="meta mb-1">
            <span className="meta-item">Published {post.frontmatter.date}</span>
            <span className="meta-item">{post.frontmatter.author}</span>
            <span className="meta-item">{post.frontmatter.readtime} read</span>
          </div>
          <div class="intro" dangerouslySetInnerHTML={{ __html: innerHtml }} />
          <Link className="more-link" to={post.fields.slug}>
            Read more &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  const currentPage = pageContext.currentPage;
  const numPages = pageContext.numPages;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "/" : `/page/${currentPage - 1}`;
  const nextPage = `/page/${currentPage + 1}`;
    
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home"/>
      <section class="blog-list px-3 py-5 p-md-5 position-relative">
        <div class="container">
          {posts.map(({ node }) => (
            <BlogSection post={node}/>
          ))}
          <div class="d-flex flex-row justify-content-between">
            <div className="text-left" style={{flex: '1 1 0'}}>
              {!isFirst && (
                <Link to={prevPage} rel="prev">
                  <FontAwesomeIcon icon={faArrowLeft}/> Previous Page
                </Link>
              )}
            </div>
            <div className="text-center" style={{flex: '1 1 0'}}>
              Page {currentPage} of {numPages}
            </div>
            <div className="text-right" style={{flex: '1 1 0'}}>
              {!isLast && (
                <Link to={nextPage} rel="next">
                  Next Page <FontAwesomeIcon icon={faArrowRight}/>
                </Link>
              )}
            </div>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
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
            topic
            author
            readtime
            description
            coverPhoto {
              childImageSharp {
                fluid(maxWidth: 110, maxHeight: 110) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            coverIconPreset
          }
        }
      }
    }
  }
`;

