import { goto } from '$app/navigation';
export async function navigate(/** @type {string | URL} */ link: string | URL) {
  await goto(link);
}