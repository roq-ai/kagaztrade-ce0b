import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPortfolioStock } from 'apiSdk/portfolio-stocks';
import { Error } from 'components/error';
import { portfolioStockValidationSchema } from 'validationSchema/portfolio-stocks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PortfolioInterface } from 'interfaces/portfolio';
import { StockInterface } from 'interfaces/stock';
import { getPortfolios } from 'apiSdk/portfolios';
import { getStocks } from 'apiSdk/stocks';
import { PortfolioStockInterface } from 'interfaces/portfolio-stock';

function PortfolioStockCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PortfolioStockInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPortfolioStock(values);
      resetForm();
      router.push('/portfolio-stocks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PortfolioStockInterface>({
    initialValues: {
      portfolio_id: (router.query.portfolio_id as string) ?? null,
      stock_id: (router.query.stock_id as string) ?? null,
    },
    validationSchema: portfolioStockValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Portfolio Stock
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<PortfolioInterface>
            formik={formik}
            name={'portfolio_id'}
            label={'Select Portfolio'}
            placeholder={'Select Portfolio'}
            fetcher={getPortfolios}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<StockInterface>
            formik={formik}
            name={'stock_id'}
            label={'Select Stock'}
            placeholder={'Select Stock'}
            fetcher={getStocks}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'portfolio_stock',
  operation: AccessOperationEnum.CREATE,
})(PortfolioStockCreatePage);
