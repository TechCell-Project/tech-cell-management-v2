'use client';

import { SearchRequest } from '@/common/model';
import { getListAttributeApi } from '~attribute-mnt/apis';
import { useAttributeStore } from '~attribute-mnt/store';
import { getListSpuApi } from '~spu-mnt/apis';
import { useSpuStore } from '~spu-mnt/store';
import { useTagStore } from '~tag-mnt/store';
import { getSearchParams } from '@/utilities/func.util';
import { useEffect } from 'react';
import { getListTagApi } from '@/modules/tag-mnt/apis';

export const useFetchOptionData = () => {
  const { listSpu, getListSuccess: getListSpuSuccess, reset: resetSpu } = useSpuStore();
  const { listTag, getListSuccess: getListTagSuccess, reset: resetTag } = useTagStore();
  const {
    listAttribute,
    getListSuccess: getListAttrSuccess,
    reset: resetAttr,
  } = useAttributeStore();

  useEffect(() => {
    const fetchInitData = () => {
      const params = getSearchParams(new SearchRequest(1, 100));

      getListSpuApi(params)
        .then(({ data }) => getListSpuSuccess(data))
        .catch(() => {
          throw new Error();
        });

      getListAttributeApi(params + '&sort=' + JSON.stringify([{ orderBy: 'label', order: 'asc' }]))
        .then(({ data }) => getListAttrSuccess(data))
        .catch(() => {
          throw new Error();
        });

      getListTagApi(params)
        .then(({ data }) => getListTagSuccess(data))
        .catch(() => {
          throw new Error();
        });
    };
    fetchInitData();

    return () => {
      resetSpu();
      resetTag();
      resetAttr();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { listSpu, listAttribute, listTag };
};
