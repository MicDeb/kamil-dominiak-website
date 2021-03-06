import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, graphql, StaticQuery } from 'gatsby';
import { Col, Row, Typography } from 'antd';
import PreviewCompatibleImage from './PreviewCompatibleImage';

function BlogRoll({ data }) {
  const { t } = useTranslation();
  const { edges: posts } = data.allMarkdownRemark;
  const {
    Title, Paragraph,
  } = Typography;
  return (
    <Row>
      {posts
       && posts.map(({ node: post }) => (
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
                   <span className='subtitle'>
                     {post.frontmatter.date}
                   </span>
                 </div>
               </div>
             </header>
             <Typography>
               <Paragraph>
                 {post.excerpt}
               </Paragraph>

               <Link
                 className='button'
                 to={post.fields.slug}
               >
                 {t('read_more')}
               </Link>
             </Typography>
           </article>
         </Col>
       ))}
    </Row>
  );
}

BlogRoll.defaultProps = {
  data: null,
};

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
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
