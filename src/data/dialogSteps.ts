export interface DialogStep {
  speaker: 'Support Agent' | 'Technical Support Agent' | 'User' | 'System';
  message: string;
  type: 'text' | 'screenshot' | 'actionButtons' | 'table' | 'image' | 'spinner';
  actionButtons?: string[];
  waitForKeyPress?: boolean;
  isSystemMessage?: boolean;
  duration?: number;
}

export const dialogSteps: DialogStep[] = [
  // First conversation
  {
    speaker: 'Support Agent',
    message: "Hi Yakir, I understand the automation you set up isn't triggering as expected. Let's check a few things together.",
    type: 'text',
    waitForKeyPress: false
  },
  {
    speaker: 'Support Agent',
    message: 'Can you navigate to the "Automations" center? Click the little robot icon at the top of your board.',
    type: 'text',
    waitForKeyPress: false
  },
  {
    speaker: 'Support Agent',
    type: 'actionButtons',
    message: '',
    actionButtons: ['Done', 'I have a problem'],
    waitForKeyPress: true
  },
  {
    speaker: 'Support Agent',
    type: 'screenshot',
    message: '',
  },
  {
    speaker: 'Support Agent',
    message: 'Great! Now, find the automation you\'re referring to and click the three dots on the right. Then, select "Run History" to check if there are any recent errors or skipped triggers.',
    type: 'text',
    waitForKeyPress: false
  },
  {
    speaker: 'Support Agent',
    type: 'actionButtons',
    message: '',
    actionButtons: ['Done', 'I have a problem'],
    waitForKeyPress: true
  },
  {
    speaker: 'Support Agent',
    type: 'screenshot',
    message: '',
  },
  {
    speaker: 'Support Agent',
    message: "Let me look for any errors or messages indicating why it didn't run.",
    type: 'text',
    waitForKeyPress: false
  },
  {
    speaker: 'Support Agent',
    message: 'Checking logs in the ELK...',
    type: 'spinner',
    duration: 3000
  },
  {
    speaker: 'Support Agent',
    message: 'Summarizing relevant information...',
    type: 'spinner',
    duration: 2000
  },
  {
    speaker: 'Support Agent',
    message: "The logs show it might have been a temporary failure. Everything looks healthy now, so let's test it. Can you try triggering the automation again by updating one of the items?",
    type: 'text',
    waitForKeyPress: true
  },
  {
    speaker: 'Support Agent',
    type: 'actionButtons',
    message: '',
    actionButtons: ['Done', 'I have a problem'],
    waitForKeyPress: true
  },
  {
    speaker: 'Support Agent',
    message: "Perfect! The automation triggered successfully this time. The system appears to be functioning properly. Is there anything else I can assist you with?",
    type: 'text',
    actionButtons: ['Yes', 'No'],
    waitForKeyPress: true
  },
  {
    speaker: 'Support Agent',
    message: "Great! Have a wonderful day, and happy automating!",
    type: 'text',
    waitForKeyPress: true
  }
];

