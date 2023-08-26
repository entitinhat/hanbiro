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
