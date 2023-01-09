export function getToken() {
  if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token')
  console.log("script get token: "+token);
  return token;
  }
}