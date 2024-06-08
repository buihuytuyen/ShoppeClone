import Routes from '@/constants/path';
import useQueryConfig from '@/hooks/useQueryConfig';
import { ProductSchemaValidation, productSchemaValidation } from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import omit from 'lodash/omit';
import { useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';

export default function useSearchProducts() {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ProductSchemaValidation>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(productSchemaValidation)
  });

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : { ...queryConfig, name: data.name };
    navigate({
      pathname: `${Routes.Home}`,
      search: createSearchParams(config).toString()
    });
  });
  return {
    register,
    onSubmitSearch
  };
}
