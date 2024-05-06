/* eslint-disable no-unused-expressions */
/* global describe it */

import { expect } from '@esm-bundle/chai';
import {
  getDocumentName,
  getPathName,
  getYearFromPath,
  isPath,
  isUrl,
  isUrlOrPath,
} from '../../../scripts/utils/path.js';

describe('utils/path', () => {
  it('isPath', () => {
    expect(isPath('/')).to.true;
    expect(isPath('/path1')).to.true;
    expect(isPath('/path1/path2')).to.true;
    expect(isPath('https://myhost/path1/path2')).to.false;
    expect(isPath('https://my.host.com/path1/path2')).to.false;
    expect(isPath('https://my.host.com/')).to.false;
    expect(isPath(undefined)).to.false;
    expect(isPath('')).to.false;
    expect(isPath('wurstbrot')).to.false;
    expect(isPath('https://my.host.com')).to.false;
  });

  it('isUrl', () => {
    expect(isUrl('/')).to.false;
    expect(isUrl('/path1')).to.false;
    expect(isUrl('/path1/path2')).to.false;
    expect(isUrl('https://myhost/path1/path2')).to.true;
    expect(isUrl('https://my.host.com/path1/path2')).to.true;
    expect(isUrl('https://my.host.com/')).to.true;
    expect(isUrl(undefined)).to.false;
    expect(isUrl('')).to.false;
    expect(isUrl('wurstbrot')).to.false;
    expect(isUrl('https://my.host.com')).to.false;
  });

  it('isUrlOrPath', () => {
    expect(isUrlOrPath('/')).to.true;
    expect(isUrlOrPath('/path1')).to.true;
    expect(isUrlOrPath('/path1/path2')).to.true;
    expect(isUrlOrPath('https://myhost/path1/path2')).to.true;
    expect(isUrlOrPath('https://my.host.com/path1/path2')).to.true;
    expect(isUrlOrPath('https://my.host.com/')).to.true;
    expect(isUrlOrPath(undefined)).to.false;
    expect(isUrlOrPath('')).to.false;
    expect(isUrlOrPath('wurstbrot')).to.false;
    expect(isUrlOrPath('https://my.host.com')).to.false;
  });

  it('getPathName', () => {
    expect(getPathName('/')).to.eq('/');
    expect(getPathName('/path1')).to.eq('/path1');
    expect(getPathName('/path1/path2')).to.eq('/path1/path2');
    expect(getPathName('https://myhost/path1/path2')).to.eq('/path1/path2');
    expect(getPathName('https://my.host.com/path1/path2')).to.eq('/path1/path2');
    expect(getPathName('https://my.host.com/')).to.eq('/');
    expect(getPathName(undefined)).to.undefined;
    expect(getPathName('')).to.undefined;
    expect(getPathName('wurstbrot')).to.undefined;
    expect(getPathName('https://my.host.com')).to.undefined;
  });

  it('getDocumentName', () => {
    expect(getDocumentName('/')).to.undefined;
    expect(getDocumentName('/path1')).to.eq('path1');
    expect(getDocumentName('/path1/path2')).to.eq('path2');
    expect(getDocumentName('https://myhost/path1/path2')).to.eq('path2');
    expect(getDocumentName('https://my.host.com/path1/path2')).to.eq('path2');
    expect(getDocumentName('https://my.host.com/')).to.undefined;
    expect(getDocumentName(undefined)).to.undefined;
    expect(getDocumentName('')).to.undefined;
    expect(getDocumentName('wurstbrot')).to.undefined;
    expect(getDocumentName('https://my.host.com')).to.undefined;
  });

  it('getYearFromPath', () => {
    expect(getYearFromPath('/')).to.undefined;
    expect(getYearFromPath('/2021/')).to.equal(2021);
    expect(getYearFromPath('/2021/mypage')).to.equal(2021);
    expect(getYearFromPath('/2021/mypage/mysubpage')).to.equal(2021);
    // x-walk
    expect(getYearFromPath('/content/adaptto/xwalk/')).to.undefined;
    expect(getYearFromPath('/content/adaptto/xwalk/2021/')).to.equal(2021);
    expect(getYearFromPath('/content/adaptto/xwalk/2021/mypage')).to.equal(2021);
    expect(getYearFromPath('/content/adaptto/xwalk/2021/mypage/mysubpage')).to.equal(2021);
  });
});
