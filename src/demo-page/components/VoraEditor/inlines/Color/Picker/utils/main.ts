const TEXT_COLOR_CACHE = 'editor-js-text-color-cache';

/**
 * Convert CSS variables to color string.
 * @param colorValue original value provided by users
 * @returns string color string
 */
export function handleCSSVariables(colorValue: string) {
  if (isColorVariable(colorValue)) {
    const variableName = extractVariableName(colorValue);
    return getCSSPropertyValue(variableName || '');
  }
  return colorValue;
}

function extractVariableName(colorValue: string) {
  const regexResult = /\((.*?)\)/.exec(colorValue);
  if (regexResult) return regexResult[1];
}

function getCSSPropertyValue(variableName: string) {
  return window.getComputedStyle(document.documentElement).getPropertyValue(variableName);
}

function isColorVariable(colorValue: string) {
  return isString(colorValue) && colorValue.includes('--');
}

function isString(stringInput: any) {
  return typeof stringInput === 'string' || stringInput instanceof String;
}

export function throttle(fn: any, delay: number) {
  let id: any;
  return (...args: any) => {
    if (!id) {
      id = setTimeout(() => {
        fn(...args);
        id = null;
      }, delay);
    }
  };
}

/**
 * Cache the latest text/marker color
 * @param defaultColor
 * @param pluginType
 * @returns defaultColor
 */
export function setDefaultColorCache(defaultColor: string, pluginType: string) {
  sessionStorage.setItem(`${TEXT_COLOR_CACHE}-${pluginType}`, JSON.stringify(defaultColor));
  return defaultColor;
}

/**
 * Get cached text/marker color
 * @param defaultColor
 * @param pluginType
 * @returns string cachedDefaultColor/defaultColor
 */
export function getDefaultColorCache(defaultColor: string, pluginType: string) {
  const cachedDefaultColor = sessionStorage.getItem(`${TEXT_COLOR_CACHE}-${pluginType}`);
  return cachedDefaultColor ? JSON.parse(cachedDefaultColor) : defaultColor;
}

/**
 * Cache custom color
 * @param customColor,
 * @param pluginType
 */
export function setCustomColorCache(customColor: string, pluginType: string) {
  sessionStorage.setItem(`${TEXT_COLOR_CACHE}-${pluginType}-custom`, JSON.stringify(customColor));
}

/**
 * Get cached custom color
 * @param pluginType
 * @returns string cachedCustomColor
 */
export function getCustomColorCache(pluginType: string) {
  const cachedCustomColor = sessionStorage.getItem(`${TEXT_COLOR_CACHE}-${pluginType}-custom`);
  return cachedCustomColor ? JSON.parse(cachedCustomColor) : null;
}

export const CONVERTER_BTN = 'ce-inline-toolbar__dropdown';
export const CONVERTER_PANEL = 'ce-conversion-toolbar--showed';
