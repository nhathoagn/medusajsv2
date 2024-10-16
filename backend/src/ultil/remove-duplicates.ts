export function removeDuplicates(rows: any[], unique: string): any[] {
  const seen = new Set();
  return rows.filter((row) => {
    // Nếu không có 'id', bạn có thể sử dụng một trường khác hoặc toàn bộ object
    const key = unique || JSON.stringify(row);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
