import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';

import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import './assets/scss/main.scss';

import { IntroOptions, IntroSteps } from './types';

import { useRecoilState } from 'recoil';
import { introItem } from './store/atoms';

import _ from 'lodash';
import { useIntroSetting } from '@base/hooks/user-setting/useIntroSetting';
import useDevice from '@base/hooks/useDevice';
import IntroSkipDialog from './IntroSkipDialog';
interface IntroStepsProps {
  /**The component uses introkey to get data from atom and return {steps, currentStep, nextStep}. If introkey does not exist. Nothing will appear */
  introKey: string;
  /**Intro will open or not in the first time  */
  defaultOpen: boolean;
  /**This is intro options */
  otherConfig?: IntroOptions;
  /**This function will return keyIntro which doest not exist in atom. Using this when you want to change introkey if it does not exist  */
  onSkip?: (keyInstro: string) => void;
}
const IntroSteps = (props: IntroStepsProps) => {
  const { defaultOpen, introKey, otherConfig, onSkip } = props;

  const { introSetting, saveIntroSetting, isLoading, isSuccess } = useIntroSetting();

  const [stepsEnabled, setStepsEnabled] = useState(false);
  //Waiting Drawer or DOM open/mount completely, then intro will be opened
  const setOpenIntroDebound = useRef(
    _.debounce((openIntro) => {
      setStepsEnabled(openIntro);
    }, 400)
  ).current;

  const [isVisible, setIsVisible] = useState(false);
  const [introSteps, setIntroSteps] = useState<IntroSteps[]>([]);
  const [isOpenSkipDiaglog, setIsOpenSkipDiaglog] = useState(false);

  const [intro, setIntro] = useRecoilState(introItem);

  const stepRef = useRef<any | null>(null);

  const { isMobile } = useDevice();

  //======================================handle=======================================================
  const isLastStep = (): boolean => {
    const introItem = intro[introKey];
    const lastStep = introItem.steps.length - 1;
    const currentStep = introItem.currentStep;
    if (currentStep === lastStep) return true;
    return false;
  };
  //Save menu
  const onComplete = () => {
    let oldValue: string[] = [];
    if (introSetting) {
      oldValue = JSON.parse(introSetting.value);
    }
    const result = _.uniq([...oldValue, introKey]);
    // console.log("complete Result: ",result)
    saveIntroSetting(result);
    onSkip && onSkip(introKey);
    setIsOpenSkipDiaglog(false);
  };

  const onExit = (stepIndex: number) => {
    if (stepsEnabled) {
      const newStepIndex = stepIndex;
      setIntro({
        ...intro,
        [introKey]: {
          steps: intro[introKey]?.steps ?? [],
          currentStep: newStepIndex,
          nextStep: newStepIndex + 1
        }
      });
      setStepsEnabled(false);
    }
  };

  const handleContinue = () => {
    if (isLastStep()) {
      onComplete();
    } else {
      setIntro({
        ...intro,
        [introKey]: {
          steps: intro[introKey]?.steps ?? [],
          currentStep: intro[introKey]?.currentStep + 1,
          nextStep: intro[introKey]?.nextStep + 1
        }
      });
      // onOpen && onOpen();
      setStepsEnabled(true);
    }

    setIsOpenSkipDiaglog(false);
  };

  //Using this function to debug, reset introSetting to [] from server
  const onReset = () => {
    saveIntroSetting([]);
  };

  //===================================++End handle ============================================================
  useEffect(() => {
    const introItem = intro[introKey];
    let enabled = false;

    if (introItem) {
      let lastStep = introItem.steps.length - 1;
      if (introItem.currentStep <= lastStep) {
        enabled = true;
      }
      // console.log('Get Started lastStep:', lastStep);
      // console.log('Get Started currentStep:', introItem.currentStep);
    }

    //The intro will be moved to the center if the element step is not exist.
    //I want to move intro to center,so i removed the element step in Mobile mode.
    if (introItem && isMobile) {
      const mobileIntroStep = introItem.steps.map((step) => {
        return {
          ...step,
          element: '.mobile-step' // This element is not exist
        };
      });
      setIntroSteps([...mobileIntroStep]);
    } else if (introItem && !isMobile) {
      setIntroSteps([...introItem.steps]);
    }
    //If user finished this intro,the enabled setting would be false
    if (introSetting) {
      // console.log('introSetting', introSetting);
      let finishIntroMenu = JSON.parse(introSetting.value);
      if (finishIntroMenu.includes(introKey)) {
        // if introkey has already been finished, this would have been skipped
        enabled = false;
      }
    }
    //Waiting server sends data completely
    if (isSuccess) {
      if (!enabled) {
        onSkip && onSkip(introKey);
      }
      setOpenIntroDebound(enabled && defaultOpen);
    }

    //This condition is necessary when you have more than one scenario, It will skips this scenario  user finish

    // console.log('Enabled->', enabled);
    // console.log('defaultOpen->', defaultOpen);
  }, [defaultOpen, introKey, introSetting?.value, isMobile, isSuccess]);

  //Initial Customize UI Tooltip Intro. Becasue introjs-skipbutton is moved to top in current version
  useEffect(() => {
    if (isVisible) {
      let skipButton = document.querySelector('.introjs-skipbutton');
      let tooltipButtom = document.querySelector('.introjs-tooltipbuttons');
      if (skipButton && tooltipButtom && stepsEnabled) {
        skipButton.classList.remove('introjs-skipbutton');
        skipButton.classList.add('introjs-button', 'introjs-custom-skipbutton');
        skipButton.addEventListener('click', function () {
          // setIsOpenSkipDiaglog(true);
          onComplete();
        });
        tooltipButtom.appendChild(skipButton);
      }
    }

    // console.log('skipButton', skipButton);
    // console.log('tooltipButtom', tooltipButtom);
    // console.log('stepsEnabled', stepsEnabled);
  }, [isVisible]);

  useEffect(() => {
    //I will trigger initial customize UI when step is enabled
    if (stepRef.current?.isVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [stepsEnabled]);
  //==========================================================================Debug=========================================

  //========================================================================================================================

  //===========================================Configuration============================================================
  const introOptions: IntroOptions = {
    showProgress: true,
    skipLabel: 'Skip',
    exitOnOverlayClick:false,
    // disableInteraction: true,
    // showStepNumbers: true,
    ...otherConfig
  };
  //========================================================================================================================
  return (
    <>
      <Steps
        ref={stepRef}
        options={introOptions}
        enabled={stepsEnabled}
        steps={introSteps}
        initialStep={intro[introKey]?.currentStep ?? 0}
        onExit={onExit}
        onComplete={onComplete}
      />
      {isOpenSkipDiaglog && (
        <IntroSkipDialog isLastStep={isLastStep()} onClose={handleContinue} onSkip={onComplete} isOpen={isOpenSkipDiaglog} />
      )}
      {/* <Button onClick={onReset}>Reset Intro</Button> */}
    </>
  );
};

export default IntroSteps;
