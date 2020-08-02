// parameters for Rating task
export const parameters_rating = [
  {
    name: 'rating_question',
    value: 'How likely are you to',
    type: 'text',
    help: `Participants are presented with a series of scenarios. Each scenario is presented as a question, the core structure of the question being ‘How likely are you to…?’. This core structure is common to all the questions that will be asked during the task. Make sure that the sentence structure is such that it has to be followed by a verb.`,
    example: `Depending on your research question, you can use other phrasings, like “How much would you want to” or “How difficult would it be for you to”. You can also ask about other people (i.e. friends, parents, peers, neighbors, etc.), like “How likely is your parent to…?”.`,
  },
  {
    name: 'reference_group',
    value: 'peers in your age group',
    type: 'text',
    help: `Participants are shown the rating of the reference group after they complete their own rating. The choice of the reference group (i.e. friends, parents, peers, neighbors, etc.) depends on your research question.`,
    example: `The reference groups can be highly specific and of multiple characteristics. For example citizenship (i.e. “US citizens”), ethnic characteristics, religion (i.e. ‘Christians’), interests, age, geographic location, party membership (i.e. ‘Republicans’), socio-economic status, etc.`,
  },
  {
    name: 'numberOfTrials',
    value: 30,
    type: 'number',
    help: `Number of experiment trials, each with a different question. The maximum number of trials is 140.`,
    example: '',
  },
  {
    name: 'randomize',
    value: 'yes',
    type: 'text',
    help: `Should the sequence of trials be randomized?`,
    example: `Without randomization, all participants see the same sequence of trials. For example, the trial about “turn your computer off overnight/when not in use?” would always follow the trial about “Have a rain barrel or catch?”. With randomization, the sequence of trials is different for each participant. Think about your experimental design and what kind of results you will get with and without randomization.`,
  },
  {
    name: 'min_rating_label',
    value: 'Not at all',
    type: 'text',
    help: `The label for the minimum value on the rating scale`,
    example: '',
  },
  {
    name: 'max_rating_label',
    value: 'Very',
    type: 'text',
    help: `The label for the maximum value on the rating scale`,
    example: '',
  },
  {
    name: 'presentationTimeITI',
    value: 1000,
    type: 'number',
    help:
      'Inter-trial interval (in ms): The number of milliseconds between each trial.',
    example: '',
  },
  {
    name: 'instruction',
    value: `<p>In this task you will be asked to make a series of ratings about issues in climate change and environmental awareness.</p>
<p>First, you will be asked to rate, on a scale of 1 to 100, of how likely you are to take a particular course of action. The questions will typically appear in the form of "How likely are you to _______?" The marker will not be initially visible, so please click on the scale to place the marker.</p>
<p>For example, you may be asked "How likely are you to throw away things in the trash that could be recycled?" Please rate how likely you are to behave in this way. We ask that you do these ratings sincerely. After the first rating, you will be shown how peers in your age group have rated this question, i.e. how likely 'they are' to behave this way? Finally, you will be asked to re-rate the question.</p>
<p>Let's do a practice trial!</p>`,
    type: 'textarea',
    help: 'Instruction text',
    example:
      'The <p> tag defines a paragraph of text. The paragraph always starts on a new line. The tags are not visible to participants of your experiment.',
  },
];
