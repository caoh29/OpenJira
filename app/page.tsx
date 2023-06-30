"use client";

import { Metadata } from 'next';
import { Grid, Card, CardHeader } from '@mui/material';
import TaskList from '@/components/TaskList/TaskList';
import NewTaskForm from '@/components/NewTaskForm/NewTaskForm';
import { useStore } from '@/store/store';

export const metadata:Metadata = {
  title: 'Home - OpenJira',
  description: 'Generated by Camilo Ordoñez',
}

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/getTasks');

  if (!res.ok) {
    throw new Error('Something went wrong!');
  }

  const data = await res.json();

  useStore.setState({
    isDarkMode: false,
    isSideBarOpen: false,
    isAddingTask: false,
    isDraggingTask: false,
    tasks: data
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card sx={{height: 'calc(100vh - 100px)'}}>
          <CardHeader 
          title="To Do"/>
          <NewTaskForm/>
          <TaskList status='pending'/>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={{height: 'calc(100vh - 100px)'}}>
          <CardHeader 
          title="In Progress"/>
          <TaskList status='in-progress'/>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={{height: 'calc(100vh - 100px)'}}>
          <CardHeader 
          title="Done"/>
          <TaskList status='finished'/>
        </Card>
      </Grid>
    </Grid>
  )
}
