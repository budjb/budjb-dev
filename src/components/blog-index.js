import React from 'react';
import BlogIndexEntry from '../components/blog-index-entry';

const BlogIndex = ({ posts, className }) => {
  return (
    <section className={`blog-list ${className || ''}`}>
      {posts.map(({ node }, i) => (
        <BlogIndexEntry key={i} post={node} />
      ))}
    </section>
  );
};

export default BlogIndex;
