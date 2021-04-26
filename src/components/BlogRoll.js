import React from 'react';
import PropTypes from 'prop-types';
import slice from 'lodash/slice';
import { Link, graphql, StaticQuery } from 'gatsby';
import { Col, Row, Typography } from 'antd';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import ReadMoreButton from './ReadMoreButton';

function BlogRoll({ data, postsCount }) {
  const { edges: posts } = data.allMarkdownRemark;
  const {
    Title, Paragraph,
  } = Typography;
  return (
    <Row className='blog-roll'>
      {posts
       && slice(posts, 0, postsCount || posts.length).map(({ node: post }) => (
         <Col
           xs={24}
           md={12}
           lg={8}
           key={post.id}
         >
           <article
             className={`${
               post.frontmatter.featuredpost ? 'is-featured' : ''
             }`}
           >
             <header>
               {post.frontmatter.featuredimage ? (
                 <div className='featured-thumbnail'>
                   <PreviewCompatibleImage
                     imageInfo={{
                       image: post.frontmatter.featuredimage,
                       alt: `featured image thumbnail for post ${ post.frontmatter.title }`,
                     }}
                   />
                 </div>
               ) : null}
               <div className='post-meta'>
                 <div>
                   <Link
                     className='title'
                     to={post.fields.slug}
                   >
                     <Title level={4}>{post.frontmatter.title}</Title>
                   </Link>
                 </div>

                 <div>
                   <span className='post-meta__date'>
                     {post.frontmatter.date}
                   </span>
                 </div>
               </div>
             </header>
             <Typography>
               <Paragraph>
                 {post.excerpt}
               </Paragraph>

               <ReadMoreButton to={post.fields.slug} />
             </Typography>
           </article>
         </Col>
       ))}
    </Row>
  );
}

BlogRoll.defaultProps = {
  data: null,
  postsCount: 0,
};

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  postsCount: PropTypes.number,
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "DD.MM.YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (
      <BlogRoll
        data={data}
        count={count}
      />
    )}
  />
);
