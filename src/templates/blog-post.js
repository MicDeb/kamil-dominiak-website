import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Col, Row, Typography } from 'antd';
import Content, { HTMLContent } from 'src/components/Content';
import PreviewCompatibleImage from 'src/components/PreviewCompatibleImage';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
  image,
}) => {
  const PostContent = contentComponent || Content;
  const {
    Title, Paragraph,
  } = Typography;

  return (
    <section className='section'>
      {helmet || ''}
      <Row>
        <Col>
          {image ? (
            <div className='featured-thumbnail'>
              <PreviewCompatibleImage
                imageInfo={{
                  image,
                  alt: `featured image thumbnail for post ${ title }`,
                }}
              />
            </div>
          ) : null}
          <Title level={4}>
            {title}
          </Title>
          <Paragraph>{description}</Paragraph>
          <PostContent content={content} />
        </Col>
      </Row>
    </section>
  );
};

BlogPostTemplate.defaultProps = {
  contentComponent: () => null,
  description: '',
  title: '',
  helmet: null,
  image: null,
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
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
      description={post.frontmatter.description}
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
            fluid(maxWidth: 120, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
