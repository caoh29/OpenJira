import { useForm, SubmitHandler } from "react-hook-form";
import { Button, OutlinedInput, Box, FormHelperText } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "@/store/store";



type Inputs = {
    title: string,
    description: string,
};

export default function NewTaskForm() {
    const [isAdding, setIsAdding] = useState(false);
    const addTask = useStore((state) => state.addTask);

    const { register, handleSubmit, reset, formState } = useForm<Inputs>();
    
    const onSubmitForm: SubmitHandler<Inputs> = (data) => {
        addTask({
            id: uuidv4(),
            title: data.title,
            description: data.description,
            status: "pending",
            date: Date.now().toString(),
        });
        setIsAdding(false);
    };
    

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
        reset();
        }
    }, [formState.isSubmitSuccessful, reset]);

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1 }}>
        {isAdding ? (
            <form onSubmit={handleSubmit(onSubmitForm)}>
            <OutlinedInput
                {...register('title', { required: true, minLength: 3 })}
                placeholder="Title"
                fullWidth
            />
            {formState.errors.title && (
                <FormHelperText error>
                This field is required! Minimum 3 characters
                </FormHelperText>
            )}

            <OutlinedInput
                sx={{ margin: '20px 0' }}
                {...register('description', { minLength: 3 })}
                placeholder="Description"
                fullWidth
            />
            {formState.errors.description && (
                <FormHelperText error>
                This field has a minimum of 3 characters
                </FormHelperText>
            )}

            <Box
                display="flex"
                gap={5}
                justifyContent="center"
                alignItems="center"
                width="100%"
            >
                <OutlinedInput
                    sx={{ height: '35px', width: '110px' }}
                    type="submit"
                    value="SAVE "
                    color="primary"
                    endAdornment={<SaveOutlinedIcon />}
                />
                <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<CancelOutlinedIcon />}
                    onClick={() => setIsAdding(false)}
                >
                Cancel
                </Button>
            </Box>
            </form>
        ) : (
            <Button
                sx={{ marginBottom: '20px' }}
                startIcon={<AddIcon />}
                fullWidth
                variant="outlined"
                onClick={() => setIsAdding(true)}
            >
            Add Task
            </Button>
        )}
        </Box>
    );
}