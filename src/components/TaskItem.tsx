import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import NextPlan from '@mui/icons-material/NextPlan';
import {Box, Checkbox, IconButton, InputAdornment, TextField, Tooltip, Typography} from "@mui/material";
import type {TaskItemProps} from "../types";
import {useState} from "react";
import {normalizedText} from "../utils";


export function TasksItem({
                              task,
                              onAdvanceStatus,
                              editable,
                              onUpdateTask,
                              onDeleteTask,
                          }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);

    function handleSaveEdit() {
        const normalText = normalizedText(editedText)
        if (normalText) {
            onUpdateTask({...task, text: normalText})
            setIsEditing(false);
        }

    }

    return (
        <Box
            display="flex"
            alignItems="center"
            gap={1}
            justifyContent="space-between"
        >
            {isEditing ? (
                <TextField
                    fullWidth
                    sx={{width: '450px;', margin: '12px'}}
                    size="small"
                    label="Имя задачи"
                    variant="standard"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip title="Применить изменения">
                                    <IconButton edge="end" color="primary">
                                        <DoneIcon onClick={handleSaveEdit}/>
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        )
                    }}
                ></TextField>
            ) : (
                <>
                    <Box display="flex" justifyContent="flex-start" alignItems="center">
                        <Checkbox
                            checked={task.status === 'inprogress' || task.status === 'done'}
                            onChange={() => onAdvanceStatus(task)}
                            color={task.status === 'done' ? 'warning' : 'primary'}
                        />
                        <Typography>{task.text}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                        {editable && task.status === 'planned' && (
                            <Tooltip title="Редактировать задачу">
                                <IconButton
                                    edge="end"
                                    color="primary"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="Следующий статус">
                            <IconButton edge="end"
                                        color="primary"
                                        onClick={() => onAdvanceStatus(task)}
                            >
                                <NextPlan/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить задачу">
                            <IconButton edge="end"
                                        color="warning"
                                        onClick={() => onDeleteTask(task.id)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </>
            )}
        </Box>
    )
}