import * as yup from 'yup';

export const portfolioStockValidationSchema = yup.object().shape({
  portfolio_id: yup.string().nullable(),
  stock_id: yup.string().nullable(),
});
