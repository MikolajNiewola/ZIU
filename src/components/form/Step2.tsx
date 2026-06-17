import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "./schemas";
import type { Step2Data } from "./schemas";

interface Step2Props {
  onComplete: (data: Step2Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step2Data>;
}

export function Step2({ onComplete, onBack, defaultValues }: Step2Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      categories: defaultValues?.categories ?? [{ value: "" }],
      notifications: {
        email: false,
        push: false,
        ...defaultValues?.notifications,
      },
      newsletter: defaultValues?.newsletter ?? false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  return (
    <form onSubmit={handleSubmit(onComplete)} noValidate>
      <p className="text-sm text-gray-600 mb-4">
        Pola oznaczone <span className="text-red-500">*</span> są wymagane.
      </p>

      {/* Kategorie */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategorie <span className="text-red-500">*</span>
        </label>

        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder={`Kategoria ${index + 1}`}
              aria-label={`Kategoria ${index + 1}`}
              aria-required="true"
              aria-invalid={!!errors.categories?.[index]?.value}
              aria-describedby={
                errors.categories?.[index]?.value
                  ? `cat-${index}-err`
                  : undefined
              }
              className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.categories?.[index]?.value
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              {...register(`categories.${index}.value` as const)}
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Usuń kategorię ${index + 1}`}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                ✕
              </button>
            )}
            {errors.categories?.[index]?.value && (
              <span id={`cat-${index}-err`} role="alert" className="sr-only">
                {errors.categories[index]?.value?.message}
              </span>
            )}
          </div>
        ))}

        {errors.categories?.root && (
          <span role="alert" className="text-red-500 text-sm block mb-2">
            {errors.categories.root.message}
          </span>
        )}
        {errors.categories?.message && (
          <span role="alert" className="text-red-500 text-sm block mb-2">
            {errors.categories.message}
          </span>
        )}

        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="text-sm text-blue-700 hover:text-blue-900 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1"
        >
          + Dodaj kategorię
        </button>
      </div>

      {/* Powiadomienia */}
      <div className="mb-6">
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Powiadomienia
          </legend>

          <div className="flex items-center gap-2 mb-2">
            <Controller
              name="notifications.email"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="notif-email"
                  aria-label="Powiadomienia e-mail"
                  checked={field.value}
                  onChange={field.onChange}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
            <label htmlFor="notif-email" className="text-sm text-gray-700">
              Powiadomienia e-mail
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="notifications.push"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="notif-push"
                  aria-label="Powiadomienia push"
                  checked={field.value}
                  onChange={field.onChange}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
            <label htmlFor="notif-push" className="text-sm text-gray-700">
              Powiadomienia push
            </label>
          </div>
        </fieldset>
      </div>

      {/* Newsletter */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Controller
            name="newsletter"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="newsletter"
                aria-label="Subskrypcja newslettera"
                checked={field.value}
                onChange={field.onChange}
                className="w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
          <label htmlFor="newsletter" className="text-sm text-gray-700">
            Chcę otrzymywać newsletter
          </label>
        </div>
      </div>

      {/* Przyciski nawigacji */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2.5 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          ← Wstecz
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="flex-1 py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? "Przetwarzanie…" : "Dalej →"}
        </button>
      </div>
    </form>
  );
}
