export interface TodoType {
  id: number;
  subject: string;
  completed: boolean;
}
export interface Props {
  todos: TodoType[];
}

export class ClassProps {
  id: number;
  subject: string;
  completed: boolean;
  constructor(id: number, subject: string, completed: boolean) {
    this.id = id;
    this.subject = subject;
    this.completed = completed;
  }
}
