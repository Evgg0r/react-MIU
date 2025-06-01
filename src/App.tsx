import '@fontsource/roboto/300.css';
import {Container, Typography, Box, TextField, Tooltip, IconButton, InputAdornment} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {TasksList} from "./components/TasksList";
import {useState} from "react";
import type {Task} from "./types.tsx";
import {normalizedText} from "./utils.tsx";
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from "@uidotdev/usehooks";

export function App() {
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
    const [newTaskText, setNewTaskText] = useState<string>('');
    const normalText = normalizedText(newTaskText);

    const plannedTasks = tasks.filter((t) => t.status === 'planned');
    const inprogressTasks = tasks.filter((t) => t.status === 'inprogress');
    const doneTasks = tasks.filter((t) => t.status === 'done');

    function handleAddTask(): void {
        if (normalText) {
            const newTask: Task = {
                id: uuidv4(),
                text: normalText,
                status: 'planned'
            };
            setTasks((state) => [...state, newTask]);
            setNewTaskText('')
        }
    }

    function handleUpdateTask(updatedTask: Task): void {
        setTasks((state) =>
            state.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    }

    function handleDeleteTask(taskId: string): void {
        setTasks((state) => state.filter((task) => task.id !== taskId));
    }


    function handleAdvanceStatus(task: Task): void {
        const nextStatus: Record<Task["status"], Task["status"]> = {
            planned: "inprogress",
            inprogress: "done",
            done: "planned", // можно вернуть в план из завершённых
        };

        handleUpdateTask({ ...task, status: nextStatus[task.status] });
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                bgcolor: 'white',
                height: '766px',
                width: '514px',
                borderRadius: 2,
                padding: 4,
            }}
        >

            <Typography
                variant="body1"
                component="h1"
                color="#2196f3"
                sx={{
                    p: 1.5,
                    fontWeight: 800,
                    fontSize: 34,
                    lineHeight: 1.235,
                    letterSpacing: '0.01em',
                    mb: 1
                }}
            >
                TODO
            </Typography>

            <TextField
                fullWidth
                sx={{ width: '450px;', margin: '12px'}}
                variant="standard"
                label="Имя новой задачи"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title="Добавить задачу">
                                <IconButton
                                    edge="end"
                                    color="primary"
                                    disabled={!normalText}
                                    onClick={handleAddTask}
                                >
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    )
                }}/>

            { plannedTasks.length > 0 && <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                mt: 3 }}>
                    <Typography
                variant="body1"
                component="h2"
                color="textSecondary"
                align="center"
                textAlign="center"
                textTransform={"uppercase"}
                sx={{
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: 1.66,
                    letterSpacing: "0.03em",
                    color: "rgba(0, 0, 0, 0.6)"
            }}
            >План ({plannedTasks.length})</Typography>
            <TasksList
                tasks={plannedTasks}
                onAdvanceStatus={handleAdvanceStatus}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                editable
            />
            </Box>
            }

           { inprogressTasks.length > 0 && <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                mt: 3 }}>
                <Typography
                    variant="body1"
                    component="h2"
                    color="textSecondary"
                    align="center"
                    textAlign="center"
                    textTransform={"uppercase"}
                    sx={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: 1.66,
                        letterSpacing: "0.03em",
                        color: "rgba(0, 0, 0, 0.6)"
                    }}
                >В работе ({inprogressTasks.length})</Typography>
                <TasksList
                    tasks={inprogressTasks}
                    onAdvanceStatus={handleAdvanceStatus}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                    editable
                />
            </Box>
            }

            { doneTasks.length > 0 && <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            mt: 3
        }}>
            <Typography
                variant="body1"
                component="h2"
                color="textSecondary"
                align="center"
                textAlign="center"
                textTransform={"uppercase"}
                sx={{
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: 1.66,
                    letterSpacing: "0.03em",
                    color: "rgba(0, 0, 0, 0.6)"}}
            >Готово ({doneTasks.length})</Typography>
            <TasksList
                tasks={doneTasks}
                onAdvanceStatus={handleAdvanceStatus}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                editable={false}
                />
        </Box>
            }
        </Container>
    )
}


