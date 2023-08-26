import React, { useState } from 'react';

import OnlineStorageUsedTable from '@settings/billing-license/components/OnlineStoragesUsedTable';

import PurchasingModal from '@settings/billing-license/components/LicenseModal/Purchasing';
const OnlineStorageUsed = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <OnlineStorageUsedTable handleOpen={() => setShowModal(true)} />
      <PurchasingModal isOpen={showModal} onClose={handleClose} />
    </>
  );
};
export default OnlineStorageUsed;
