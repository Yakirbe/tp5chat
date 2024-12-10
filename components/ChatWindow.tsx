import { SpinnerMessage } from '../components/messages/SpinnerMessage';

// Inside your ChatWindow component, update the renderMessage function:
const renderMessage = (step: DialogStep) => {
  switch (step.type) {
    case 'spinner':
      return (
        <SpinnerMessage
          message={step.message}
          onComplete={() => {
            setCurrentStepIndex(prev => prev + 1);
          }}
        />
      );
    // ... other cases
  }
}; 