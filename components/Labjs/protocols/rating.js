// parameters for Rating task
export const parameters_rating = [
  {
    name: 'rating_question',
    value: 'How likely are you to',
    type: 'text',
    help: 'The question that will be asked during the task',
  },
  {
    name: 'reference_group',
    value: 'peers in your age group',
    type: 'text',
  },
  {
    name: 'nbExperimentalTrials',
    value: 20,
    type: 'number',
    help: 'Number of experimental trials',
  },
  {
    name: 'randomize',
    value: 'yes',
    type: 'text',
    help: 'Should the trials be randomized?',
  },
  {
    name: 'min_rating_label',
    value: 'Not at all',
    type: 'text',
  },
  {
    name: 'max_rating_label',
    value: 'Very likely',
    type: 'text',
  },
  {
    name: 'rating_question_for_instruction',
    value: 'how likely',
    type: 'text',
  },
  {
    name: 'presentationTimeStatement',
    value: 3000,
    type: 'number',
  },
  {
    name: 'presentationTimeProvidedRating',
    value: 3000,
    type: 'number',
  },
  {
    name: 'presentationTimeITI',
    value: 1000,
    type: 'number',
  },
];
