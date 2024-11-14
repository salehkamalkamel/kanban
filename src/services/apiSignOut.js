import { auth } from "../firebase";

async function apiSignOut() {
  try {
    auth.signOut();
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export { apiSignOut };
