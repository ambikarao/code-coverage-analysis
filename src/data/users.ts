export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
];
