"use client";

import { Button, Card, CardContent, CardHeader, FormLabel, Grid, RadioGroup, TextField, Radio, IconButton, FormHelperText } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { useRouter } from 'next/navigation'

import { Status, useStore } from '@/store/store';

import { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { formatDate } from '@/utils/dateFormat';

type Inputs = {
    description: string,
    status: Status,
};

const STATUS_LIST: Status[] = ['pending', 'in-progress', 'finished'];

export default function Task({ params }:{params: {id: string}}) {

    const updateTask = useStore((state) => state.updateTask);

    const router = useRouter();

    const [taskTitleValue, setTaskTitleValue] = useState('Task');
    const [taskDescriptionValue, setTaskDescriptionValue] = useState('Task Description');
    const [taskDate, setTaskDate] = useState('0');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/getTasks/${params.id}`);
                if (!res.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await res.json();
                setTaskTitleValue(data.title);
                setTaskDescriptionValue(data.description);
                setTaskDate(data.date);
        
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [params.id]);

    const { register, handleSubmit, formState } = useForm<Inputs>();
    
    const onSubmitForm: SubmitHandler<Inputs> = (data) => {
        updateTask({
            id: params.id,
            title: taskTitleValue,
            description: data.description,
            status: data.status,
            date: Date.now().toString(),
        });
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            setTaskDescriptionValue('');
            router.push(`/`);
        }
    }, [formState.isSubmitSuccessful]);

    const onDeleteTask = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/getTasks/${params.id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: params.id,
                })
            });
            if (!res.ok) {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        } finally {
            router.push(`/`);
        }
    }

    return (
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardHeader title={taskTitleValue} subheader={`Created ${formatDate(taskDate)}`}/>
                    <CardContent >
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <TextField
                                fullWidth
                                multiline
                                autoFocus
                                placeholder='Task description'
                                label='New Task Description'
                                variant='standard'
                                sx={{ marginBottom: 2}}
                                {...register('description')}
                                value={taskDescriptionValue}
                                onChange={(e) => setTaskDescriptionValue(e.target.value)}
                            />
                            <FormLabel>Status</FormLabel>
                            <RadioGroup row>
                                {
                                    STATUS_LIST.map((status) => (
                                        <FormLabel key={status}>
                                            <Radio value={status} {...register('status', { required: true })}/>
                                            {status.at(0)!.toUpperCase() + status.slice(1)}
                                        </FormLabel>
                                        ))
                                }
                            </RadioGroup>
                            {formState.errors.status && (
                                <FormHelperText error>
                                This field is required!
                                </FormHelperText>
                            )}
                            <Button type='submit' startIcon={<SaveOutlinedIcon />} fullWidth variant='contained' color='primary'>
                                Save
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
            <IconButton
                onClick={onDeleteTask}
                sx={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    backgroundColor: 'error.main',
                }}
            >
                <DeleteForeverOutlinedIcon />
            </IconButton>
        </Grid>
    )
}