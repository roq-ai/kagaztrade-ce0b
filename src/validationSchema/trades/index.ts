import * as yup from 'yup';

export const tradeValidationSchema = yup.object().shape({
  type: yup.string().required(),
  quantity: yup.number().integer().required(),
  price: yup.number().integer().required(),
  stock_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
