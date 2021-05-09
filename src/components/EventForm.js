import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Button, Row, Col } from 'antd';
import DateField from 'src/components/form/DateField';
import TextField from 'src/components/form/TextField';
import TimeField from 'src/components/form/TimeField';
import TextAreaField from 'src/components/form/TextAreaField';
import EventValidation from 'src/helpers/validation/event';

export default function EventForm({ initialValues }) {
  return (
    <div>
      <h1>Dodaj wydarzenie do kalendarza</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          // eslint-disable-next-line no-console
          await new Promise((r) => setTimeout(r, 500));
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={EventValidation}
      >
        {({ isSubmitting }) => (
          <Form>
            <Row gutter={[16, 24]}>
              <Col
                xs={24}
                md={8}
              >
                <DateField
                  name='eventStartDate'
                />
              </Col>
              <Col
                xs={24}
                md={8}
              >
                <TimeField
                  name='eventStartTime'
                />
              </Col>
              <Col
                xs={24}
                md={8}
              >
                <DateField
                  name='eventEndDate'
                  placeholder='Data zakończenia wydarzenia'
                />
              </Col>
              <Col xs={24}>
                <TextField
                  name='eventPlace'
                  placeholder='Miesce wydarzenia'
                />
              </Col>
              <Col xs={24}>
                <TextField
                  name='eventName'
                  placeholder='Nazwa wydarzenia'
                />
              </Col>
              <Col xs={24}>
                <TextAreaField
                  name='eventDescription'
                  placeholder='Opis wydarzenia'
                />
              </Col>
              <Col xs={24}>
                <TextField
                  name='eventLink'
                  placeholder='Link do wydarzenia'
                />
              </Col>
              <Col xs={24}>
                <TextField
                  name='eventRole'
                  placeholder='Rola'
                />
              </Col>

              <Col xs={24}>
                <Button
                  htmlType='submit'
                  disabled={isSubmitting}
                >
                  Dodaj wydarzenie
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}

EventForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
};
