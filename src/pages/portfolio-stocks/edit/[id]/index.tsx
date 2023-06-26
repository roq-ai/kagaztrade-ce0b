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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPortfolioStockById, updatePortfolioStockById } from 'apiSdk/portfolio-stocks';
import { Error } from 'components/error';
import { portfolioStockValidationSchema } from 'validationSchema/portfolio-stocks';
import { PortfolioStockInterface } from 'interfaces/portfolio-stock';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PortfolioInterface } from 'interfaces/portfolio';
import { StockInterface } from 'interfaces/stock';
import { getPortfolios } from 'apiSdk/portfolios';
import { getStocks } from 'apiSdk/stocks';

function PortfolioStockEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PortfolioStockInterface>(
    () => (id ? `/portfolio-stocks/${id}` : null),
    () => getPortfolioStockById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PortfolioStockInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePortfolioStockById(id, values);
      mutate(updated);
      resetForm();
      router.push('/portfolio-stocks');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PortfolioStockInterface>({
    initialValues: data,
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
            Edit Portfolio Stock
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'portfolio_stock',
  operation: AccessOperationEnum.UPDATE,
})(PortfolioStockEditPage);
