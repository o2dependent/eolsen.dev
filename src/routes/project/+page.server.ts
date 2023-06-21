
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './[name]/$types';

export const load: PageLoad = () => {
    throw redirect(307, '/');
}
