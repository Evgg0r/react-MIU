import type {TaskListProps} from "../types.tsx";
import {TasksItem} from "./TaskItem.tsx";


export function TasksList({
      tasks,
      onAdvanceStatus,
      editable,
      onUpdateTask,
      onDeleteTask,
}:TaskListProps) {
    return (
        <>
            {tasks.map(task => (
                <TasksItem
                    key={task.id}
                    task={task}
                    onAdvanceStatus={onAdvanceStatus}
                    editable={editable}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                />
            ))}
        </>
    );
}