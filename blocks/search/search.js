/**
 * search — Microsoft-style "Ask a question" bar.
 * Authored as a single cell holding the placeholder text.
 * Renders a visual (non-functional) search field: an input using that
 * placeholder plus a send glyph on the right. POC = looks-only, no backend.
 */
export default function init(el) {
  const placeholder = el.textContent.trim() || 'Ask a question';
  el.textContent = '';

  const field = document.createElement('div');
  field.className = 'search-field';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'search-input';
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('aria-label', placeholder);

  const send = document.createElement('button');
  send.type = 'button';
  send.className = 'search-send';
  send.setAttribute('aria-label', 'Submit');
  send.setAttribute('tabindex', '-1');

  field.append(input, send);
  el.append(field);
}
