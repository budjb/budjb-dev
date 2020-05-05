const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require('lodash');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);
  const blogIndexTemplate = path.resolve('./src/templates/blog-index.js');
  const taggedBlogIndexTemplate = path.resolve('./src/templates/tagged-blog-index.js');

  const result = await graphql(
    `
      {
        posts: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }

        tags: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            totalCount
            fieldValue
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.posts.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  // Create paginated post listing pages.
  const postsPerPage = 5;
  let numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: blogIndexTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Create paginated tags listing pages.
  result.data.tags.group.forEach(tag => {
    let numPages = Math.ceil(tag.totalCount / postsPerPage);

    Array.from({ length: numPages }).forEach((__, i) => {
      const tagName = tag.fieldValue;
      const kebabTagName = _.kebabCase(tagName);

      createPage({
        path: i === 0 ? `/tags/${kebabTagName}` : `/tags/${kebabTagName}/page/${i + 1}`,
        component: taggedBlogIndexTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          tag: tagName,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
