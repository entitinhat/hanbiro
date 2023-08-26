import useSnackBar from '@base/hooks/useSnackBar';
import { Menu, MenuItem, Typography } from '@mui/material';
import React, { Fragment, useState, useEffect } from 'react';

import LanguageModal from './TranslatorEditorModal';

// const MENU_ID = 'translation-context-menu';
interface LanguageTranslation {
  enableTrans: boolean;
}

const LanguageTranslation = ({ enableTrans }: LanguageTranslation) => {
  const [langKey, setLangKey] = useState('');
  const [langWords, setLangWords] = useState<string>('');
  const [languageText, setLanguageText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isKey, setIsKey] = useState(false);

  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  //
  const showModalLanguage = () => {
    setShowModal(true);
  };

  //
  const closeModalLanguage = () => {
    setShowModal(false);
  };

  useEffect(() => {
    document.addEventListener('contextmenu', (e: any) => handleMouseDownGetTranslateWorkAndKeyLang(e));

    return () => {
      document.removeEventListener('contextmenu', (e: any) => handleMouseDownGetTranslateWorkAndKeyLang(e));
    };
  }, []);

  // mui
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleMouseDownGetTranslateWorkAndKeyLang = (event: any) => {
    if (event.button === 2 && enableTrans) {
      event.preventDefault();
      const keyLang = event.target?.getAttribute('data-lang-id') as string;
      const langText = event.target.textContent;

      setLangKey(keyLang);
      setLangWords(langText);

      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6
            }
          : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
            null
      );
    }
  };
  const handleSelectMenuTranslate = (type: string) => {
    if (langWords === '') {
      enqueueErrorBar('please select words');
      return;
    }
    if (type === 'words') {
      setLanguageText(langWords);
    } else {
      setLanguageText(langKey || langWords);
    }

    showModalLanguage();
    setContextMenu(null);
  };

  //main render
  return (
    <Fragment>
      <Menu
        open={contextMenu !== null}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <MenuItem onClick={() => handleSelectMenuTranslate('words')}>
          <Typography>
            Translate Words: <strong>{langWords}</strong>
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleSelectMenuTranslate('key')}>
          <Typography>
            Translate Key: <strong>{langKey || langWords}</strong>
          </Typography>
        </MenuItem>
      </Menu>

      {showModal && (
        <LanguageModal
          isKey={isKey}
          showModal={showModal}
          closeModalLanguage={closeModalLanguage}
          keyTranslateWords={languageText}
          translateWords={languageText}
        />
      )}
    </Fragment>
  );
};

export default LanguageTranslation;
