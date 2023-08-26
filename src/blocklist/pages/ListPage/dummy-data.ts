import { generateUUID } from '@base/utils/helpers';

const LeMinhNhatID = generateUUID();
const LeHienLuongID = generateUUID();
const LeThanhVuID = generateUUID();

const customerLeMinhNhatID = generateUUID();
const customerLeHienLuongID = generateUUID();
const customerLeThanhVuID = generateUUID();

// ---------------block------------------

export const block_dummy_data = [
  {
    campaign: { label: 'Campain - LeMinhNhat', id: '123456-789-101112' },
    createdAt: new Date().toISOString(),
    createdBy: {
      id: LeMinhNhatID,
      name: 'Owner - Le Minh Nhat'
    },
    updatedAt: new Date().toISOString(),
    updatedBy: {
      id: LeMinhNhatID,
      name: 'Le Minh Nhat'
    },
    customer: { name: 'Luong + Vu', id: customerLeMinhNhatID },
    emailBlock: '123456@gmail.com',
    emailBounced: '789101112@gmail.com',
    mobileSmsBlock: '5137652453276814'
  },
  {
    campaign: { label: 'Campain - LeMinhNhat', id: '123456-789-101112' },
    createdAt: new Date().toISOString(),
    createdBy: {
      id: LeMinhNhatID,
      name: 'Owner - Le Minh Nhat'
    },
    updatedAt: new Date().toISOString(),
    updatedBy: {
      id: LeMinhNhatID,
      name: 'Le Minh Nhat'
    },
    customer: { name: 'Luong + Vu', id: customerLeMinhNhatID },
    emailBlock: '123456@gmail.com',
    emailBounced: '789101112@gmail.com',
    mobileSmsBlock: '5137652453276814'
  },
  {
    campaign: { label: 'Campain - LeMinhNhat', id: '123456-789-101112' },
    createdAt: new Date().toISOString(),
    createdBy: {
      id: LeMinhNhatID,
      name: 'Owner - Le Minh Nhat'
    },
    updatedAt: new Date().toISOString(),
    updatedBy: {
      id: LeMinhNhatID,
      name: 'Le Minh Nhat'
    },
    customer: { name: 'Luong + Vu', id: customerLeMinhNhatID },
    emailBlock: '123456@gmail.com',
    emailBounced: '789101112@gmail.com',
    mobileSmsBlock: '5137652453276814'
  },
  {
    campaign: { label: 'Campain - Le Hien Luong', id: '123456-789-364876432' },
    createdAt: new Date().toISOString(),
    createdBy: {
      id: LeHienLuongID,
      name: 'Owner - Le Hien Luong'
    },
    updatedAt: new Date().toISOString(),
    updatedBy: {
      id: LeHienLuongID,
      name: 'Le Hien Luong'
    },
    customer: { name: 'Nhat + Vu', id: customerLeHienLuongID },
    emailBlock: '123456@gmail.com',
    emailBounced: '789101112@gmail.com',
    mobileSmsBlock: '5137652453276814'
  },
  {
    campaign: { label: 'Campain - Le Hien Luong', id: '123456-789-364876432' },
    createdAt: new Date().toISOString(),
    createdBy: {
      id: LeHienLuongID,
      name: 'Owner - Le Hien Luong'
    },
    updatedAt: new Date().toISOString(),
    updatedBy: {
      id: LeHienLuongID,
      name: 'Le Hien Luong'
    },
    customer: { name: 'Nhat + Vu', id: customerLeHienLuongID },
    emailBlock: '123456@gmail.com',
    emailBounced: '789101112@gmail.com',
    mobileSmsBlock: '5137652453276814'
  },
  {
    campaign: { label: 'Campain - Le Hien Luong', id: '123456-789-364876432' },
    createdAt: new Date().toISOString(),
    createdBy: {
      id: LeHienLuongID,
      name: 'Owner - Le Hien Luong'
    },
    updatedAt: new Date().toISOString(),
    updatedBy: {
      id: LeHienLuongID,
      name: 'Le Hien Luong'
    },
    customer: { name: 'Nhat + Vu', id: customerLeHienLuongID },
    emailBlock: '123456@gmail.com',
    emailBounced: '789101112@gmail.com',
    mobileSmsBlock: '5137652453276814'
  },
  {
    campaign: { label: 'Campain - Le Thanh Vu', id: '156474567-789-101112' },
    createdAt: new Date().toISOString(),
    createdBy: {
      id: LeThanhVuID,
      name: 'Owner - Le Thanh Vu'
    },
    updatedAt: new Date().toISOString(),
    updatedBy: {
      id: LeThanhVuID,
      name: 'Le Thanh Vu'
    },
    customer: { name: 'Nhat + Luong', id: customerLeThanhVuID },
    emailBlock: '123456@gmail.com',
    emailBounced: '789101112@gmail.com',
    mobileSmsBlock: '5137652453276814'
  },
  {
    campaign: { label: 'Campain - Le Thanh Vu', id: '156474567-789-101112' },
    createdAt: new Date().toISOString(),
    createdBy: {
      id: LeThanhVuID,
      name: 'Owner - Le Thanh Vu'
    },
    updatedAt: new Date().toISOString(),
    updatedBy: {
      id: LeThanhVuID,
      name: 'Le Thanh Vu'
    },
    customer: { name: 'Nhat + Luong', id: customerLeThanhVuID },
    emailBlock: '123456@gmail.com',
    emailBounced: '789101112@gmail.com',
    mobileSmsBlock: '5137652453276814'
  },
  {
    campaign: { label: 'Campain - Le Thanh Vu', id: '156474567-789-101112' },
    createdAt: new Date().toISOString(),
    createdBy: {
      id: LeThanhVuID,
      name: 'Owner - Le Thanh Vu'
    },
    updatedAt: new Date().toISOString(),
    updatedBy: {
      id: LeThanhVuID,
      name: 'Le Thanh Vu'
    },
    customer: { name: 'Nhat + Luong', id: customerLeThanhVuID },
    emailBlock: '123456@gmail.com',
    emailBounced: '789101112@gmail.com',
    mobileSmsBlock: '5137652453276814'
  }
];
