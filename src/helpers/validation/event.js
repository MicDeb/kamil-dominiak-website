import * as Yup from 'yup';
import { errors } from './errors';

export default function EventValidation() {
  return (
    Yup.object().shape({
      eventDescription: Yup
        .string()
        .max(250, `${ errors.stringMax }: 250`)
        .min(3, `${ errors.stringMin }: 3`),
      eventEndDate: Yup
        .date(),
      eventLink: Yup
        .string()
        .url(errors.url),
      eventName: Yup
        .string()
        .max(250, `${ errors.stringMax }: 250`)
        .min(3, `${ errors.stringMin }: 3`)
        .required(errors.required),
      eventPlace: Yup
        .string()
        .max(250, `${ errors.stringMax }: 250`)
        .min(3, `${ errors.stringMin }: 3`)
        .required(errors.required),
      eventRole: Yup
        .string()
        .max(250, `${ errors.stringMax }: 250`)
        .min(2, `${ errors.stringMin }: 2`),
      eventStartDate: Yup
        .date()
        .required(errors.required),
      eventStartTime: Yup
        .date()
        .required(errors.required),
    })
  );
}
