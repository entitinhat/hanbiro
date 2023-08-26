import { atom, selector } from 'recoil';

import { ICard, ICategory, IColumn, IStatus } from './Interface';

const mockColumns: IColumn[] = [
  {
    id: IStatus.BACKLOG,
    title: 'Backlog',
    cardsIds: ['5be53f27-a69c-4128-bf40-86cd572267a5', '6ed5a4b0-1e2c-4b71-ab42-e740f02da496', '55cac86b-c223-4eed-992a-e231e9232d42']
  },
  {
    id: IStatus.TO_DO,
    title: 'To Do',
    cardsIds: ['a04170d8-5f03-4a97-bbd7-cbc9516d0840']
  },
  {
    id: IStatus.DOING,
    title: 'Doing',
    cardsIds: ['2fab1909-0b9f-4783-976c-4ffecb805ac5']
  },
  {
    id: IStatus.IN_REVIEW,
    title: 'In Review',
    cardsIds: ['32eb3393-eddc-487a-abc3-1c199b86c4a2']
  },
  {
    id: IStatus.DONE,
    title: 'Done',
    cardsIds: ['29065b36-8873-4ccd-8c42-dcff14736650', '74d031c0-59bb-4f4b-9910-71bb1c88c624']
  }
];

const mockCards: ICard[] = [
  {
    id: '2fab1909-0b9f-4783-976c-4ffecb805ac5',
    category: ICategory.BUG,
    title: 'Reset password button not working',
    description: 'The button does not contain any feedback, when you click on it, it does nothing',
    status: IStatus.DOING,
    hidden: false
  },
  {
    id: '5be53f27-a69c-4128-bf40-86cd572267a5',
    category: ICategory.FEATURE,
    title: 'Create clear filters button',
    description: 'The user can select the filters but they should also be able to clear them without having to reload the page',
    status: IStatus.BACKLOG,
    hidden: false
  },
  {
    id: '6ed5a4b0-1e2c-4b71-ab42-e740f02da496',
    category: ICategory.INFRA,
    title: 'Set up the staging environment',
    description: '',
    status: IStatus.BACKLOG,
    hidden: false
  },
  {
    id: '55cac86b-c223-4eed-992a-e231e9232d42',
    category: ICategory.DEPLOY,
    title: 'Send first deploy to prod',
    description: '',
    status: IStatus.BACKLOG,
    hidden: false
  },
  {
    id: '74d031c0-59bb-4f4b-9910-71bb1c88c624',
    category: ICategory.FEATURE,
    title: 'Create landing page',
    description: '',
    status: IStatus.DONE,
    hidden: false
  },
  {
    id: 'a04170d8-5f03-4a97-bbd7-cbc9516d0840',
    category: ICategory.REFACTOR,
    title: 'Make the onDragEnd function more efficient',
    description: '',
    status: IStatus.TO_DO,
    hidden: false
  },
  {
    id: '29065b36-8873-4ccd-8c42-dcff14736650',
    category: ICategory.DEPLOY,
    title: 'Send first deploy to develop environment',
    description: '',
    status: IStatus.DONE,
    hidden: false
  },
  {
    id: '32eb3393-eddc-487a-abc3-1c199b86c4a2',
    category: ICategory.FEATURE,
    title: 'Create light and dark theme switch',
    description: '',
    status: IStatus.IN_REVIEW,
    hidden: false
  }
];

const statuses: IStatus[] = [IStatus.BACKLOG, IStatus.TO_DO, IStatus.DOING, IStatus.IN_REVIEW, IStatus.DONE];

interface ColumnsState {
  columns: IColumn[];
  updatedColumns: IColumn[] | undefined;
}

const initialColumn: ColumnsState = {
  columns: mockColumns,
  updatedColumns: undefined
};

export const columnsAtom = atom<ColumnsState>({
  key: 'columnsAtom',
  default: initialColumn
});

// const columnsSelector = selector({
//   key: 'columnsSelector',
//   get: ({ get }) => ({ ...get(columnsAtom), extraField: 'hi' }),
//   set: ({ set }, newValue) => set(columnsAtom, newValue)
// });

interface CardsState {
  cards: ICard[];
  searchText: string;
}

const initialCard: CardsState = {
  cards: mockCards,
  searchText: ''
};

export const cardsAtom = atom<CardsState>({
  key: 'cardsAtom',
  default: initialCard
});

export const categoryAtom = atom({
  key: 'categoryAtom',
  default: Object.values(ICategory)
});

export const cardsWithFilter = selector({
  key: 'cardsWithFilter',
  get: ({ get }) => {
    const state = get(cardsAtom);
    const searchText = state.searchText;
    const categories = get(categoryAtom);

    const filteredCards: ICard[] = state.cards.map((card) => {
      if (searchText.length > 0) {
        if (card.title.toUpperCase().includes(searchText.toUpperCase()) && categories.includes(card.category))
          return { ...card, hidden: false };
      } else {
        if (categories.includes(card.category)) return { ...card, hidden: false };
      }
      return { ...card, hidden: true };
    });

    return filteredCards;
  }
});
