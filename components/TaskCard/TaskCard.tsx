import { Task } from '@/store/store';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

interface TaskCardProps {
    task: Task;
}

export default function TaskCard ({ task }: TaskCardProps) {
    return (
        <Card
            sx={{ marginBottom: 1}}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{task.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{task.date}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
};