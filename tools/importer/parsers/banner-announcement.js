/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant "banner announcement" (base block: banner).
 * Source: microsoft-teams — div.announcement (Ignite promo band).
 * Emits block name "banner announcement" -> EDS class="banner announcement".
 * Generated for microsoft-teams import.
 *
 * Banner is a single-column band. The base block flattens all cells into one
 * content area and treats a standalone <p> holding a single <a> as the CTA.
 */
export default function parse(element, { document }) {
  const contentCell = [];

  // Announcement copy (keep inline <em>); drop any injected <link>/<style>.
  const textP = element.querySelector('reimagine-announcement > p, p');
  if (textP) {
    textP.querySelectorAll('link, style').forEach((n) => n.remove());
    contentCell.push(textP);
  }

  // Standalone CTA — its own <p> so the base block promotes it to a button.
  const ctaA = element.querySelector('reimagine-link a, a[href]');
  if (ctaA) {
    const p = document.createElement('p');
    p.append(ctaA);
    contentCell.push(p);
  }

  // Raw <img> (DM/Scene7) — DM transformer converts to an anchor carrier later.
  const img = element.querySelector('reimagine-media img, img');
  if (img) contentCell.push(img);

  if (!textP && !ctaA) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cells.push([contentCell]); // 1-column: one row, one cell holding all content

  // Two-token block: base name "banner" + variant "announcement".
  // helix-importer renders the header as "Banner (announcement)", which EDS
  // decorates to class="banner announcement" (NOT a single "banner-announcement").
  const block = WebImporter.Blocks.createBlock(document, { name: 'banner', variants: ['announcement'], cells });
  element.replaceWith(block);
}
