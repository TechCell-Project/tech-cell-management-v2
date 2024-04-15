'use client';

import { useForm } from 'react-hook-form';
import { SkuCreateNew } from '../../models';

export const SkuCreate = () => {
  const createSkuFrom = useForm<SkuCreateNew>({});
  return <></>;
};
