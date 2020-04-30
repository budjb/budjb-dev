import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import { Card } from 'react-bootstrap';
import _ from 'lodash';

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

export default ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug;
  const innerHtml = post.frontmatter.description || post.excerpt;

  return (
    <Card className="entry">
      <BlogImage post={post} />
      <Card.Body>
        <Card.Title as="h2">
          <Link to={post.fields.slug}>{title}</Link>
        </Card.Title>

        <div className="meta mb-1">
          <span className="meta-item">Published {post.frontmatter.date}</span>
          <span className="meta-item">{post.frontmatter.author}</span>
          <span className="meta-item">{post.frontmatter.readtime} read</span>
        </div>

        <Card.Text dangerouslySetInnerHTML={{ __html: innerHtml }} />
        <Link className="d-inline-block" to={post.fields.slug}>
          Read more &rarr;
        </Link>

        {post.frontmatter.tags && (
          <div className="tags">
            {post.frontmatter.tags.map((it, i) => {
              return (
                <Link key={i} to={`/tags/${_.kebabCase(it)}`}>
                  {it}
                </Link>
              );
            })}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};