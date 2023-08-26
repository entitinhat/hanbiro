import React, { useState } from 'react';
//mui
import AllItemTabTable from '@settings/billing-license/components/AllItemsTab';
import PurchasingTableModal from '@settings/billing-license/components/LicenseModal/PurchasingInTable';

const dummyHeader = [
  { id: 1, name: 'name' },
  { id: 2, name: 'Qty' },
  { id: 3, name: 'Unit Price' },
  { id: 4, name: 'Unit' },
  { id: 5, name: 'Price' }
];

const AllItemTab = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [tag, setTag] = useState({ id: null, product: '', item: '', description: '', unitPrice: '', unit: '', billing: '' });
  const [viewPurchasingItem, setSiewPurchasingItem] = useState('');

  // console.log('fake data: ' + JSON.stringify(fakeData))
  return (
    <>
      <AllItemTabTable
        handleOpen={(tag: any) => {
          setSiewPurchasingItem(tag);
          setShowAdd(true);
        }}
      />
      <PurchasingTableModal
        dataHeader={dummyHeader}
        isOpen={showAdd}
        purchasingData={viewPurchasingItem}
        onClose={() => setShowAdd(false)}
      />
    </>
  );
};
export default AllItemTab;
