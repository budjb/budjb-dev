import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Disqus } from 'gatsby-plugin-disqus';
import { Figure } from 'react-bootstrap';

const CoverPhoto = ({ post }) => {
  if (!post.frontmatter.coverPhoto) {
    return '';
  }

  let attribution = '';

  if (post.frontmatter.coverAttribution) {
    attribution = (
      <Figure.Caption className="px-3" style={{ fontSize: '.75rem' }}>
        {post.frontmatter.coverAttribution}
      </Figure.Caption>
    );
  }

  return (
    <Figure className="d-block bg-white mb-0">
      <Image fluid={post.frontmatter.coverPhoto.childImageSharp.fluid} alt="" />
      {attribution}
    </Figure>
  );
};

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const siteUrl = data.site.siteMetadata.siteUrl;

  const disqusConfig = {
    url: siteUrl + location.pathname,
    identifier: post.id,
    title: post.frontmatter.title,
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div className="limited-content-width py-5 px-0 px-md-4">
        <CoverPhoto post={post} />
        <article className="blog-post px-3 py-3">
          <header className="blog-post-header">
            <h1 className="mb-2">{post.frontmatter.title}</h1>
            <div className="meta mb-3">
              <span className="meta-item">Published {post.frontmatter.date}</span>
              <span className="meta-item">{post.frontmatter.author}</span>
              <span className="meta-item">{post.frontmatter.readtime} read</span>
            </div>
          </header>
          <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr className="my-5" />
          <Disqus config={disqusConfig} />
        </article>
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        readtime
        author
        coverPhoto {
          childImageSharp {
            fluid(maxWidth: 820) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        coverAttribution
      }
    }
  }
`;
