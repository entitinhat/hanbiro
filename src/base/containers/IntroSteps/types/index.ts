export interface IntroSteps {
  /**
   * CSS selector or element to use for the step.
   */
  element?: string | HTMLElement | Element;
  /**
   * The tooltip content.
   */
  intro: string | React.ReactNode;
  /**
   * Position of the tooltip.
   */
  position?: string;
  /**
   * The tooltip title.
   */
  title?: string;
  /**
   * CSS class of the tooltip.
   */
  tooltipClass?: string;
  /**
   * CSS class of the helperLayer.
   */
  highlightClass?: string;
}

export interface IntroMenu {
  description: string;
  image: string;
  introKey: string;
  title: string;
}

export interface IntroOptions {
  /**  Next button label in tooltip box */
  nextLabel?: string; //Default:"Next"
  /**  Previous button label in tooltip box */
  prevLabel?: string; //Default:"Back"
  /**  Skip button label in tooltip box.Default:'x' */
  skipLabel?: string;
  /**  Done button label in tooltip box.Default:"Done */
  doneLabel?: string;
  /** Hide previous button in the first step? Otherwise, it will be disabled button. Default: false*/
  hidePrev?: boolean;
  /**  Hide next button in the last step? Otherwise, it will be disabled button (note: this will also hide the "Done" button).Default: false */
  hideNext?: boolean;
  /**  Change the Next button to Done in the last step of the intro? otherwise, it will render a disabled button. Default: true */
  nextToDone?: boolean;
  /** Default tooltip box position. Default: Bottom */
  tooltipPosition?: string;
  /** Next CSS class for tooltip boxes. Default:'' */
  tooltipClass?: string;
  /**  CSS class that is added to the helperLayer. Default:'' */
  highlightClass?: string;
  /**  Close introduction when pressing Escape button?. Default: true */
  exitOnEsc?: boolean;
  /**  Close introduction when clicking on overlay layer?. Default: true */
  exitOnOverlayClick?: boolean;
  /**  Show step numbers in introduction?. Default: false */
  showStepNumbers?: boolean;
  /**  Let user use keyboard to navigate the tour?. Default: true */
  keyboardNavigation?: boolean;
  /** Show tour control buttons? .Default: true*/
  showButtons?: boolean;
  /**  Show tour bullets?. Default: true*/
  showBullets?: boolean;
  /**  Show tour progress?. Default: false */
  showProgress?: boolean;
  /** Scroll to highlighted element?. Default: true */
  scrollToElement?: boolean;
  /*
   * Should we scroll the tooltip or target element?
   *
   * Options are: 'element' or 'tooltip'
   */
  scrollTo?: 'element' | 'tooltip';
  /**  Padding to add after scrolling when element is not in the viewport (in pixels). Default: 30 */
  scrollPadding?: number;
  /**  Set the overlay opacity. Default: 0.5 */
  overlayOpacity?: number;
  /** To determine the tooltip position automatically based on the window.width/height. Default: boolean */
  autoPosition?: boolean;
  /* Precedence of positions, when auto is enabled */
  positionPrecedence?: ['bottom', 'top', 'right', 'left'];
  /**  Disable an interaction with element? . Default: false*/
  disableInteraction?: boolean;
  /** Set how much padding to be used around helper element. Default: 10 */
  helperElementPadding?: number;
  /**  Default hint position. Default: "top-middle" */
  hintPosition?: string;
  /**  Hint button label. Default: "Got it" */
  hintButtonLabel?: string;
  /** Adding animation to hints?. Default: true*/
  hintAnimation?: boolean;
  /**  additional classes to put on the buttons. default:"introjs-button" */
  buttonClass?: string;
  /** additional classes to put on progress bar. Default: false */
  progressBarAdditionalClass?: boolean;
}
