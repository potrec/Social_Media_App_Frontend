import type { AxiosResponse, AxiosError } from 'axios';
import { http } from './http';
import { navigate } from './navigate';

export async function logout()
{
  const request = await http
			.post('/api/login')
			.then((response: AxiosResponse) => {
			})
			.catch((reason: AxiosError<{ error: string }>) => {
        console.log(reason);
			})
      localStorage.clear();
}