const urlPathRegex = /^(https?:\/\/[^/]+)?\/.*$/;
const yearPathRegex = /^\/(\d\d\d\d)\/(.+)?$/;
const xwalkPrefix = '/content/adaptto/xwalk';

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
 * Remove /content/... prefix that may be present in author environment.
 * @param {string} pathName Path name.
 * @returns {string[]} Array with two element: prefix (may be empty string) and path without prefix.
 */
export function splitXWalkPrefix(pathName) {
  if (pathName.startsWith(xwalkPrefix)) {
    return [xwalkPrefix, pathName.substring(xwalkPrefix.length)];
  }
  return ['', pathName];
}

/**
 * Externalizes URL path by adding X-Walk prefix if current location has X-Walk prefix.
 * @param {string} pathName Path name with our withour X-Walk prefix.
 * @returns Path name with X-Walk prefix if current location has X-Walk prefix.
 */
export function externalizeXWalkPrefix(pathName) {
  const [prefix] = splitXWalkPrefix(document.location.pathname);
  const [, pathNameWithoutPrefix] = splitXWalkPrefix(pathName);
  return prefix + pathNameWithoutPrefix;
}

/**
 * Externalizes URL path by adding X-Walk prefix if current location has X-Walk prefix
 * and - if in author environment - adding html extension.
 * @param {string} pathName Path name with our withour X-Walk prefix.
 * @returns Path name with X-Walk prefix if current location has X-Walk prefix, and .html extension.
 */
export function externalizeXWalkPrefixLink(pathName) {
  const externalized = externalizeXWalkPrefix(pathName);
  if (externalized.startsWith(xwalkPrefix)) {
    const url = new URL(externalized);
    if (url.pathname.endsWith('/')) {
      url.pathname = `${url.pathname}index.html`;
    }
    if (!url.pathname.endsWith('.html')) {
      url.pathname = `${url.pathname}.html`;
    }
    return url.toString();
  }
  return externalized;
}

/**
 * Gets year from given path.
 * @param {string} pathName Path name.
 * @returns {number} Year or undefined
 */
export function getYearFromPath(pathName) {
  const [, pathNameWithoutPrefix] = splitXWalkPrefix(pathName);
  const yearPathMatch = pathNameWithoutPrefix.match(yearPathRegex);
  if (yearPathMatch) {
    return parseInt(yearPathMatch[1], 10);
  }
  return undefined;
}
