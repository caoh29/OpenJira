import { useForm, SubmitHandler } from "react-hook-form";
import { Button, OutlinedInput, Box } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";




type Inputs = {
    title: string,
    description: string,
};

export default function NewTaskForm () {

    const [isAdding, setisAdding] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmitForm: SubmitHandler<Inputs> = data => console.log(data);

    return (
        <Box sx={{marginBottom: 2, paddingX: 1}}>
            <Button sx={{marginBottom: '20px'}} startIcon={<AddIcon/>} fullWidth variant="outlined" onClick={() => setisAdding(true)}> Add Task </Button>
            {isAdding && (
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <OutlinedInput placeholder="Title" {...register("title")} required fullWidth/>
                    <OutlinedInput sx={{margin: '20px 0'}} placeholder="Description" {...register("description")} required fullWidth/>
                    {errors.title && <span>This field is required</span>}
                    {errors.description && <span>This field is required</span>}
                    <Box display="flex" gap={5} justifyContent="center" alignItems="center" width="100%">
                        <OutlinedInput sx={{height: '35px', width: '110px'}} type="submit" value="SAVE " color="primary" endAdornment={<SaveOutlinedIcon/>}/>
                        <Button variant="outlined" color="secondary" endIcon={<CancelOutlinedIcon/>} onClick={() => setisAdding(false)}> Cancel </Button>
                    </Box>
                </form>
            )}
        </Box>
    );
};