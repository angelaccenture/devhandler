/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: microsoft-teams site-wide cleanup.
 * Removes non-authorable site chrome (Microsoft UHF universal header/footer,
 * cookie banner, in-page scrollspy nav, utility shell) and stray injected
 * elements. All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie banner / consent shell (uhf-cookie-banner wraps #msccBannerV2).
    // Verified: cleaned.html lines 10-14 (<uhf-cookie-banner>, #msccBannerV2).
    WebImporter.DOMUtils.remove(element, [
      'uhf-cookie-banner',
      '#msccBannerV2',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    WebImporter.DOMUtils.remove(element, [
      // Universal header (Microsoft UHF global chrome) — cleaned.html lines 2, 4, 16.
      '.universalheader',
      'uhf-header',
      'header.uhf-header',
      // Header-adjacent config shells — cleaned.html lines 800-801.
      '.meControl-configInfo',
      '.userInfo-config',
      // Universal footer (Microsoft UHF global chrome) — cleaned.html lines 1065-1068.
      '.universalfooter',
      'uhf-footer',
      'footer#uhf-footer',
      // In-page scrollspy pill nav (sticky). Its sibling .scrollspy-container
      // holds authorable content and is preserved — cleaned.html line 802.
      '.secondary-sticky-nav .sticky',
      // Empty utility container shell — cleaned.html line 1064.
      '.oc-utility-container',
      // Body-level, pre-main scaffolding shells — cleaned.html line 1.
      '#page-top',
      '#modalsRenderedAfterPageLoad',
      // Stray injected clientlib <link> tags scattered inside content, plus
      // other non-authorable head-ish elements — cleaned.html lines 2-3, 802.
      'link',
      'style',
      'script',
      'noscript',
    ]);
  }
}
