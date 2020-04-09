// parameters for Rating task
export const parameters_rating = [
  {
    name: 'rating_question',
    value: 'How likely are you to',
    type: 'text',
    help: 'The question that will be asked during the task',
    example: '',
  },
  {
    name: 'reference_group',
    value: 'peers in your age group',
    type: 'text',
    example: '',
  },
  {
    name: 'numberOfTrials',
    value: 30,
    type: 'number',
    help: 'Number of experimental trials',
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
    name: 'min_rating_label',
    value: 'Not at all',
    type: 'text',
    example: '',
  },
  {
    name: 'max_rating_label',
    value: 'Very',
    type: 'text',
    example: '',
  },
  {
    name: 'rating_question_for_instruction',
    value: 'how likely',
    type: 'text',
    example: '',
  },
  {
    name: 'presentationTimeITI',
    value: 1000,
    type: 'number',
    help: 'Inter-trial interval (in ms)',
    example: '',
  },
];
