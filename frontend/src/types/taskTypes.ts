export interface TaskItem {
    id: number;
    label: string;
    done: boolean;
}

export interface TaskListData {
    id: number;
    title: string;
    tasks: TaskItem[];
    nextId?: number;
}

export type TaskActivity = 
    | { type: "task", listId: number, taskId: number, value: string } 
    | { type: "title" ,listId: number,  value: string} 
    | { type: "adder" , value: string} 
    | { type: "bottomBar", listId: number, value: string } 
    | { type: "goesTo", listId: number } 
    | null;
    
export interface UseTaskResult {
    tasks: TaskListData[];
    activeProjectId: number | null;

    updateTaskDone: (
        listId: number,
        taskId: number,
        done: boolean
    ) => Promise<void>;

    updateTaskLabel: (
        listId: number,
        taskId: number,
        label: string
    ) => Promise<void>;

    createTask: (
        listId: number,
        label: string
    ) => Promise<void>;

    removeTask: (
        listId: number,
        taskId: number
    ) => Promise<void>;

    removeList: (listId: number) => Promise<void>;

    updateTitle: (
        listId: number,
        value: string
    ) => Promise<void>;

    createList: (title: string) => Promise<void>;

    updateGoesTo: (
        listId: number,
        nextId: number
    ) => Promise<void>;

    getGoesTo: (
        listId: number | undefined
    ) => string;
}
export interface UseTaskManagerResult {
  // state
  tasks: TaskListData[];
  active: TaskActivity;
  activeProjectId: number | null;

  // activity
  activateAdder(value?:string): void;
  activateTitle(listId: number, value: string): void;
  activateTask(listId: number, taskId: number, value: string): void;
  activateBottomBar(listId: number, value: string): void;
  activateGoesTo(listId: number): void;
  isActive(type:string): boolean;
  clearActivity(): void;

  // task operations
  createList(title: string): void;
  createTask(listId: number, label: string): void;
  updateTaskLabel(listId: number, taskId: number, label: string): void;
  updateTaskDone(listId: number, taskId: number, done: boolean): void;
  updateTitle(listId: number, title: string): void;
  removeTask(listId: number, taskId: number): void;
  removeList(listId: number): void;
  updateGoesTo(listId: number, nextId: number): void;

  // selectors
  getGoesTo(id?: number): string;
}
