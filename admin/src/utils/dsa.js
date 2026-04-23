/**
 * A stable Merge Sort implementation for arrays of objects.
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
export const mergeSort = (arr, key, direction = 'asc') => {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), key, direction);
  const right = mergeSort(arr.slice(mid), key, direction);
  
  return merge(left, right, key, direction);
};

const merge = (left, right, key, direction) => {
  let result = [];
  let i = 0;
  let j = 0;
  
  while (i < left.length && j < right.length) {
    let valA = left[i][key] || "";
    let valB = right[j][key] || "";
    
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    
    if (direction === 'asc') {
      if (valA <= valB) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    } else {
      if (valA >= valB) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
};

/**
 * An optimized linear multi-column search algorithm.
 * Time Complexity: O(n * k) where n is array length and k is number of keys
 */
export const multiColumnSearch = (arr, query, keys) => {
  if (!query) return arr;
  const lowerQuery = query.toLowerCase();
  
  return arr.filter(item => {
    for (let key of keys) {
      if (item[key] && item[key].toString().toLowerCase().includes(lowerQuery)) {
        return true;
      }
    }
    return false;
  });
};

/**
 * Pagination algorithm to extract a specific page from a list.
 */
export const paginate = (arr, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return arr.slice(startIndex, startIndex + pageSize);
};
