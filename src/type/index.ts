export interface TodoType {
  id: number;
  subject: string;
  completed: boolean;
}

export class ClassTodoType {
  id: number;
  subject: string;
  completed: boolean;
  constructor(id: number, subject: string, completed: boolean) {
    this.id = id;
    this.subject = subject;
    this.completed = completed;
  }
}
