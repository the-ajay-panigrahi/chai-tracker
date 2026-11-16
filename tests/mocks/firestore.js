export const doc = (_db, collection, uid) => ({ collection, uid });
export async function getDoc(ref) {
  const value = JSON.parse(
    localStorage.getItem(`test-data:${ref.uid}`) || "null",
  );
  return { exists: () => value !== null, data: () => value };
}
export async function setDoc(ref, data, options) {
  if (localStorage.getItem("test-fail-save"))
    throw new Error("Test write failure");
  const previous = JSON.parse(
    localStorage.getItem(`test-data:${ref.uid}`) || "{}",
  );
  localStorage.setItem(
    "test-last-write",
    JSON.stringify({ ref, data, options }),
  );
  localStorage.setItem(
    `test-data:${ref.uid}`,
    JSON.stringify(options?.merge ? { ...previous, ...data } : data),
  );
}
