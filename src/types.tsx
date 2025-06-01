export type Task = {
    id: string;
    text: string;
    status: 'planned' | 'inprogress' | 'done';
    isEditing?: boolean;
};

type TaskCallbacks = {
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    onAdvanceStatus: (task: Task) => void;
    editable: boolean;
}

export type TaskListProps = {tasks: Task[]} & TaskCallbacks;
export type TaskItemProps = {task: Task} & TaskCallbacks;