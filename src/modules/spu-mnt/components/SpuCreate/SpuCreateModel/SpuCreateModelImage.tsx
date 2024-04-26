import { Badge, Button, Skeleton } from '@/components/ui';
import { postImagesApi } from '~images/apis';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { Check, CloudUpload, X } from 'lucide-react';
import { memo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { HttpStatusCode } from 'axios';
import Image from 'next/image';
import { TooltipDisplay } from '@/components/common/display';
import { ImageObj } from '@/common/model';

const SpuCreateModelImage = memo(() => {
  const { setValue, watch } = useFormContext<SPUModelSchemaDto>();
  const [loading, setLoading] = useState<boolean>(false);

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
          const newImage: ImageObj = imagesResponse;
          const currentImages = watch('images') || [];

          setValue(
            'images',
            currentImages?.length === 0 || !watch('images')
              ? ([{ ...newImage, isThumbnail: true }] as any)
              : [...currentImages, newImage],
          );
          setLoading(false);
        }
      })();
    },
    maxFiles: 8,
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="flex items-start gap-4 w-max">
      {watch('images')?.map((image, index) => (
        <div className="flex flex-col" key={image.publicId}>
          <div className="h-24 w-24 relative">
            {image.isThumbnail && (
              <Badge variant="secondary" className="absolute left-0 top-[-8px] text-[10px]">
                Mặc định
              </Badge>
            )}
            <Image
              width={96}
              height={96}
              loading="lazy"
              src={(image as any)?.url}
              alt={`image-${image.publicId}`}
            />
          </div>

          <div className="flex items-center justify-center gap-1 mt-2">
            {/* Delete */}
            <Button
              variant="outline"
              className="h-6 w-6 p-0 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setValue(
                  'images',
                  watch('images').filter((_, i) => i !== index),
                );
              }}
            >
              <span className="sr-only">Open menu</span>
              <X className="h-3 w-3" />
            </Button>

            {/* Set Thumbnail */}
            {!image.isThumbnail && (
              <TooltipDisplay
                side="right"
                trigger={
                  <Button
                    variant="outline"
                    className="h-6 w-6 p-0 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue(
                        'images',
                        watch('images').map((image, i) => ({ ...image, isThumbnail: i === index })),
                      );
                    }}
                  >
                    <span className="sr-only">Open menu</span>
                    <Check className="h-3 w-3" />
                  </Button>
                }
                content="Chọn làm mặc định"
              />
            )}
          </div>
        </div>
      ))}

      {loading && <Skeleton className="w-24 h-24" />}

      <div className="w-24 h-24 border-dashed border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center gap-1">
        <input {...getInputProps()} />
        <CloudUpload />
        <span className="text-[12px] font-semibold">Upload</span>
      </div>
    </div>
  );
});

SpuCreateModelImage.displayName = SpuCreateModelImage.name;

export default SpuCreateModelImage;
