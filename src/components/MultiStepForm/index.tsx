import { useMultiStepFormContext } from './context';
import { FifthStep } from './steps/FifthStep';
import { FirstStep } from './steps/FirstStep';
import { FourthStep } from './steps/FourthStep';
import { SecondStep } from './steps/SecondStep';
import { ThirdStep } from './steps/ThirdStep';

export function MultiStepForm() {
  const { currentStep } = useMultiStepFormContext();

  switch (currentStep) {
    case 1:
      return <FirstStep />;
    case 2:
      return <SecondStep />;
    case 3:
      return <ThirdStep />;
    case 4:
      return <FourthStep />;
    case 5:
      return <FifthStep />;
    default:
      return null;
  }
}
