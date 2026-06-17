import { z } from 'zod';

export const addTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Treść zadania jest wymagana')
    .max(200, 'Zadanie może mieć maksymalnie 200 znaków'),
});

export const editTodoSchema = addTodoSchema;

export type AddTodoData = z.infer<typeof addTodoSchema>;
export type EditTodoData = z.infer<typeof editTodoSchema>;
