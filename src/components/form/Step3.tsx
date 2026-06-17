import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema } from './schemas';
import type { Step1Data, Step2Data, Step3Data } from './schemas';

interface Step3Props {
  data: { step1?: Step1Data; step2?: Step2Data };
  onSubmitAll: (rodoAccepted: boolean) => Promise<void>;
  onBack: () => void;
  serverError?: string;
}

export function Step3({ data, onSubmitAll, onBack, serverError }: Step3Props) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { rodo: false as unknown as true },
  });

  const onSubmit = async () => {
    await onSubmitAll(true);
  };

  const { step1, step2 } = data;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Podsumowanie Krok 1 */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
          Dane osobowe
        </h3>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-gray-600">Imię:</dt>
          <dd className="text-gray-800 font-medium">{step1?.firstName}</dd>
          <dt className="text-gray-600">Nazwisko:</dt>
          <dd className="text-gray-800 font-medium">{step1?.lastName}</dd>
          <dt className="text-gray-600">E-mail:</dt>
          <dd className="text-gray-800 font-medium">{step1?.email}</dd>
          <dt className="text-gray-600">Hasło:</dt>
          <dd className="text-gray-800 font-medium">{'•'.repeat(8)}</dd>
        </dl>
      </div>

      {/* Podsumowanie Krok 2 */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
          Preferencje
        </h3>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-gray-600">Kategorie:</dt>
          <dd className="text-gray-800 font-medium">
            {step2?.categories.map((c) => c.value).join(', ') || '—'}
          </dd>
          <dt className="text-gray-600">E-mail notifications:</dt>
          <dd className="text-gray-800 font-medium">{step2?.notifications.email ? 'Tak' : 'Nie'}</dd>
          <dt className="text-gray-600">Push notifications:</dt>
          <dd className="text-gray-800 font-medium">{step2?.notifications.push ? 'Tak' : 'Nie'}</dd>
          <dt className="text-gray-600">Newsletter:</dt>
          <dd className="text-gray-800 font-medium">{step2?.newsletter ? 'Tak' : 'Nie'}</dd>
        </dl>
      </div>

      {/* Checkbox RODO */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3">
          <Controller
            name="rodo"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="rodo"
                aria-required="true"
                aria-invalid={!!errors.rodo}
                aria-describedby={errors.rodo ? 'rodo-err' : undefined}
                checked={field.value === true}
                onChange={(e) => field.onChange(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
          <label htmlFor="rodo" className="text-sm text-gray-700">
            Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z Rozporządzeniem RODO (UE 2016/679). <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.rodo && (
          <span id="rodo-err" role="alert" className="text-red-500 text-sm mt-2 block">
            {errors.rodo.message}
          </span>
        )}
      </div>

      {/* Błąd serwera */}
      {serverError && (
        <div role="alert" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {serverError}
        </div>
      )}

      {/* Przyciski */}
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
          className="flex-1 py-2.5 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {isSubmitting ? 'Wysyłanie…' : 'Zarejestruj się'}
        </button>
      </div>
    </form>
  );
}
