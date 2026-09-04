/** Persist uploaded files as data URLs (local demo / instructor authoring). */

const MAX_BYTES = 4 * 1024 * 1024; // 4MB — keep localStorage workable

export function fileToDataUrl(file, { maxBytes = MAX_BYTES } = {}) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected.'));
      return;
    }
    if (file.size > maxBytes) {
      reject(new Error(`File too large (max ${Math.round(maxBytes / 1024 / 1024)}MB for demo storage).`));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read file.'));
    reader.readAsDataURL(file);
  });
}
