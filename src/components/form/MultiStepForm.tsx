import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import type { Step1Data, Step2Data } from './schemas';
import { registerUser } from '../../api/todoApi';
import { stepVariants } from '../../animations/variants';

const stepTitles = ['Dane osobowe', 'Preferencje', 'Podsumowanie'];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    step1?: Step1Data;
    step2?: Step2Data;
  }>({});
  const [serverError, setServerError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  const handleStep1Complete = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, step1: data }));
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const handleFinalSubmit = async () => {
    setServerError(undefined);
    if (!formData.step1 || !formData.step2) return;

    try {
      await registerUser({
        firstName: formData.step1.firstName,
        lastName: formData.step1.lastName,
        email: formData.step1.email,
        password: formData.step1.password,
        categories: formData.step2.categories,
        notifications: formData.step2.notifications,
        newsletter: formData.step2.newsletter,
      });
      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Błąd serwera, spróbuj ponownie';
      if (message.includes('już zarejestrowany')) {
        setCurrentStep(1);
      }
      setServerError(message);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
        role="status"
      >
        <div className="text-5xl mb-4" aria-hidden="true">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Rejestracja zakończona!
        </h2>
        <p className="text-gray-600">
          Witaj, <strong>{formData.step1?.firstName}</strong>! Twoje konto
          zostało utworzone.
        </p>
      </motion.div>
    );
  }

  return (
    <main
      aria-label="Formularz rejestracji"
      className="max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <nav aria-label="Postęp rejestracji" className="mb-6">
        <ol className="flex items-center justify-between">
          {stepTitles.map((title, i) => {
            const stepNum = i + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <li
                key={title}
                className="flex items-center gap-2"
                aria-current={isActive ? 'step' : undefined}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </span>
                <span
                  className={`text-sm hidden sm:inline ${
                    isActive ? 'font-semibold text-blue-700' : 'text-gray-600'
                  }`}
                >
                  {title}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      <h2
        tabIndex={-1}
        ref={headingRef}
        className="text-xl font-bold text-gray-900 mb-5 outline-none"
      >
        Krok {currentStep}: {stepTitles[currentStep - 1]}
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={stepVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          {currentStep === 1 && (
            <Step1
              onComplete={handleStep1Complete}
              defaultValues={formData.step1}
            />
          )}
          {currentStep === 2 && (
            <Step2
              onComplete={handleStep2Complete}
              onBack={() => setCurrentStep(1)}
              defaultValues={formData.step2}
            />
          )}
          {currentStep === 3 && (
            <Step3
              data={formData}
              onSubmitAll={handleFinalSubmit}
              onBack={() => setCurrentStep(2)}
              serverError={serverError}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
