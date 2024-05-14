import { append } from '../../scripts/utils/dom.js';
import { externalizeXWalkPrefixLink } from '../../scripts/utils/path.js';
import { getParentPath, getSchedulePath } from '../../scripts/utils/site.js';

/**
 * Talk Detail footer with back to schedule link.
 * @param {Element} block
 */
export default async function decorate(block) {
  const p = append(block, 'p');

  const parentPath = getParentPath(document.location.pathname);
  const schedulePath = getSchedulePath(document.location.pathname);

  const backLink = append(p, 'a');
  backLink.href = externalizeXWalkPrefixLink(parentPath);
  if (parentPath === schedulePath) {
    backLink.textContent = 'Back to schedule';
  } else {
    backLink.textContent = 'Back to parent';
  }
}
