interface ITemplate {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
  active: boolean;
  html: string;
}
export const templateData: ITemplate[] = [
  {
    id: '22a61004-0f03-4cbb-b087-0d76f896e073_1',
    name: 'template 1',
    type: 'TYPE_GENERAL',
    active: false,
    html: JSON.stringify({ html: '', css: '' }),
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_nUt6RVExtDeaxJU20PTfHsfGSsRlOQs3j0aEsY8rXb8M-M449eYNm4WTWSAFydJSwUs&usqp=CAU',
  },
  {
    id: '22a61004-0f03-4cbb-b087-0d76f896e073_2',
    name: 'template 2',
    type: 'TYPE_THANK_YOU',
    active: false,
    html: JSON.stringify({ html: '', css: '' }),
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2FFyQz43CnG-F64FH_PK1YPD5uOiQyVbEnWN1sdPm5bDWhVIuKo78_5EX7UA9VPv5i0&usqp=CAU',
  },
  {
    id: '22a61004-0f03-4cbb-b087-0d76f896e073_3',
    name: 'template 3',
    type: 'TYPE_FOLLOW_UP',
    active: false,
    html: JSON.stringify({ html: '', css: '' }),
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNB9z5T11jfeK_od9JbhoXbBpzBNtaFQn6ynlmAuNyYpbyLFzR7JRSkWued7yAvhJ4eGk&usqp=CAU',
  },
];
