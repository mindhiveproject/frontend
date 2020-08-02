// parameters for Risk tating task
export const parameters_risktaking = [
  {
    name: 'numberOfTrials',
    value: 30,
    type: 'number',
    help: 'How many trials should be in the experiment?',
    example: '',
  },
  {
    name: 'randomize',
    value: 'yes',
    type: 'text',
    help: 'Should the trials be randomized?',
    example: '',
  },
  {
    name: 'question',
    value: 'How happy are you right now?',
    type: 'text',
    example: '',
  },
  {
    name: 'min_rating_value',
    value: 0,
    type: 'number',
    example: '',
  },
  {
    name: 'max_rating_value',
    value: 100,
    type: 'number',
    example: '',
  },
  {
    name: 'min_rating_label',
    value: 'Very unhappy',
    type: 'text',
    example: '',
  },
  {
    name: 'max_rating_label',
    value: 'Very happy',
    type: 'text',
    example: '',
  },
  {
    name: 'welcome_text',
    value:
      'See how good you are at making decisions by winning as many points as you can. At the same time, help scientists study happiness by reporting how you feel during the game.',
    type: 'text',
    example: '',
  },
  {
    name: 'starting_points',
    value: 500,
    type: 'number',
    example: '',
  },
  {
    name: 'instructions_question',
    value:
      'Help us study happiness. When asked how you feel, move the slider to the right when you feel happy and to the left when you feel unhappy. Mark exactly how you feel at that moment.',
    type: 'text',
    example: '',
  },
  {
    name: 'whenShowQuestion',
    value: 3,
    type: 'number',
    example: '',
  },
];
