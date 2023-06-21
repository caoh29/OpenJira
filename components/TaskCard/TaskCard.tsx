import { Task, useStore } from '@/store/store';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { DragEvent } from 'react';

interface TaskCardProps {
    task: Task;
}

export default function TaskCard ({ task }: TaskCardProps) {

    const startDraggingTask = useStore((state) => state.startDraggingTask);
    const endDraggingTask = useStore((state) => state.endDraggingTask);

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text/plain', task.id);
        startDraggingTask();
    };

    const onDragEnd = (event: DragEvent) => {
        endDraggingTask();
    };


    return (
        <Card
            sx={{ marginBottom: 1}}
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{task.title}</Typography>
                </CardContent>
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