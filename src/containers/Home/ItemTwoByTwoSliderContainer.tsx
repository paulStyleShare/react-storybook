import React from 'react';

import { GoodsOverviewSchema } from '~schemas/goods';

import ItemTwoByTwoSliderPresentational from './presentationals/ItemTwoByTwoSliderContainer';
const ItemTwoByTwoSliderContainer: React.FC = () => {
  const title = '123';
  const size = 4;
  const datas: GoodsOverviewSchema[] = [
    {
      brand: { id: 6187, name: '\uae30\ube0c\uc720' },
      discountRate: 0,
      id: 361573,
      isDiscounted: false,
      name:
        '\ubb34\ub8cc\ubc30\uc1a1 \u2605\ub2f9\uc77c\ubc1c\uc1a1\u2605 \ud3ec\ub2c8 \ub77c\uc774\ub354 \uc790\ucf13',
      picture: {
        id: '15f620c6-c9af-462f-9f60-e7ff042bfb92',
        originalHeight: 640,
        originalWidth: 640,
      },
      price: 35000,
      priceOriginal: 0,
      reviewsCount: 3,
      status: 'normal',
    },
    {
      brand: { id: 6227, name: '\uba38\ubb38' },
      discountRate: 0,
      id: 390132,
      isDiscounted: false,
      name:
        '\ubb34\ub8cc\ubc30\uc1a1 \ub0a8\ub140\uacf5\uc6a9 \ub85c\uc800 \ub8e8\uc988\ud54f \ub77c\uc774\ub354 \uc790\ucf13',
      picture: {
        id: 'bd43b84b-75b0-4c6e-bd56-906cb72194a9',
        originalHeight: 1000,
        originalWidth: 1000,
      },
      price: 49800,
      priceOriginal: 0,
      reviewsCount: 0,
      status: 'normal',
    },
    {
      brand: { id: 6156, name: '\ubc18\ud574\uc368' },
      discountRate: 6,
      id: 388556,
      isDiscounted: true,
      name:
        '[\ubb34\ub8cc\ubc30\uc1a1][\ub2f9\uc77c\ubc1c\uc1a1]\ucee4\ud50c \uc624\ubc84\ud54f \ub77c\uc774\ub354\uc790\ucf13 O#S002',
      picture: {
        id: 'a918fea5-c019-4640-9f97-c5bafb5b018f',
        originalHeight: 1000,
        originalWidth: 1000,
      },
      price: 48000,
      priceOriginal: 51000,
      reviewsCount: 2,
      status: 'normal',
    },
    {
      brand: { id: 6234, name: '\ubaa8\ube44' },
      discountRate: 20,
      id: 383586,
      isDiscounted: true,
      name:
        '[\ubb34\ub8cc\ubc30\uc1a1] \uc2ac\ub9bc \ub77c\uc774\ub354 \uac00\uc8fd\uc790\ucf13',
      picture: {
        id: '900b6f7c-0412-4a1d-9d01-acf03654fb05',
        originalHeight: 720,
        originalWidth: 720,
      },
      price: 44000,
      priceOriginal: 55000,
      reviewsCount: 0,
      status: 'normal',
    },
    {
      brand: { id: 6119, name: '\ud150\ud37c\uc13c\ud2b8' },
      discountRate: 7,
      id: 380999,
      isDiscounted: true,
      name:
        '\uc5ec\uc131\uc6a9 \ub7f0\ub3c4 \ub77c\uc774\ub354 \uac00\uc8fd \uc790\ucf13',
      picture: {
        id: 'eda0330d-0fc4-4e8f-a44f-41205cb6fa22',
        originalHeight: 1000,
        originalWidth: 1000,
      },
      price: 99900,
      priceOriginal: 106400,
      reviewsCount: 0,
      status: 'normal',
    },
    {
      brand: { id: 4757, name: '\ub2c9\uc564\ub2c8\ucf5c' },
      discountRate: 30,
      id: 373810,
      isDiscounted: true,
      name: 'SKIN ZIP RIDER JACKET_BEIGE',
      picture: {
        id: 'c42f1346-9ae1-4a52-a6a4-7cbf3dc255b7',
        originalHeight: 720,
        originalWidth: 720,
      },
      price: 139300,
      priceOriginal: 199000,
      reviewsCount: 0,
      status: 'normal',
    },
    {
      brand: { id: 4757, name: '\ub2c9\uc564\ub2c8\ucf5c' },
      discountRate: 30,
      id: 373808,
      isDiscounted: true,
      name: 'SKIN ZIP RIDER JACKET_BLACK',
      picture: {
        id: '8169938c-ed30-4cfb-9ef3-aa2d4aa29b08',
        originalHeight: 720,
        originalWidth: 720,
      },
      price: 139300,
      priceOriginal: 199000,
      reviewsCount: 0,
      status: 'normal',
    },
    {
      brand: { id: 6202, name: '\ud2b8\ub808\uc838' },
      discountRate: 0,
      id: 363520,
      isDiscounted: false,
      name:
        '\ud2b8\ub808\uc838 \ubb34\ub8cc\ubc30\uc1a1 \ub808\ub354 \ub77c\uc774\ub354\uc790\ucf13',
      picture: {
        id: 'db272ad7-96fa-42e7-a22b-761156ccfeeb',
        originalHeight: 600,
        originalWidth: 600,
      },
      price: 55900,
      priceOriginal: 0,
      reviewsCount: 0,
      status: 'normal',
    },
  ];

  return (
    <ItemTwoByTwoSliderPresentational datas={datas} size={size} title={title} />
  );
};

export default ItemTwoByTwoSliderContainer;
