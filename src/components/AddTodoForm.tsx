import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { addTodoSchema, type AddTodoData } from './form/todoSchemas';
import { tapScale } from '../animations/variants';

interface AddTodoFormProps {
  onAdd: (text: string) => Promise<void>;
  isLoading?: boolean;
}

export default function AddTodoForm({ onAdd, isLoading }: AddTodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddTodoData>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: { title: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: AddTodoData) => {
    await onAdd(data.title.trim());
    reset();
  };

  const busy = isLoading || isSubmitting;

  return (
    <form
      aria-label="Dodaj nowe zadanie"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mb-6"
    >
      <h2 id="add-todo-heading" className="text-lg font-semibold text-gray-800 mb-2">
        Dodaj nowe zadanie
      </h2>

      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="new-task-input" className="visually-hidden">
            Treść nowego zadania
          </label>
          <input
            id="new-task-input"
            type="text"
            placeholder="Wpisz treść zadania..."
            aria-required="true"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
            disabled={busy}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                      disabled:opacity-50"
            {...register('title')}
          />
          {errors.title && (
            <p id="title-error" role="alert" className="text-red-600 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          whileTap={busy ? undefined : tapScale}
          disabled={busy}
          aria-label="Dodaj zadanie"
          aria-busy={busy}
          className="px-5 py-2 text-sm font-semibold text-white bg-brand-500 rounded-lg
                    hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          {busy ? 'Dodawanie…' : 'Dodaj'}
        </motion.button>
      </div>
    </form>
  );
}
