// Define study
const studyObject = {
  title: 'root',
  type: 'lab.flow.Sequence',
  parameters: {},
  plugins: [],
  metadata: {
    title: 'survey-template',
    description: 'Template for creating surveys',
    repository: '',
    contributors: '',
  },
  files: {},
  responses: {},
  content: [
    {
      type: 'lab.flow.Sequence',
      files: {},
      responses: {},
      parameters: {},
      messageHandlers: {
        'before:prepare': function anonymous() {
          this.parameters.items = JSON.parse(this.parameters.items);
        },
      },
      title: 'Survey',
      content: [
        {
          type: 'lab.html.Form',
          content:
            '\u003Cdiv class="container"\u003E\n  \u003Cmain class="content-horizontal-center\n               content-vertical-center"\n               style="background: ${this.parameters.backgroundColor}"\u003E\n    \u003Cdiv\u003E\n      \u003Cform\u003E\n        \u003Cp\u003E\n          ${this.parameters.instruction}\n        \u003C\u002Fp\u003E\n        \u003Cbutton type="submit"\u003E\n          Continue\n        \u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E',
          scrollTop: true,
          files: {},
          responses: {},
          parameters: {},
          messageHandlers: {},
          title: 'Welcome',
        },
        {
          type: 'lab.html.Frame',
          context:
            '\u003Cmain data-labjs-section="frame"\u003E\n  \u003C!-- Content gets inserted here --\u003E\n\u003C\u002Fmain\u003E',
          contextSelector: '[data-labjs-section="frame"]',
          files: {},
          responses: {},
          parameters: {},
          messageHandlers: {},
          title: 'Frame',
          content: {
            type: 'lab.flow.Loop',
            templateParameters: [],
            sample: {
              mode: 'sequential',
            },
            files: {},
            responses: {},
            parameters: {},
            messageHandlers: {
              'before:prepare': function anonymous() {
                // construct trials
                const initParameters = this.parameters.items || [];
                console.log(initParameters);
                // const statements = this.parameters.statements.split('\n');
                // const params = statements.map((statement, number) => {return({number,statement})});
                // initParameters = params;

                // take the number of trials from outside of fallback to the length of provided parameters
                const numberTrials = initParameters.length;

                // randomize is either false or true, if there is no external parameter, the default is true
                const randomize = this.parameters.randomize === 'Yes';

                // a helper function to shuffle the array
                function shuffle(a) {
                  let j;
                  let x;
                  let i;
                  for (i = a.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = a[i];
                    a[i] = a[j];
                    a[j] = x;
                  }
                  return a;
                }

                // constructor function which takes the information about trial and put in the object with the structure that fits the trial
                const trialConstructor = (trial, i) => ({
                  number: trial.number,
                  type: trial.type,
                  question: trial.question,
                  min_rating_label: trial.min_rating_label,
                  max_rating_label: trial.max_rating_label,
                  options: trial.options,
                });

                let trialParameters = [];
                if (randomize) {
                  shuffle(initParameters);
                }
                for (let i = 0; i < numberTrials; i++) {
                  trialParameters = trialParameters.concat(
                    trialConstructor(initParameters[i], i)
                  );
                }

                // assign options values to parameters of this task
                this.options.templateParameters = trialParameters;
                console.log('trialParameters', trialParameters);

                // randomize if needed
                if (randomize) {
                  this.options.shuffle = true;
                }
                this.options.shuffle = false;
              },
            },
            title: 'Loop',
            shuffleGroups: [],
            template: {
              type: 'lab.flow.Sequence',
              files: {},
              responses: {},
              parameters: {},
              messageHandlers: {},
              title: 'Sequence',
              content: [
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cdiv class="container"\u003E\n  \u003Cmain class="content-horizontal-center\n               content-vertical-center"\n               style="background: ${this.parameters.backgroundColor}"\u003E\n    \u003Cdiv\u003E\n      \u003Cform\u003E\n        \u003Cp\u003E\n          ${this.parameters.question}\n        \u003C\u002Fp\u003E\n\n        \u003Ctable id="options" style="text-align: left;"\u003E\n\n        \u003C\u002Ftable\u003E\n        \n        \u003Cbutton type="submit"\u003E\n          Continue\n        \u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E',
                  scrollTop: true,
                  files: {},
                  responses: {},
                  parameters: {},
                  messageHandlers: {
                    run: function anonymous() {
                      const options = document.querySelector('#options');
                      const optionsParameters = this.parameters.options.split(
                        '\n'
                      );
                      const questionSlug = 'multiple-choice';
                      // const questionSlug = this.parameters.question
                      //   .toLowerCase()
                      //   .split(' ')
                      //   .join('-');

                      for (const option of optionsParameters) {
                        const optionSlug = option
                          .toLowerCase()
                          .split(' ')
                          .join('-');
                        const div = document.createElement('tr');

                        const o = document.createElement('INPUT');
                        o.setAttribute('type', 'radio');
                        o.setAttribute('name', questionSlug);
                        o.setAttribute('value', optionSlug);
                        o.setAttribute('id', optionSlug);
                        const td_o = document.createElement('td');
                        td_o.appendChild(o);

                        const a = document.createElement('label');
                        a.textContent = option;
                        a.setAttribute('for', optionSlug);
                        const td_a = document.createElement('td');
                        td_a.appendChild(a);

                        div.appendChild(td_o);
                        div.appendChild(td_a);
                        options.appendChild(div);
                      }
                    },
                  },
                  title: 'Multiple',
                  skip: "${this.parameters.type !== 'select'}",
                },
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cstyle\u003E\n\n  .slidecontainer {\n      width: 100%; \u002F* Width of the outside container *\u002F\n      margin: 0 auto; \u002F* Put in the middle *\u002F\n      display: grid; \n      grid-row-gap: 20px;\n      padding-top: 50px;\n  }\n  \u002F* The slider itself *\u002F\n  .slider {\n      -webkit-appearance: none;  \u002F* Override default CSS styles *\u002F\n      appearance: none;\n      width: 100%; \u002F* Full-width *\u002F\n      height: 15px; \u002F* Specified height *\u002F\n      border-radius: 5px;\n      background: linear-gradient( to right, #f78d8d 0%, #8ff591 100%);\n      outline: none; \u002F* Remove outline *\u002F\n      opacity: 0.7; \u002F* Set transparency (for mouse-over effects on hover) *\u002F\n      -webkit-transition: .2s; \u002F* 0.2 seconds transition on hover *\u002F\n      transition: opacity .2s;\n  }\n\n  \u002F* Mouse-over effects *\u002F\n  .slider:hover {\n      opacity: 1; \u002F* Fully shown on mouse-over *\u002F\n  }\n\n  \u002F* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) *\u002F\n  .slider::-webkit-slider-thumb {\n      -webkit-appearance: none; \u002F* Override default look *\u002F\n      appearance: none;\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-moz-range-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-ms-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  \u002F* Special styling for WebKit\u002FBlink *\u002F\n    input.visible[type=range]::-webkit-slider-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for Firefox *\u002F\n    input.visible[type=range]::-moz-range-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for IE *\u002F\n    input.visible[type=range]::-ms-thumb {\n      background: #008B8B;\n    }\n\n    output {\n      display: none;\n      position: absolute;\n      top: -65px;\n      width: 50px;\n      height: 50px;\n      border: 1px solid #e2e2e2;\n      background-color: #fff;\n      border-radius: 30px;\n      color: #1b1717;\n      font-size: 1rem;\n      line-height: 45px;\n      text-align: center;\n    }\n\u003C\u002Fstyle\u003E\n\n\u003Cdiv class="container"\u003E\n  \u003Cmain style="background: ${this.parameters.backgroundColor}"\u003E\n    \u003Cdiv\u003E\n      \u003Cform\u003E \n        \u003Cdiv\u003E\n          \u003Ch2\u003E${parameters.question}\u003C\u002Fh2\u003E \n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class="slidecontainer"\u003E\n          \u003Cdiv style="position:relative;"\u003E\n            \u003Coutput id="rating_input" name="rangeVal"\u003E\u003C\u002Foutput\u003E\n            \u003Cinput type="range" name="visual-scale" min=1 max=100 class="slider" id="rating_pre"\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n            \u003Cdiv style="display:grid; justify-content: start;"\u003E\n              \u003Ch2\u003E\n                ${parameters.min_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv style="display:grid; justify-content: end;"\u003E\n              \u003Ch2\u003E\n                ${parameters.max_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E \n        \u003C\u002Fdiv\u003E\n        \u003Cdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cbutton type="submit" id="continue_btn" disabled\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E',
                  scrollTop: true,
                  files: {},
                  responses: {},
                  parameters: {},
                  messageHandlers: {
                    run: function anonymous() {
                      const onTouch = e => {
                        document.getElementById(
                          'continue_btn'
                        ).disabled = false;
                        const target = document.getElementById('rating_pre');
                        target.classList.add('visible');
                        const output = document.getElementById('rating_input');

                        const controlMin = target.min;
                        const controlMax = target.max;
                        const controlVal = target.value;
                        const controlThumbWidth = 40;

                        const calculateOffset = (
                          value,
                          min,
                          max,
                          thumbWidth
                        ) => {
                          const range = controlMax - controlMin;
                          const correction = 2.7 + (-8.2 - 2.7) * (value / 100);
                          const position =
                            ((value - min) / range) * 100 + correction;
                          const offset =
                            Math.round((thumbWidth * position) / 100) -
                            thumbWidth / 2;
                          return `calc(${position}% + ${offset}px)`;
                        };

                        output.style.left = calculateOffset(
                          target.value,
                          controlMin,
                          controlMax,
                          controlThumbWidth
                        );
                        output.value = controlVal;
                        output.style.display = 'inline';
                      };

                      document.getElementById('rating_pre').oninput = function(
                        e
                      ) {
                        onTouch(e);
                      };
                      document.getElementById('rating_pre').onclick = function(
                        e
                      ) {
                        onTouch(e);
                      };
                      document.getElementById('rating_pre').ontouch = function(
                        e
                      ) {
                        onTouch(e);
                      };
                    },
                  },
                  title: 'Slider',
                  skip: "${this.parameters.type !== 'vas'}",
                },
              ],
            },
          },
        },
        {
          type: 'lab.html.Form',
          content:
            '\u003Cdiv class="container"\u003E\n  \u003Cmain class="content-horizontal-center\n               content-vertical-center"\n               style="background: ${this.parameters.backgroundColor}"\u003E\n    \u003Cdiv\u003E\n        \u003Cp\u003E\n          ${this.parameters.endMessage}\n        \u003C\u002Fp\u003E\n\n        \u003Cform\u003E\n          \u003Cbutton type="submit"\u003EFinish\u003C\u002Fbutton\u003E\n        \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E',
          scrollTop: true,
          files: {},
          responses: {},
          parameters: {},
          messageHandlers: {},
          title: 'End',
        },
      ],
    },
  ],
};

// export
export default studyObject;
