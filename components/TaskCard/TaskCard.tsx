import { Task, useStore } from '@/store/store';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { DragEvent } from 'react';
import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils/dateFormat';

interface TaskCardProps {
    task: Task;
}

export default function TaskCard ({ task }: TaskCardProps) {

    const router = useRouter();

    const startDraggingTask = useStore((state) => state.startDraggingTask);
    const endDraggingTask = useStore((state) => state.endDraggingTask);

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text/plain', task.id!);
        startDraggingTask();
    };

    const onDragEnd = (event: DragEvent) => {
        endDraggingTask();
    };
    

    const onCardClick = () => {
        router.push(`/tasks/${task.id}`);
    }

    return (
        <Card
            sx={{ marginBottom: 1}}
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
            onClick={ onCardClick }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{task.title}</Typography>
                </CardContent>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{task.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{formatDate(task.date)}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
};