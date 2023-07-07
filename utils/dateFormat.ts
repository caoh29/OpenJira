import { formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string) => {
    return formatDistanceToNow(parseInt(date), { addSuffix: true });
}
