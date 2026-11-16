const listeners = new Set();
const readUser = () => JSON.parse(localStorage.getItem("test-user") || "null");
const notify = () => listeners.forEach((listener) => listener(readUser()));
export function onAuthStateChanged(_auth, listener) {
  listeners.add(listener);
  queueMicrotask(() => listener(readUser()));
  return () => listeners.delete(listener);
}
export async function signInWithEmailAndPassword(_auth, email, password) {
  if (password === "wrong-password")
    throw new Error("Invalid email or password.");
  const user = { uid: email, email };
  localStorage.setItem("test-user", JSON.stringify(user));
  notify();
  return { user };
}
export async function createUserWithEmailAndPassword(_auth, email, password) {
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters.");
  return signInWithEmailAndPassword(_auth, email, password);
}
export async function signOut() {
  localStorage.removeItem("test-user");
  notify();
}
