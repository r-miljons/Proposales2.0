// Utility to escape HTML special characters to prevent injection
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"]|'/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return char;
    }
  });
}
