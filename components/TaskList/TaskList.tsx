import { List, Paper } from "@mui/material";
import TaskCard from "../TaskCard/TaskCard";
import { Status, useStore } from "@/store/store";
import { useMemo } from "react";

interface TaskListProps {
    status: Status;
}

export default function TaskList ({ status }: TaskListProps) {

    const tasks = useStore((state) => state.tasks);

    const tasksByStatus = useMemo(() => tasks.filter((task) => task.status === status), [tasks, status]);

    return (
        <div>
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'auto', backgroundColor: 'transparent', padding: '1px 10px'}}>
                <List sx={{ opacity: 1 }}>
                    {tasksByStatus.map((task) => <TaskCard key={task.id} task={task} />)}
                </List>
            </Paper>
        </div>
    )
};