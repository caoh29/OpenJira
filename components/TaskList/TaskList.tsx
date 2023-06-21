import { List, Paper } from "@mui/material";
import TaskCard from "../TaskCard/TaskCard";
import { Status, useStore } from "@/store/store";
import { DragEvent, useMemo } from "react";

interface TaskListProps {
    status: Status;
}

export default function TaskList ({ status }: TaskListProps) {

    const tasks = useStore((state) => state.tasks);

    const tasksByStatus = useMemo(() => tasks.filter((task) => task.status === status), [tasks, status]);

    const updateTask = useStore((state) => state.updateTask);

    const onDropTask = ( event: DragEvent ) => {
        const taskId = event.dataTransfer.getData('text/plain');

        const task = tasks.find((task) => task.id === taskId)!;
        task.status = status;
        updateTask(task);
    };

    const allowDrop = ( event: DragEvent ) => {
        event.preventDefault();
    };

    return (
        <section onDrop={ onDropTask } onDragOver={ allowDrop } >
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'auto', backgroundColor: 'transparent', padding: '1px 10px'}}>
                <List sx={{ opacity: 1 }}>
                    {tasksByStatus.map((task) => <TaskCard key={task.id} task={task} />)}
                </List>
            </Paper>
        </section>
    )
};