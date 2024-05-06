const urlPathRegex = /^(https?:\/\/[^/]+)?\/.*$/;
const yearPathRegex = /^\/(\d\d\d\d)\/(.+)?$/;

/**
 * Checks if the given value is a path.
 * @param {string} value path or URL or other string
 * @returns {boolean} true if given value is a path.
 */
export function isPath(value) {
  if (value) {
    const urlPathMatch = value.match(urlPathRegex);
    if (urlPathMatch) {
      return urlPathMatch[1] === undefined;
    }
  }
  return false;
}

/**
 * Checks if the given value is a URL.
 * @param {string} value path or URL or other string
 * @returns {boolean} true if given value is a URL
 */
export function isUrl(value) {
  if (value) {
    const urlPathMatch = value.match(urlPathRegex);
    if (urlPathMatch) {
      return urlPathMatch[1] !== undefined;
    }
  }
  return false;
}

/**
 * Checks if the given value is a path, or a full URL.
 * @param {string} value path or URL or other string
 * @returns {boolean} true if given value is path or URL
 */
export function isUrlOrPath(value) {
  if (value) {
    return value.match(urlPathRegex) != null;
  }
  return false;
}

/**
 * Get pathname from given url or path.
 * @param {string} value path or URL
 * @returns {string} Path name or undefined if given string is not a path or URL.
 */
export function getPathName(value) {
  if (isUrl(value)) {
    return new URL(value).pathname;
  }
  if (isPath(value)) {
    return value;
  }
  return undefined;
}

/**
 * Gets the document name (last part of path).
 * @param {string} value Path or URL
 * @returns {string} Document name or undefined if given string is not a path or URL.
 */
export function getDocumentName(value) {
  const pathName = getPathName(value);
  if (pathName) {
    const lastSlash = pathName.lastIndexOf('/');
    const documentName = pathName.substring(lastSlash + 1);
    if (documentName !== '') {
      return documentName;
    }
  }
  return undefined;
}

/**
 * Gets year from given path.
 * @param {string} pathName Path name.
 * @returns {number} Year or undefined
 */
export function getYearFromPath(pathName) {
  const yearPathMatch = removeXWalkPrefix(pathName).match(yearPathRegex);
  if (yearPathMatch) {
    return parseInt(yearPathMatch[1], 10);
  }
  return undefined;
}

/**
 * Remove /content/... prefix that may be present in author environment.
 * @param {string} pathName Path name.
 * @returns {string} Path name without /content/... prefix.
 */
export function removeXWalkPrefix(pathName) {
  const prefix = '/content/adaptto/xwalk'
  if (pathName.startsWith(prefix)) {
    return pathName.substring(prefix.length);
  }
  return pathName
}
