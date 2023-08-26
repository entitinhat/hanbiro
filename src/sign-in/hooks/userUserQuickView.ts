export const useUserQuickView = (id: string) => {
  return {
    isLoading: false,
    data: {
      id: id,
      name: 'Hanbiro Test'
    }
  };
};
