import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import DocumentHead from '../components/document-head';
import { Figure } from 'react-bootstrap';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShareModal } from '../components/share-modal';
import _ from 'lodash';

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
      <GatsbyImage image={post.frontmatter.coverPhoto.childImageSharp.gatsbyImageData} alt="" />
      {attribution}
    </Figure>
  );
};

const Template = ({ data, location }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  const articleUrl = `${data.site.siteMetadata.siteUrl}${location.pathname}`;

  return (
    <Layout location={location} title={siteTitle}>
      <ShareModal url={articleUrl} show={showShareModal} close={() => setShowShareModal(false)} />
      <div className="limited-content-width py-3 px-0 px-lg-3">
        <CoverPhoto post={post} />
        <article className="blog-post px-3 py-3">
          <header className="blog-post-header">
            <h1 className="mb-2">{post.frontmatter.title}</h1>
            <div className="d-flex flex-row align-items-center mb-3">
              <div className="flex-grow-1 meta">
                <span className="meta-item">{post.frontmatter.date}</span>
                <span className="meta-item">{post.frontmatter.author}</span>
                <span className="meta-item">{post.frontmatter.readtime} read</span>
              </div>
              <button className="clear-style px-2 text-muted-hover" onClick={() => setShowShareModal(true)}>
                <FontAwesomeIcon icon={faShareAlt} />
              </button>
            </div>
          </header>
          <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
          <footer className="d-flex flex-row align-items-center">
            <div className="blog-tags flex-grow-1">
              {(post.frontmatter.tags || []).map((it, i) => {
                return (
                  <Link key={i} to={`/tags/${_.kebabCase(it)}`}>
                    {it}
                  </Link>
                );
              })}
            </div>
          </footer>
        </article>
      </div>
    </Layout>
  );
};

export const Head = ({ data }) => (
  <DocumentHead title={data.markdownRemark.frontmatter.title} description={data.markdownRemark.excerpt} />
);

export default Template;

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
            gatsbyImageData(width: 820, layout: CONSTRAINED)
          }
        }
        tags
        coverAttribution
      }
    }
  }
`;
