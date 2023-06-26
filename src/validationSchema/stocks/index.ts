import * as yup from 'yup';

export const stockValidationSchema = yup.object().shape({
  symbol: yup.string().required(),
  name: yup.string().required(),
  exchange_id: yup.string().nullable(),
});
