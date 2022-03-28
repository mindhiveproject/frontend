import { PROPOSALS_FOR_REVIEW_QUERY } from "../reviews";

export const individualQuestions = [
  {
    name: '1',
    question: 'Is the research question important? Why or why not?',
  },
  {
    name: '2',
    question:
      'Is the study design appropriate? How might you improve on the study design, if at all?',
  },
  {
    name: '3',
    question: 'Do the predicted outcomes support the researchers’ hypothesis? Why (not)?',
  },
  {
    name: '4',
    question:
      'Do the researchers consider possible alternative explanations for their predicted study outcomes? Are there any confounding variables (e.g., unintended order effects)? Which might they be?',
  },
  {
    name: '5',
    question:
      'Does the study respect participants’ privacy, health, and effort? Explain your reasoning.',
  },
  {
    name: '6',
    question: 'What further question could you address in a follow-up study?',
  },
  {
    name: '7',
    question:
      'What was it like to participate? Was it the right duration? Was the task clear? Were you motivated to put effort into your responses? Explain your answer.',
  },
  {
    name: '8',
    question:
      'Does the study seem interesting? Would you choose to participate in this study? Would you recommend it? Why (not)?',
  },
];

export const synthesisQuestions = [
  {
    name: '1',
    question: 'We learned',
    text: 'Summarize the study and its goals in your own words. What did you find compelling? What did you learn about the human brain and behavior?',
  },
  {
    name: '2',
    question: 'We liked',
    text: 'What stands out to you about this proposal? What resonates? What do you think is effective? Creative?',
  },
  {
    name: '3',
    question: 'We wished',
    text: 'What do you think the scientist could think differently about? What’s not in the proposal that you might incorporate? What do you want to know more about?',
  },
  {
    name: '4',
    question: 'We wondered',
    text: 'What is a suggestion you might make? (e.g., I wonder if the author might...) What might be the outcome of a slight tweak to the proposal?',
  },
];
