import React from 'react';
import {
  Col, Row, Typography, Divider,
} from 'antd';
import { useTranslation } from 'react-i18next';
import SectionHeading from '../../components/SectionHeading';

export default function Offer() {
  const { t } = useTranslation();
  const {
    Title, Paragraph,
  } = Typography;
  return (
    <section>
      <Row>
        <Col>
          <Title
            level={2}
            className='text-italic'
          >
            {t('offer.quotation')}
          </Title>
          <Paragraph className='text-right'>
            Jo Estill
          </Paragraph>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col>
          <SectionHeading
            title='offer.individual_vocal_classes'
          />
        </Col>
        <Col>
          <Paragraph>
            {t('offer.individual_description')}
          </Paragraph>
        </Col>
        <Col>
          <Paragraph>
            {t('offer.individual_end')}
          </Paragraph>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col>
          <SectionHeading
            title='offer.estill_voice_training'
          />
        </Col>
        <Col>
          <Paragraph>
            {t('offer.estill_voice_training_about_course')}
          </Paragraph>
        </Col>
        <Col>
          <Paragraph>
            {t('offer.estill_voice_training_about_estill_model')}
          </Paragraph>
        </Col>
        <Col>
          <Paragraph>
            {t('offer.estill_voice_training_level_of_advancement')}
          </Paragraph>
        </Col>
        <Col>
          <Paragraph>
            {t('offer.estill_voice_training_follow_events')}
          </Paragraph>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col>
          <SectionHeading
            title='offer.concerts'
          />
        </Col>
        <Col>
          <Paragraph>
            {t('offer.concerts_description')}
          </Paragraph>
        </Col>
      </Row>

    </section>
  );
}
