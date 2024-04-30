import { ImageObj } from '@/common/model';
import { Button, Skeleton } from '@/components/ui';
import { postImagesApi } from '@/modules/images/apis';
import { useSkuStore } from '@/modules/sku-mnt/store';
import { UpdateSkuDto } from '@techcell/node-sdk';
import { HttpStatusCode } from 'axios';
import { CloudUpload, X } from 'lucide-react';
import Image from 'next/image';
import { memo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

const SkuUpdateImage = () => {
  const { sku } = useSkuStore();
  const { setValue, watch } = useFormContext<UpdateSkuDto>();

  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<ImageObj | undefined>(sku?.image);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    onDrop: (files) => {
      (async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('images', files[0]);

        const { data: imagesResponse, status } = await postImagesApi(formData);
        if (status === HttpStatusCode.Created) {

          setValue('imagePublicId', imagesResponse[0].publicId);
          setImage(imagesResponse[0]);
          setLoading(false);
        }
      })();
    },
    maxFiles: 1,
    multiple: false,
  });


  return (
    <>
      <h3 className="mb-3 font-semibold">Ảnh</h3>
      <div {...getRootProps()} className="flex items-start gap-4 w-max">
        {image && !loading && (
          <div className="flex flex-col">
            <div className="h-24 w-24 relative content-center">
              <Image width={96} height={96} loading="lazy" src={image.url} alt="image-sku" />
            </div>

            <div className="flex items-center justify-center gap-1 mt-2">
              {/* Delete */}
              <Button
                variant="outline"
                className="h-6 w-6 p-0 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(undefined);
                }}
              >
                <span className="sr-only">Open menu</span>
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {loading && <Skeleton className="w-24 h-24" />}

        <div className="w-24 h-24 border-dashed border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center gap-1">
          <input {...getInputProps()} />
          <CloudUpload />
          <span className="text-[12px] font-semibold">Upload</span>
        </div>
      </div>
    </>
  );
};

export default memo(SkuUpdateImage);
