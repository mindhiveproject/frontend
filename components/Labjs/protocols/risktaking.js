// parameters for Risk tating task
export const parameters_risktaking = [
  {
    name: 'incrementImageFeedbackStep',
    value: 50,
    type: 'number',
  },
  {
    name: 'randomize',
    value: 'yes',
    type: 'text',
    help: 'Should the trials be randomized?',
  },
  {
    name: 'question',
    value: 'How happy are you right now?',
    type: 'text',
  },
  {
    name: 'min_rating_value',
    value: 0,
    type: 'number',
  },
  {
    name: 'max_rating_value',
    value: 100,
    type: 'number',
  },
  {
    name: 'min_rating_label',
    value: 'Very unhappy',
    type: 'text',
  },
  {
    name: 'max_rating_label',
    value: 'Very happy',
    type: 'text',
  },
  {
    name: 'welcome_text',
    value:
      'See how good you are at making decisions by winning as many points as you can. At the same time, help scientists study happiness by reporting how you feel during the game.',
    type: 'text',
  },
  {
    name: 'starting_points',
    value: 500,
    type: 'number',
  },
  {
    name: 'instructions_question',
    value:
      'Help us study happiness. When asked how you feel, move the slider to the right when you feel happy and to the left when you feel unhappy. Mark exactly how you feel at that moment.',
    type: 'text',
  },
  {
    name: 'whenShowQuestion',
    value: 3,
    type: 'number',
  },
];
