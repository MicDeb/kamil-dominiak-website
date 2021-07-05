import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import {
  Col, Row, Typography, Space,
} from 'antd';
import Content, { HTMLContent } from 'src/components/Content';
import PreviewCompatibleImage from 'src/components/PreviewCompatibleImage';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  title,
  helmet,
  image,
}) => {
  const PostContent = contentComponent || Content;
  const {
    Title,
  } = Typography;

  return (
    <section className='section'>
      {helmet || ''}
      <Row>
        <Col>
          {image ? (
            <div className='featured-thumbnail blog-post__main-image'>
              <PreviewCompatibleImage
                imageInfo={{
                  image,
                  alt: `featured image thumbnail for post ${ title }`,
                }}
              />
            </div>
          ) : null}
          <Space
            direction='vertical'
            size={10}
          >
            <Title level={3}>
              {title}
            </Title>
            <PostContent content={content} />
          </Space>
        </Col>
      </Row>
    </section>
  );
};

BlogPostTemplate.defaultProps = {
  contentComponent: () => null,
  title: '',
  helmet: null,
  image: null,
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  helmet: PropTypes.object,
  image: PropTypes.object,
  title: PropTypes.string,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      helmet={(
        <Helmet titleTemplate='%s | Blog'>
          <title>{`${ post.frontmatter.title }`}</title>
          <meta
            name='description'
            content={`${ post.frontmatter.description }`}
          />
        </Helmet>
      )}
      title={post.frontmatter.title}
      image={post.frontmatter.featuredimage}
    />
  );
};

BlogPost.defaultProps = {
  data: null,
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
