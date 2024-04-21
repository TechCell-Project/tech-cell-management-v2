'use client';

import { useEffect } from 'react';
import { SearchRequest } from '@/common/model';
import { getListAttributeApi } from '~attribute-mnt/apis';
import { useAttributeStore } from '~attribute-mnt/store';
import { getListBrandApi } from '~brand-mnt/apis';
import { useBrandStore } from '~brand-mnt/store';
import { getSearchParams } from '@/utilities/func.util';

export const useFetchOptionData = () => {
  const { listBrand, getListSuccess: getListBrandSuccess, reset: resetBrand } = useBrandStore();
  const {
    listAttribute,
    getListSuccess: getListAttrSuccess,
    reset: resetAttr,
  } = useAttributeStore();

  useEffect(() => {
    const fetchInitData = () => {
      const params = getSearchParams(new SearchRequest(1, 100));

      getListBrandApi(params + '&sort=' + JSON.stringify([{ orderBy: 'slug', order: 'asc' }]))
        .then(({ data }) => getListBrandSuccess(data))
        .catch(() => {
          throw new Error();
        });

      getListAttributeApi(params + '&sort=' + JSON.stringify([{ orderBy: 'label', order: 'asc' }]))
        .then(({ data }) => getListAttrSuccess(data))
        .catch(() => {
          throw new Error();
        });
    };
    fetchInitData();

    return () => {
      resetBrand();
      resetAttr();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { listBrand, listAttribute };
};
