import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import ImageSlider from '@base/components/@hanbiro/ImageSlider';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

// menu import
import * as keyNames from '@product/item/config/keyNames';
import { queryKeys } from '@product/item/config/queryKeys';
import { Item } from '@product/item/types/item';
import Images from '@product/item/containers/Images';
import { IMAGE_MODULE_PRODUCT_ITEM, INVENTORY_TYPE_INVENTORY, PRODUCT_ITEM_TYPE_ENUM_COMPOSITE } from '@product/main/config/constants';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // onRefetch?: () => void;
}

const INVENTORY_FIELDS: string[] = [keyNames.KEY_ITEM_STOCK_ON_HAND, keyNames.KEY_ITEM_REPLENISHMENT_POINT, keyNames.KEY_ITEM_SKU];
const COMPOSITE_IGNORE_FIELDS: string[] = [keyNames.KEY_ITEM_ATTR_VALUES];

const Left = (props: LeftProps) => {
  const { layoutData, ignoreFields = [] } = props;
  const { menuSource, menuSourceId } = layoutData;
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [leftIgnoreFields, setLeftIgnoreFields] = useState<string[]>([
    ...ignoreFields,
    // keyNames.KEY_ITEM_NAME,
    keyNames.KEY_ITEM_UNIT,
    keyNames.KEY_ITEM_UNIT_VALUE_QTY,
    keyNames.KEY_ITEM_UNIT_PRICE,
    keyNames.KEY_ITEM_IMAGES,
    keyNames.KEY_ITEM_OPEN_STOCK
  ]);

  // get viewData from queryClient
  const data = queryClient.getQueryData<Item>([queryKeys.viewItem, menuSourceId]);
  const [images, setImages] = useState<any[]>([]);
  const inventoryType = data?.[keyNames.KEY_ITEM_INVENTORY_TYPE];
  const itemType = data?.[keyNames.KEY_ITEM_TYPE];
  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {};

  const handleOnClose = (keyName: string, value: any) => {};

  const handleImageClose = (imageData: any[]) => {
    if (_.isArray(imageData)) {
      setImages(imageData);
    }
    setShowEdit(false);
  };

  useEffect(() => {
    if (data?.[keyNames.KEY_ITEM_IMAGES]) {
      setImages(data?.[keyNames.KEY_ITEM_IMAGES]);
    }
  }, [data?.[keyNames.KEY_ITEM_IMAGES]]);

  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFields}
            ignoreFields={
              inventoryType != INVENTORY_TYPE_INVENTORY
                ? _.concat(leftIgnoreFields, INVENTORY_FIELDS)
                : itemType == PRODUCT_ITEM_TYPE_ENUM_COMPOSITE
                ? _.concat(leftIgnoreFields, COMPOSITE_IGNORE_FIELDS)
                : leftIgnoreFields
            }
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            setQueryData={[queryKeys.viewItem, menuSourceId as string]}
            column={1}
            readOnly={data?.restore?.id ? true : false}
            divider
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId, data, inventoryType]);

  const ImageViewMemo = useMemo(() => {
    return showEdit ? (
      <Images
        menuSource={menuSource}
        menuSourceId={menuSourceId}
        // value={images ?? []}
        value={images}
        onClose={handleImageClose}
      />
    ) : (
      <ImageSlider
        sx={{ p: 2 }}
        // images={images?.map((image: any) => image?.name) || []}
        // thumbs={images?.map((image: any) => image?.name) || []}
        images={images}
        allowZoom={true}
        showSlider={images?.length > 0}
        vertical={false}
        onEdit={
          data?.restore?.id
            ? undefined
            : () => {
                setShowEdit(true);
              }
        }
        sliderHeight={200}
        moduleDownload={IMAGE_MODULE_PRODUCT_ITEM}
      />
    );
  }, [images, showEdit]);

  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_common_summary'),
      sections: [
        {
          component: ImageViewMemo
        },
        {
          component: FieldsMemo
        }
      ]
    }
  ];

  return <ViewLeft items={leftItems} />;
};

export default Left;
