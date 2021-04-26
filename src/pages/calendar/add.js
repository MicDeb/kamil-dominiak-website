import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Row, Col } from 'antd';
import DateField from 'src/components/form/DateField';
import TextField from 'src/components/form/TextField';
import TimeField from 'src/components/form/TimeField';
import TextAreaField from 'src/components/form/TextAreaField';

export default function AddEvent() {
  return (
    <div>
      <h1>Dodaj wydarzenie do kalendarza</h1>
      <Formik
        initialValues={{
          eventDescription: 'gsfzx',
          eventEndDate: null,
          eventLink: '',
          eventName: 'Abonament na szczęście',
          eventPlace: 'Scena Relax',
          eventRole: 'Janusz',
          eventStartDate: '22/03/2021',
          eventStartTime: '17:00',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // eslint-disable-next-line no-console
          console.log('values', values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Row gutter={[16, 24]}>
              <Col xs={24}>
                <DateField
                  name='eventStartDate'
                />
              </Col>
              <Col xs={24}>
                <TimeField
                  name='eventStartTime'
                />
              </Col>
              <Col xs={24}>
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
                  type='submit'
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}
