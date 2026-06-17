import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema } from './schemas';
import type { Step1Data } from './schemas';

interface Step1Props {
  onComplete: (data: Step1Data) => void;
  defaultValues?: Partial<Step1Data>;
}

const getPasswordStrength = (pwd: string): 'słabe' | 'średnie' | 'silne' => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return 'słabe';
  if (score <= 2) return 'średnie';
  return 'silne';
};

const strengthColor: Record<string, string> = {
  'słabe': '#b91c1c',
  'średnie': '#c2410c',
  'silne': '#15803d',
};

export function Step1({ onComplete, defaultValues }: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      ...defaultValues,
    },
  });

  const passwordValue = watch('password');
  const strength = passwordValue ? getPasswordStrength(passwordValue) : null;

  return (
    <form onSubmit={handleSubmit(onComplete)} noValidate>
      <p className="text-sm text-gray-600 mb-4">
        Pola oznaczone <span className="text-red-500">*</span> są wymagane.
      </p>

      {/* Imię */}
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
          Imię <span className="text-red-500">*</span>
        </label>
        <input
          id="firstName"
          type="text"
          aria-required="true"
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? 'firstName-err' : undefined}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.firstName ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('firstName')}
        />
        {errors.firstName && (
          <span id="firstName-err" role="alert" className="text-red-500 text-sm mt-1 block">
            {errors.firstName.message}
          </span>
        )}
      </div>

      {/* Nazwisko */}
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Nazwisko <span className="text-red-500">*</span>
        </label>
        <input
          id="lastName"
          type="text"
          aria-required="true"
          aria-invalid={!!errors.lastName}
          aria-describedby={errors.lastName ? 'lastName-err' : undefined}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.lastName ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('lastName')}
        />
        {errors.lastName && (
          <span id="lastName-err" role="alert" className="text-red-500 text-sm mt-1 block">
            {errors.lastName.message}
          </span>
        )}
      </div>

      {/* E-mail */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-mail <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('email')}
        />
        {errors.email && (
          <span id="email-err" role="alert" className="text-red-500 text-sm mt-1 block">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Hasło */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Hasło <span className="text-red-500">*</span>
        </label>
        <input
          id="password"
          type="password"
          aria-required="true"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'pwd-err' : 'pwd-hint'}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('password')}
        />
        <span id="pwd-hint" aria-live="polite" className="text-sm mt-1 block">
          {strength && (
            <span style={{ color: strengthColor[strength] }}>
              Siła hasła: <strong>{strength}</strong>
            </span>
          )}
        </span>
        {errors.password && (
          <span id="pwd-err" role="alert" className="text-red-500 text-sm mt-1 block">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Potwierdź hasło */}
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Potwierdź hasło <span className="text-red-500">*</span>
        </label>
        <input
          id="confirmPassword"
          type="password"
          aria-required="true"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirmPwd-err' : undefined}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span id="confirmPwd-err" role="alert" className="text-red-500 text-sm mt-1 block">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isSubmitting ? 'Przetwarzanie…' : 'Dalej →'}
      </button>
    </form>
  );
}
