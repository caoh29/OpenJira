import { useForm, SubmitHandler } from "react-hook-form";
import { Button, OutlinedInput, Box } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";

type Inputs = {
    title: string,
    description: string,
};

export default function NewTaskForm () {

    const [isAdding, setisAdding] = useState(false);

    const { register, handleSubmit, reset, formState } = useForm<Inputs>();
    const onSubmitForm: SubmitHandler<Inputs> = data => {
        console.log(data)
        setisAdding(false);
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [formState.isSubmitSuccessful, reset]);

    return (
        <Box sx={{marginBottom: 2, paddingX: 1}}>
            {isAdding ? (
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <OutlinedInput placeholder="Title" {...register("title", { required: true, minLength: 3 })} fullWidth/>
                    {formState.errors.title && <span>This field is required! Minimum 3 characters</span>}
                    <OutlinedInput sx={{margin: '20px 0'}} placeholder="Description" {...register("description", { minLength: 3 })} fullWidth/>
                    {formState.errors.description && <span>This field has a minimum of 3 characters</span>}
                    <Box display="flex" gap={5} justifyContent="center" alignItems="center" width="100%">
                        <OutlinedInput sx={{height: '35px', width: '110px'}} type="submit" value="SAVE " color="primary" endAdornment={<SaveOutlinedIcon/>}/>
                        <Button variant="outlined" color="secondary" endIcon={<CancelOutlinedIcon/>} onClick={() => setisAdding(false)}> Cancel </Button>
                    </Box>
                </form>
            ): <Button sx={{marginBottom: '20px'}} startIcon={<AddIcon/>} fullWidth variant="outlined" onClick={() => setisAdding(true)}> Add Task </Button>}
        </Box>
    );
};