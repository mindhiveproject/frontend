// Define study
const studyObject = {
  title: 'root',
  type: 'lab.flow.Sequence',
  parameters: {},
  plugins: [],
  metadata: {
    title: 'Rating',
    description: 'mindHive task',
    repository: '',
    contributors: '',
  },
  files: {},
  responses: {},
  content: [
    {
      type: 'lab.flow.Sequence',
      files: {},
      parameters: {},
      responses: {},
      messageHandlers: {},
      title: 'Rating task',
      content: [
        {
          type: 'lab.html.Form',
          content:
            '\u003Cdiv class="container"\u003E\n  \u003Cmain class="content-horizontal-center\n               content-vertical-center"\n               style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n      \u003Cform\u003E\n        \u003Cbutton type="submit"\u003EWelcome to the experiment. Please click to continue\u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n\n',
          files: {},
          parameters: {},
          responses: {},
          messageHandlers: {},
          title: 'Welcome',
        },
        {
          type: 'lab.html.Form',
          content:
            '\u003Cdiv class="container"\u003E\n  \u003Cmain class="content-horizontal-center\n               content-vertical-center"\n               style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n      \u003Cform style="text-align:left"\u003E\n        \u003Ch3\u003E\n           Please enter your birthdate \n        \u003C\u002Fh3\u003E\n        \u003Cinput type="text" id="birthdate" name="birthdate" style="width:100%" required\u003E\n        \n        \u003Ch3\u003E\n          Please enter the gender you identify as \n        \u003C\u002Fh3\u003E\n\n        \u003Cinput type="radio" id="gender_m" name="gender" value="m" required\u003E\n        \u003Clabel for="gender_m"\u003EM\u003C\u002Flabel\u003E\n        \u003Cbr\u003E\n            \n        \u003Cinput type="radio" id="gender_f" name="gender" value="f"\u003E\n        \u003Clabel for="gender_f"\u003EF\u003C\u002Flabel\u003E\n        \u003Cbr\u003E\n\n        \u003Cinput type="radio" id="gender_non-binary" name="gender" value="non-binary"\u003E\n        \u003Clabel for="gender_non-binary"\u003Enon-binary\u003C\u002Flabel\u003E\n        \u003Cbr\u003E\n\n        \n          \u003Cbutton type="submit"\u003EContinue\u003C\u002Fbutton\u003E\n        \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n',
          scrollTop: true,
          files: {},
          responses: {},
          parameters: {},
          messageHandlers: {},
          title: 'Demographics',
        },
        {
          type: 'lab.html.Form',
          content:
            '\u003Cdiv class="container"\u003E\n  \u003Cmain class="content-horizontal-center\n               content-vertical-center"\n               style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n        \u003Ch1\u003E\n           Instructions\n        \u003C\u002Fh1\u003E\n\n        \u003Cdiv\u003E\n          ${parameters.instruction}\n        \u003C\u002Fdiv\u003E\n\n        \u003Cform\u003E\n          \u003Cbutton type="submit"\u003EContinue\u003C\u002Fbutton\u003E\n        \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n\n\n\n',
          files: {},
          parameters: {},
          responses: {},
          messageHandlers: {},
          title: 'Instructions',
        },
        {
          type: 'lab.html.Frame',
          context:
            '\u003Cmain data-labjs-section="frame"\u003E\n  \u003C!-- Content gets inserted here --\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n  Practice trials\n\u003C\u002Ffooter\u003E',
          contextSelector: '[data-labjs-section="frame"]',
          files: {},
          parameters: {},
          responses: {},
          messageHandlers: {},
          title: 'Practice',
          content: {
            type: 'lab.flow.Loop',
            files: {},
            parameters: {},
            templateParameters: [
              {
                number: '1',
                statement:
                  'Ask your school librarian to provide books about climate change',
              },
            ],
            sample: {
              mode: 'draw-shuffle',
              n: '5',
            },
            responses: {},
            messageHandlers: {
              'before:prepare': function anonymous() {
                // construct trials
                // take the parameters from the outside or fallback to test parameters
                let initParameters;
                if (
                  this.parameters.showCustomStatements === 'Yes' &&
                  this.parameters.statements
                ) {
                  const statements = this.parameters.statements.split('\n');
                  const params = statements.map((statement, number) => ({
                    number,
                    statement,
                  }));
                  initParameters = params;
                } else {
                  initParameters = this.options.templateParameters;
                }

                // take the number of trials from outside of fallback to the length of provided parameters
                let numberTrials = this.parameters.numberOfTrials;
                if (numberTrials > initParameters.length) {
                  numberTrials = initParameters.length;
                }

                // randomize is either false or true, if there is no external parameter, the default is true
                const randomize = this.parameters.practiceRandomize === 'Yes';

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

                // a helper function to get a random number betweeen min and max
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
                function getRandomIntInclusive(min, max) {
                  min = Math.ceil(min);
                  max = Math.floor(max);
                  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
                }

                // constructor function which takes the information about trial and put in the object with the structure that fits the trial
                const trialConstructor = trial => ({
                  number: trial.number,
                  statement: trial.statement,
                  providedRating: getRandomIntInclusive(1, 100),
                  stage: 'practice',
                });

                let trialParameters = [];
                if (randomize) {
                  shuffle(initParameters);
                }
                for (let i = 0; i < numberTrials; i++) {
                  trialParameters = trialParameters.concat(
                    trialConstructor(initParameters[i])
                  );
                }

                // assign options values to parameters of this task
                this.options.templateParameters = trialParameters;
                // randomize if needed
                if (randomize) {
                  this.options.shuffle = true;
                }
                this.options.shuffle = false;
              },
            },
            title: 'Practice loop',
            shuffleGroups: [],
            template: {
              type: 'lab.flow.Sequence',
              files: {},
              parameters: {},
              responses: {},
              messageHandlers: {},
              title: 'Practice sequence',
              content: [
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cstyle\u003E\n\n  .slidecontainer {\n      width: 100%; \u002F* Width of the outside container *\u002F\n      margin: 0 auto; \u002F* Put in the middle *\u002F\n      display: grid; \n      grid-row-gap: 20px;\n      padding-top: 50px;\n  }\n  \u002F* The slider itself *\u002F\n  .slider {\n      -webkit-appearance: none;  \u002F* Override default CSS styles *\u002F\n      appearance: none;\n      width: 100%; \u002F* Full-width *\u002F\n      height: 15px; \u002F* Specified height *\u002F\n      border-radius: 5px;\n      background: linear-gradient( to right, #f78d8d 0%, #8ff591 100%);\n      outline: none; \u002F* Remove outline *\u002F\n      opacity: 0.7; \u002F* Set transparency (for mouse-over effects on hover) *\u002F\n      -webkit-transition: .2s; \u002F* 0.2 seconds transition on hover *\u002F\n      transition: opacity .2s;\n  }\n\n  \u002F* Mouse-over effects *\u002F\n  .slider:hover {\n      opacity: 1; \u002F* Fully shown on mouse-over *\u002F\n  }\n\n  \u002F* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) *\u002F\n  .slider::-webkit-slider-thumb {\n      -webkit-appearance: none; \u002F* Override default look *\u002F\n      appearance: none;\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-moz-range-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-ms-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  \u002F* Special styling for WebKit\u002FBlink *\u002F\n    input.visible[type=range]::-webkit-slider-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for Firefox *\u002F\n    input.visible[type=range]::-moz-range-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for IE *\u002F\n    input.visible[type=range]::-ms-thumb {\n      background: #008B8B;\n    }\n\n    output {\n      display: none;\n      position: absolute;\n      top: -65px;\n      width: 50px;\n      height: 50px;\n      border: 1px solid #e2e2e2;\n      background-color: #fff;\n      border-radius: 30px;\n      color: #1b1717;\n      font-size: 1rem;\n      line-height: 45px;\n      text-align: center;\n    }\n\u003C\u002Fstyle\u003E\n\n\n\u003Cdiv class="container"\u003E\n  \u003Cmain style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n      \u003Cform\u003E \n        \u003Cdiv\u003E\n          \u003Ch2\u003E${parameters.rating_question}\u003C\u002Fh2\u003E \n          \u003Ch1\u003E ${parameters.statement}?\u003C\u002Fh1\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class="slidecontainer"\u003E\n          \u003Cdiv style="position:relative;"\u003E\n            \u003Coutput id="rating_input" name="rangeVal"\u003E\u003C\u002Foutput\u003E\n            \u003Cinput type="range" name="rating_pre" min=1 max=100 class="slider" id="rating_pre"\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n            \u003Cdiv style="display:grid; justify-content: start;"\u003E\n              \u003Ch2\u003E\n                ${parameters.min_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv style="display:grid; justify-content: end;"\u003E\n              \u003Ch2\u003E\n                ${parameters.max_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E \n        \u003C\u002Fdiv\u003E\n        \u003Cdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cbutton type="submit" id="continue_btn" disabled\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n',
                  files: {},
                  parameters: {},
                  responses: {},
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
                  title: 'Rating 1',
                },
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cstyle\u003E\n\n  .slidecontainer {\n      width: 100%; \u002F* Width of the outside container *\u002F\n      margin: 0 auto; \u002F* Put in the middle *\u002F\n      display: grid; \n      grid-row-gap: 20px;\n      padding-top: 50px;\n  }\n  \u002F* The slider itself *\u002F\n  .slider {\n      -webkit-appearance: none;  \u002F* Override default CSS styles *\u002F\n      appearance: none;\n      width: 100%; \u002F* Full-width *\u002F\n      height: 15px; \u002F* Specified height *\u002F\n      border-radius: 5px;\n      background: linear-gradient( to right, #f78d8d 0%, #8ff591 100%);\n      outline: none; \u002F* Remove outline *\u002F\n      opacity: 0.7; \u002F* Set transparency (for mouse-over effects on hover) *\u002F\n      -webkit-transition: .2s; \u002F* 0.2 seconds transition on hover *\u002F\n      transition: opacity .2s;\n  }\n\n  \u002F* Mouse-over effects *\u002F\n  .slider:hover {\n      opacity: 1; \u002F* Fully shown on mouse-over *\u002F\n  }\n\n  \u002F* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) *\u002F\n  .slider::-webkit-slider-thumb {\n      -webkit-appearance: none; \u002F* Override default look *\u002F\n      appearance: none;\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: #008B8B; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-moz-range-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: #008B8B; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-ms-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: #008B8B; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  \u002F* Special styling for WebKit\u002FBlink *\u002F\n    input.visible[type=range]::-webkit-slider-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for Firefox *\u002F\n    input.visible[type=range]::-moz-range-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for IE *\u002F\n    input.visible[type=range]::-ms-thumb {\n      background: #008B8B;\n    }\n\n    \u002F* Number input  *\u002F\n    input[type=range] {\n      margin: 0;\n    }\n\n    output {\n      display: inline;\n      position: absolute;\n      top: -65px;\n      width: 50px;\n      height: 50px;\n      border: 1px solid #e2e2e2;\n      background-color: #fff;\n      border-radius: 30px;\n      color: #1b1717;\n      font-size: 1rem;\n      line-height: 45px;\n      text-align: center;\n    }\n\n    .outputOthers {\n      display: inline;\n      position: absolute;\n      top: 30px;\n      border-radius: 30px;\n      color: #1b1717;\n      font-size: 1rem;\n      line-height: 45px;\n      text-align: center;\n    }\n\n    i {\n      border: solid #ff0101;\n      border-width: 0 10px 10px 0;\n      display: inline-block;\n      padding: 3px;\n      width: 30px;\n      height: 30px;\n    }\n\n    .up {\n      transform: rotate(-135deg);\n      -webkit-transform: rotate(-135deg);\n    }\n\n\u003C\u002Fstyle\u003E\n\n\n\u003Cdiv class="container"\u003E\n  \u003Cmain style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n      \u003Cform\u003E \n        \u003Cdiv\u003E\n          \u003Ch2\u003E${parameters.rating_question}\u003C\u002Fh2\u003E \n          \u003Ch1\u003E ${parameters.statement}?\u003C\u002Fh1\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class="slidecontainer"\u003E\n          \u003Cdiv style="position:relative;"\u003E\n            \u003Coutput id="rating_input" name="rangeVal"\u003E\u003C\u002Foutput\u003E\n            \u003Cinput type="range" name="rating_pre" min=1 max=100 value=${state.rating_pre} class="slider" id="rating_pre" readonly disabled\u003E\n            \u003Cdiv class=outputOthers id="rating_others" name="othersVal"\u003E\n              \u003Ci class="arrow up"\u003E\u003C\u002Fi\u003E\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n            \u003Cdiv style="display:grid; justify-content: start;"\u003E\n              \u003Ch2\u003E\n                ${parameters.min_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv style="display:grid; justify-content: end;"\u003E\n              \u003Ch2\u003E\n                ${parameters.max_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E \n        \u003C\u002Fdiv\u003E\n        \u003Cdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Ch2\u003E${parameters.reference_group.charAt(0).toUpperCase() + parameters.reference_group.substring(1)} have rated: ${parameters.providedRating}\u003C\u002Fh2\u003E\n        \u003Cbutton type="submit"\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {
                    run: function anonymous() {
                      const target = document.getElementById('rating_pre');
                      const width = target.parentElement.offsetWidth;
                      const controlMin = target.min;
                      const controlMax = target.max;
                      const controlThumbWidth = 40;

                      const output = document.getElementById('rating_input');
                      const outputOthers = document.getElementById(
                        'rating_others'
                      );

                      const calculateOffset = (value, min, max, thumbWidth) => {
                        const range = controlMax - controlMin;
                        const correction = 2.7 + (-8.2 - 2.7) * (value / 100);
                        const position =
                          ((value - min) / range) * 100 + correction;
                        const offset =
                          Math.round((thumbWidth * position) / 100) -
                          thumbWidth / 2;
                        return `calc(${position}% + ${offset}px)`;
                      };

                      const calculateOffsetOthers = (
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
                          thumbWidth / 2 +
                          10;
                        return `calc(${position}% + ${offset}px)`;
                      };

                      output.style.left = calculateOffset(
                        this.state.rating_pre,
                        controlMin,
                        controlMax,
                        controlThumbWidth
                      );
                      output.value = this.state.rating_pre;
                      outputOthers.style.left = calculateOffsetOthers(
                        this.parameters.providedRating,
                        controlMin,
                        controlMax,
                        controlThumbWidth
                      );
                    },
                  },
                  title: 'Rating 1 + others',
                  tardy: true,
                },
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cstyle\u003E\n\n  .slidecontainer {\n      width: 100%; \u002F* Width of the outside container *\u002F\n      margin: 0 auto; \u002F* Put in the middle *\u002F\n      display: grid; \n      grid-row-gap: 20px;\n      padding-top: 50px;\n  }\n  \u002F* The slider itself *\u002F\n  .slider {\n      -webkit-appearance: none;  \u002F* Override default CSS styles *\u002F\n      appearance: none;\n      width: 100%; \u002F* Full-width *\u002F\n      height: 15px; \u002F* Specified height *\u002F\n      border-radius: 5px;\n      background: linear-gradient( to right, #f78d8d 0%, #8ff591 100%);\n      outline: none; \u002F* Remove outline *\u002F\n      opacity: 0.7; \u002F* Set transparency (for mouse-over effects on hover) *\u002F\n      -webkit-transition: .2s; \u002F* 0.2 seconds transition on hover *\u002F\n      transition: opacity .2s;\n  }\n\n  \u002F* Mouse-over effects *\u002F\n  .slider:hover {\n      opacity: 1; \u002F* Fully shown on mouse-over *\u002F\n  }\n\n  \u002F* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) *\u002F\n  .slider::-webkit-slider-thumb {\n      -webkit-appearance: none; \u002F* Override default look *\u002F\n      appearance: none;\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-moz-range-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-ms-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  \u002F* Special styling for WebKit\u002FBlink *\u002F\n    input.visible[type=range]::-webkit-slider-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for Firefox *\u002F\n    input.visible[type=range]::-moz-range-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for IE *\u002F\n    input.visible[type=range]::-ms-thumb {\n      background: #008B8B;\n    }\n\n    output {\n      display: none;\n      position: absolute;\n      top: -65px;\n      width: 50px;\n      height: 50px;\n      border: 1px solid #e2e2e2;\n      background-color: #fff;\n      border-radius: 30px;\n      color: #1b1717;\n      font-size: 1rem;\n      line-height: 45px;\n      text-align: center;\n    }\n\u003C\u002Fstyle\u003E\n\n\n\u003Cdiv class="container"\u003E\n  \u003Cmain style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n      \u003Cform\u003E \n        \u003Cdiv\u003E\n          \u003Ch2\u003EPlease rate again\u003C\u002Fh2\u003E\n          \u003Ch2\u003E${parameters.rating_question}\u003C\u002Fh2\u003E \n          \u003Ch1\u003E ${parameters.statement}?\u003C\u002Fh1\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class="slidecontainer"\u003E\n          \u003Cdiv style="position:relative;"\u003E\n            \u003Coutput id="rating_input" name="rangeVal"\u003E\u003C\u002Foutput\u003E\n            \u003Cinput type="range" name="rating_post" min=1 max=100 class="slider" id="rating_post"\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n            \u003Cdiv style="display:grid; justify-content: start;"\u003E\n              \u003Ch2\u003E\n                ${parameters.min_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv style="display:grid; justify-content: end;"\u003E\n              \u003Ch2\u003E\n                ${parameters.max_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E \n        \u003C\u002Fdiv\u003E\n        \u003Cdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cbutton type="submit" id="continue_btn" disabled\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {
                    run: function anonymous() {
                      const onTouch = e => {
                        document.getElementById(
                          'continue_btn'
                        ).disabled = false;
                        const target = document.getElementById('rating_post');
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

                      document.getElementById('rating_post').oninput = function(
                        e
                      ) {
                        onTouch(e);
                      };
                      document.getElementById('rating_post').onclick = function(
                        e
                      ) {
                        onTouch(e);
                      };
                      document.getElementById('rating_post').ontouch = function(
                        e
                      ) {
                        onTouch(e);
                      };
                    },
                  },
                  title: 'Rating 2',
                },
                {
                  type: 'lab.html.Screen',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {},
                  title: 'Inter-trial interval',
                  timeout: '${parameters.presentationTimeITI}',
                  content: '\u003Cmain\u003E\n\n\n\u003C\u002Fmain\u003E',
                },
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cdiv class="container"\u003E\n  \u003Cmain class="content-horizontal-center\n               content-vertical-center"\n               style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n        \u003Ch1\u003E\n           Instructions\n        \u003C\u002Fh1\u003E\n\n        \u003Cp\u003E\n          If you feel ready to continue to the actual experiment, please click continue. If not, click \'More Practice\', to do more practice trials. \n        \u003C\u002Fp\u003E\n\n        \u003Cform\u003E\n          \u003Cbutton type="submit"\u003EMore Practice\u003C\u002Fbutton\u003E\n        \u003C\u002Fform\u003E\n\n        \u003Cbutton id="breakPractice"\u003EContinue\u003C\u002Fbutton\u003E\n        \n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n\n\n\n',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {
                    run: function anonymous() {
                      document.getElementById('breakPractice').onclick = e => {
                        this.parent.parent.end();
                      };
                    },
                  },
                  title: 'Break up the practice',
                },
              ],
            },
          },
        },
        {
          type: 'lab.html.Frame',
          context:
            '\u003Cmain data-labjs-section="frame"\u003E\n  \u003C!-- Content gets inserted here --\u003E\n\u003C\u002Fmain\u003E\n\n',
          contextSelector: '[data-labjs-section="frame"]',
          files: {},
          parameters: {},
          responses: {},
          messageHandlers: {},
          title: 'Frame',
          content: {
            type: 'lab.flow.Loop',
            files: {},
            parameters: {},
            templateParameters: [
              {
                number: '1',
                statement: 'Recycle plastic',
              },
              {
                number: '2',
                statement: 'Recycle paper goods',
              },
              {
                number: '3',
                statement: 'Recycle newspapers',
              },
              {
                number: '4',
                statement: 'Recycle glass',
              },
              {
                number: '5',
                statement:
                  'Donate books, clothes and furniture to a charity shop',
              },
              {
                number: '6',
                statement: 'Pick up trash on the street',
              },
              {
                number: '7',
                statement: 'Fix broken things rather than replacing them',
              },
              {
                number: '8',
                statement: 'Buy used CDs, DVDs and books',
              },
              {
                number: '9',
                statement: 'Rent CDs and DVDs and books from the local library',
              },
              {
                number: '10',
                statement:
                  'Throw away things in the trash that could be recycled',
              },
              {
                number: '11',
                statement:
                  'Incorrectly put things in recycling bins that can’t be recycled',
              },
              {
                number: '12',
                statement: 'Recycle your cell phone',
              },
              {
                number: '13',
                statement:
                  'Unplug electronics from the wall socket when they’re not in use',
              },
              {
                number: '14',
                statement: 'Turn off the light',
              },
              {
                number: '15',
                statement: 'Leave lights and electronic devices on',
              },
              {
                number: '16',
                statement:
                  'Work in natural light instead of using electric light',
              },
              {
                number: '17',
                statement: 'Buy a computer that uses less energy',
              },
              {
                number: '18',
                statement:
                  'Turn your computer off overnight\u002Fwhen not in use',
              },
              {
                number: '19',
                statement: 'Conduct an energy audit at your school',
              },
              {
                number: '20',
                statement: 'Switch your light bulbs to LED',
              },
              {
                number: '21',
                statement: 'Use energy efficient light bulbs',
              },
              {
                number: '22',
                statement:
                  'Turn off your computer when not using it for more than 2 hours',
              },
              {
                number: '23',
                statement: 'Take the stairs instead of the elevator',
              },
              {
                number: '24',
                statement: 'Send emails instead of letters',
              },
              {
                number: '25',
                statement: 'Avoid unnecessary printing',
              },
              {
                number: '26',
                statement: 'Hang clothes to dry instead of using the dryer',
              },
              {
                number: '27',
                statement:
                  'Use a colder water temperature when doing the laundry',
              },
              {
                number: '28',
                statement: 'Do a half-load of laundry',
              },
              {
                number: '29',
                statement: 'Adjust the temperature in your home',
              },
              {
                number: '30',
                statement: 'Join climate related demonstrations',
              },
              {
                number: '31',
                statement: 'Educate others about climate change',
              },
              {
                number: '32',
                statement: 'Spread awareness about renewable energy',
              },
              {
                number: '33',
                statement:
                  'Ask your librarian at school to provide books about climate change',
              },
              {
                number: '34',
                statement: 'Learn how sea-level rise will affect your city',
              },
              {
                number: '35',
                statement: 'Listen to a climate podcast',
              },
              {
                number: '36',
                statement:
                  'Write a letter to automakers urging them to improve fuel efficiency in cars',
              },
              {
                number: '37',
                statement: 'Join a local environmental club',
              },
              {
                number: '38',
                statement: 'Start an environmental club at your school',
              },
              {
                number: '39',
                statement:
                  'Start a campaign at your school to switch to green power',
              },
              {
                number: '40',
                statement: 'Start a global warming study group',
              },
              {
                number: '41',
                statement:
                  'Host a global climate change film-festival for your friends and family or at your school',
              },
              {
                number: '42',
                statement:
                  'Monitor your local newspaper for stories related to global climate change',
              },
              {
                number: '43',
                statement:
                  'Write a letter about global climate change to the editor of your local newspaper',
              },
              {
                number: '44',
                statement: 'Sign petitions to stop climate change',
              },
              {
                number: '45',
                statement:
                  'Volunteer in street campaigning against climate change',
              },
              {
                number: '46',
                statement:
                  'Encourage a friend or peer to adopt more sustainable environmental habits',
              },
              {
                number: '47',
                statement: 'Talk with a friend or peer about climate change',
              },
              {
                number: '48',
                statement: 'Talk with a parent about climate change',
              },
              {
                number: '49',
                statement: 'Teach students about climate change and ecosystems',
              },
              {
                number: '50',
                statement:
                  'Attend an earth day or climate change march or rally',
              },
              {
                number: '51',
                statement:
                  'Write to an elected official about a climate change-related concern',
              },
              {
                number: '52',
                statement:
                  'Go to a town hall about a climate change-related concern',
              },
              {
                number: '53',
                statement: 'Fly less',
              },
              {
                number: '54',
                statement: 'Take a bike instead of using the car',
              },
              {
                number: '55',
                statement: 'Take the subway instead of calling a taxi',
              },
              {
                number: '56',
                statement: 'Carpool with friends',
              },
              {
                number: '57',
                statement: 'If you fly, pay to offset your emissions',
              },
              {
                number: '58',
                statement: 'Use public transportation',
              },
              {
                number: '59',
                statement:
                  'Map a two-mile circle around your house and walk everywhere within it',
              },
              {
                number: '60',
                statement: 'If you fly, fly nonstop',
              },
              {
                number: '61',
                statement: 'Drive places that are close enough to walk',
              },
              {
                number: '62',
                statement:
                  'Leave your car on when waiting instead of turning it off',
              },
              {
                number: '63',
                statement: 'Use cruise control when driving',
              },
              {
                number: '64',
                statement: 'Avoid air travel',
              },
              {
                number: '65',
                statement: 'Use reusable bags when shopping',
              },
              {
                number: '66',
                statement: 'Say no to plastic bags',
              },
              {
                number: '67',
                statement: 'Buy products with less packaging',
              },
              {
                number: '68',
                statement:
                  'Buy clothes from thrift stores or vintage clothing shops or yard sales',
              },
              {
                number: '69',
                statement:
                  'Purchase new clothing from makers of organic cotton and natural fiber products',
              },
              {
                number: '70',
                statement:
                  'Buy fast fashion (e.g. ASOS, H&M, Zara, Topshop, Urban Outfitters)',
              },
              {
                number: '71',
                statement: 'Buy less stuff on a weekly basis',
              },
              {
                number: '72',
                statement: 'Buy and use environmental friendly shower gel',
              },
              {
                number: '73',
                statement: 'Buy only what you will use',
              },
              {
                number: '74',
                statement:
                  'Instead of ordering products via Amazon, buy them at your local store',
              },
              {
                number: '75',
                statement: 'Shop online',
              },
              {
                number: '76',
                statement: 'Buy second hand items and products',
              },
              {
                number: '77',
                statement: 'Buy local products',
              },
              {
                number: '78',
                statement: 'Buy from companies with eco-friendly policies',
              },
              {
                number: '79',
                statement: 'Eat less meat',
              },
              {
                number: '80',
                statement: 'Have a vegetarian day',
              },
              {
                number: '81',
                statement:
                  'Consume seasonal foods that are locally grown or produced closer to home',
              },
              {
                number: '82',
                statement: 'Grow your own vegetables and greens',
              },
              {
                number: '83',
                statement: 'Swap your lunch containers for reusable ones',
              },
              {
                number: '84',
                statement: 'Swap your bottles for reusable ones',
              },
              {
                number: '85',
                statement: 'Eat organic food',
              },
              {
                number: '86',
                statement:
                  'Drink bottled water\u002Fdrink from a disposable bottle',
              },
              {
                number: '87',
                statement: 'Drink from a reusable bottle',
              },
              {
                number: '88',
                statement: 'Compost food waste',
              },
              {
                number: '89',
                statement: 'Have a compost pile',
              },
              {
                number: '90',
                statement: 'Ditch dairy products',
              },
              {
                number: '91',
                statement: 'Make your own food, bread and snacks',
              },
              {
                number: '92',
                statement:
                  'Avoid disposable products (e.g. plastic plates and utensils)',
              },
              {
                number: '93',
                statement: 'Use reusable cups, plates, and\u002For cutlery',
              },
              {
                number: '94',
                statement: 'Order for delivery',
              },
              {
                number: '95',
                statement: 'Stop throwing out food - instead plan your menu',
              },
              {
                number: '96',
                statement: 'To keep track of your trash (i.e. making a log)',
              },
              {
                number: '97',
                statement: 'Use a metal straw instead of a plastic straw',
              },
              {
                number: '98',
                statement:
                  'Dine locally (i.e. supporting restaurants that serve locally grown food)',
              },
              {
                number: '99',
                statement: 'Waste napkins',
              },
              {
                number: '100',
                statement: 'Plant trees',
              },
              {
                number: '101',
                statement:
                  'Get involved in a community forest restoration programme in your area',
              },
              {
                number: '102',
                statement:
                  'Plant a community garden or have a home vegetable garden',
              },
              {
                number: '103',
                statement: 'Support your local river clean-up',
              },
              {
                number: '104',
                statement:
                  'Get involved in efforts to make your school more green',
              },
              {
                number: '105',
                statement:
                  'Water first thing before the sun is up (i.e. to reduce water wasted to evaporation)',
              },
              {
                number: '106',
                statement: 'Take cold showers',
              },
              {
                number: '107',
                statement: 'Take a shower instead of a bath',
              },
              {
                number: '108',
                statement: 'Take shorter showers',
              },
              {
                number: '109',
                statement: 'Turn off the tap when brushing your teeth',
              },
              {
                number: '110',
                statement:
                  'Shower before going to bed (there is less fossil fuelled electricity generation after 9 pm).',
              },
              {
                number: '111',
                statement: 'Wash your clothing less often',
              },
              {
                number: '112',
                statement: 'Wear clothes multiple times',
              },
              {
                number: '113',
                statement: 'Have a rain barrel or catch',
              },
              {
                number: '114',
                statement:
                  'Pre-rinse the dishes before putting them in the dishwasher',
              },
              {
                number: '115',
                statement:
                  'Donate your pocket money to your favorite climate change group',
              },
            ],
            sample: {
              mode: 'sequential',
              n: '',
            },
            responses: {},
            messageHandlers: {
              'before:prepare': function anonymous() {
                // construct trials
                // take the parameters from the outside or fallback to test parameters
                let initParameters;
                if (
                  this.parameters.showCustomStatements === 'Yes' &&
                  this.parameters.statements
                ) {
                  const statements = this.parameters.statements.split('\n');
                  const params = statements.map((statement, number) => ({
                    number,
                    statement,
                  }));
                  initParameters = params;
                } else {
                  initParameters = this.options.templateParameters;
                }

                // take the number of trials from outside of fallback to the length of provided parameters
                let numberTrials = this.parameters.numberOfTrials;
                if (numberTrials > initParameters.length) {
                  numberTrials = initParameters.length;
                }
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
                  statement: trial.statement,
                  stage: 'experiment',
                  otherRatingGroup: i % 3, // 0 - less, 1 - similar, 3 - bigger
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
              parameters: {},
              responses: {},
              messageHandlers: {
                'before:prepare': function anonymous() {
                  this.state.trialNum =
                    parseInt(this.options.id.split('_').pop()) + 1;
                },
              },
              title: 'Sequence',
              tardy: true,
              content: [
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cstyle\u003E\n\n  .slidecontainer {\n      width: 100%; \u002F* Width of the outside container *\u002F\n      margin: 0 auto; \u002F* Put in the middle *\u002F\n      display: grid; \n      grid-row-gap: 20px;\n      padding-top: 50px;\n  }\n  \u002F* The slider itself *\u002F\n  .slider {\n      -webkit-appearance: none;  \u002F* Override default CSS styles *\u002F\n      appearance: none;\n      width: 100%; \u002F* Full-width *\u002F\n      height: 15px; \u002F* Specified height *\u002F\n      border-radius: 5px;\n      background: linear-gradient( to right, #f78d8d 0%, #8ff591 100%);\n      outline: none; \u002F* Remove outline *\u002F\n      opacity: 0.7; \u002F* Set transparency (for mouse-over effects on hover) *\u002F\n      -webkit-transition: .2s; \u002F* 0.2 seconds transition on hover *\u002F\n      transition: opacity .2s;\n  }\n\n  \u002F* Mouse-over effects *\u002F\n  .slider:hover {\n      opacity: 1; \u002F* Fully shown on mouse-over *\u002F\n  }\n\n  \u002F* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) *\u002F\n  .slider::-webkit-slider-thumb {\n      -webkit-appearance: none; \u002F* Override default look *\u002F\n      appearance: none;\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-moz-range-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-ms-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  \u002F* Special styling for WebKit\u002FBlink *\u002F\n    input.visible[type=range]::-webkit-slider-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for Firefox *\u002F\n    input.visible[type=range]::-moz-range-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for IE *\u002F\n    input.visible[type=range]::-ms-thumb {\n      background: #008B8B;\n    }\n\n    output {\n      display: none;\n      position: absolute;\n      top: -65px;\n      width: 50px;\n      height: 50px;\n      border: 1px solid #e2e2e2;\n      background-color: #fff;\n      border-radius: 30px;\n      color: #1b1717;\n      font-size: 1rem;\n      line-height: 45px;\n      text-align: center;\n    }\n\u003C\u002Fstyle\u003E\n\n\n\u003Cdiv class="container"\u003E\n  \u003Cmain style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n      Trial ${state.trialNum} out of ${parameters.numberOfTrials}\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E\n      \u003Cform\u003E \n        \u003Cdiv\u003E\n          \u003Ch2\u003E${parameters.rating_question}\u003C\u002Fh2\u003E \n          \u003Ch1\u003E ${parameters.statement}?\u003C\u002Fh1\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class="slidecontainer"\u003E\n          \u003Cdiv style="position:relative;"\u003E\n            \u003Coutput id="rating_input" name="rangeVal"\u003E\u003C\u002Foutput\u003E\n            \u003Cinput type="range" name="rating_pre" min=1 max=100 class="slider" id="rating_pre"\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n            \u003Cdiv style="display:grid; justify-content: start;"\u003E\n              \u003Ch2\u003E\n                ${parameters.min_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv style="display:grid; justify-content: end;"\u003E\n              \u003Ch2\u003E\n                ${parameters.max_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E \n        \u003C\u002Fdiv\u003E\n        \u003Cdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cbutton type="submit" id="continue_btn" disabled\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n\n\n',
                  files: {},
                  parameters: {},
                  responses: {},
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
                    end: function anonymous() {
                      const originalRating = parseInt(this.data.rating_pre);
                      const group = parseInt(this.parameters.otherRatingGroup);

                      let providedRating = 0;
                      if (group === 0) {
                        providedRating = getRandomIntInclusive(
                          1,
                          Math.max(0, originalRating - 10)
                        );
                      } else if (group === 1) {
                        providedRating = getRandomIntInclusive(
                          Math.max(1, originalRating - 10),
                          Math.min(originalRating + 10, 100)
                        );
                      } else if (group === 2) {
                        providedRating = getRandomIntInclusive(
                          Math.min(originalRating + 10, 101),
                          100
                        );
                      }

                      if (providedRating < 1 || providedRating > 100) {
                        providedRating = getRandomIntInclusive(1, 100);
                      }

                      this.data.providedRating = providedRating;

                      // a helper function to get a random number betweeen min and max
                      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
                      function getRandomIntInclusive(min, max) {
                        if (min > max) {
                          return 0;
                        }
                        if (min === max) {
                          return min;
                        }
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return (
                          Math.floor(Math.random() * (max - min + 1)) + min
                        ); // The maximum is inclusive and the minimum is inclusive
                      }
                    },
                  },
                  title: 'Rating 1',
                  tardy: true,
                },
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cstyle\u003E\n\n  .slidecontainer {\n      width: 100%; \u002F* Width of the outside container *\u002F\n      margin: 0 auto; \u002F* Put in the middle *\u002F\n      display: grid; \n      grid-row-gap: 20px;\n      padding-top: 50px;\n  }\n  \u002F* The slider itself *\u002F\n  .slider {\n      -webkit-appearance: none;  \u002F* Override default CSS styles *\u002F\n      appearance: none;\n      width: 100%; \u002F* Full-width *\u002F\n      height: 15px; \u002F* Specified height *\u002F\n      border-radius: 5px;\n      background: linear-gradient( to right, #f78d8d 0%, #8ff591 100%);\n      outline: none; \u002F* Remove outline *\u002F\n      opacity: 0.7; \u002F* Set transparency (for mouse-over effects on hover) *\u002F\n      -webkit-transition: .2s; \u002F* 0.2 seconds transition on hover *\u002F\n      transition: opacity .2s;\n  }\n\n  \u002F* Mouse-over effects *\u002F\n  .slider:hover {\n      opacity: 1; \u002F* Fully shown on mouse-over *\u002F\n  }\n\n  \u002F* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) *\u002F\n  .slider::-webkit-slider-thumb {\n      -webkit-appearance: none; \u002F* Override default look *\u002F\n      appearance: none;\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: #008B8B; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-moz-range-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: #008B8B; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-ms-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: #008B8B; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  \u002F* Special styling for WebKit\u002FBlink *\u002F\n    input.visible[type=range]::-webkit-slider-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for Firefox *\u002F\n    input.visible[type=range]::-moz-range-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for IE *\u002F\n    input.visible[type=range]::-ms-thumb {\n      background: #008B8B;\n    }\n\n    \u002F* Number input  *\u002F\n    input[type=range] {\n      margin: 0;\n    }\n\n    output {\n      display: inline;\n      position: absolute;\n      top: -65px;\n      width: 50px;\n      height: 50px;\n      border: 1px solid #e2e2e2;\n      background-color: #fff;\n      border-radius: 30px;\n      color: #1b1717;\n      font-size: 1rem;\n      line-height: 45px;\n      text-align: center;\n    }\n\n    .outputOthers {\n      display: inline;\n      position: absolute;\n      top: 30px;\n      border-radius: 30px;\n      color: #1b1717;\n      font-size: 1rem;\n      line-height: 45px;\n      text-align: center;\n    }\n\n    i {\n      border: solid #ff0101;\n      border-width: 0 10px 10px 0;\n      display: inline-block;\n      padding: 3px;\n      width: 30px;\n      height: 30px;\n    }\n\n    .up {\n      transform: rotate(-135deg);\n      -webkit-transform: rotate(-135deg);\n    }\n\n\u003C\u002Fstyle\u003E\n\n\n\u003Cdiv class="container"\u003E\n  \u003Cmain style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n      \u003Cform\u003E \n        \u003Cdiv\u003E\n          Trial ${state.trialNum} out of ${parameters.numberOfTrials}\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv\u003E\n          \u003Ch2\u003E${parameters.rating_question}\u003C\u002Fh2\u003E \n          \u003Ch1\u003E ${parameters.statement}?\u003C\u002Fh1\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class="slidecontainer"\u003E\n          \u003Cdiv style="position:relative;"\u003E\n            \u003Coutput id="rating_input" name="rangeVal"\u003E\u003C\u002Foutput\u003E\n            \u003Cinput type="range" name="rating_pre" min=1 max=100 value=${state.rating_pre} class="slider" id="rating_pre" readonly disabled\u003E\n            \u003Cdiv class=outputOthers id="rating_others" name="othersVal"\u003E\n              \u003Ci class="arrow up"\u003E\u003C\u002Fi\u003E\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n            \u003Cdiv style="display:grid; justify-content: start;"\u003E\n              \u003Ch2\u003E\n                ${parameters.min_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv style="display:grid; justify-content: end;"\u003E\n              \u003Ch2\u003E\n                ${parameters.max_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E \n        \u003C\u002Fdiv\u003E\n        \u003Cdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Ch2\u003E${parameters.reference_group.charAt(0).toUpperCase() + parameters.reference_group.substring(1)} have rated: ${state.providedRating}\u003C\u002Fh2\u003E\n        \u003Cbutton type="submit"\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {
                    run: function anonymous() {
                      const target = document.getElementById('rating_pre');
                      const width = target.parentElement.offsetWidth;
                      const controlMin = target.min;
                      const controlMax = target.max;
                      const controlThumbWidth = 40;

                      const output = document.getElementById('rating_input');
                      const outputOthers = document.getElementById(
                        'rating_others'
                      );

                      const calculateOffset = (value, min, max, thumbWidth) => {
                        const range = controlMax - controlMin;
                        const correction = 2.7 + (-8.2 - 2.7) * (value / 100);
                        const position =
                          ((value - min) / range) * 100 + correction;
                        const offset =
                          Math.round((thumbWidth * position) / 100) -
                          thumbWidth / 2;
                        return `calc(${position}% + ${offset}px)`;
                      };

                      const calculateOffsetOthers = (
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
                          thumbWidth / 2 +
                          10;
                        return `calc(${position}% + ${offset}px)`;
                      };

                      output.style.left = calculateOffset(
                        this.state.rating_pre,
                        controlMin,
                        controlMax,
                        controlThumbWidth
                      );
                      output.value = this.state.rating_pre;
                      outputOthers.style.left = calculateOffsetOthers(
                        this.state.providedRating,
                        controlMin,
                        controlMax,
                        controlThumbWidth
                      );
                    },
                  },
                  title: 'Rating 1 + others',
                  tardy: true,
                },
                {
                  type: 'lab.html.Form',
                  content:
                    '\u003Cstyle\u003E\n\n  .slidecontainer {\n      width: 100%; \u002F* Width of the outside container *\u002F\n      margin: 0 auto; \u002F* Put in the middle *\u002F\n      display: grid; \n      grid-row-gap: 20px;\n      padding-top: 50px;\n  }\n  \u002F* The slider itself *\u002F\n  .slider {\n      -webkit-appearance: none;  \u002F* Override default CSS styles *\u002F\n      appearance: none;\n      width: 100%; \u002F* Full-width *\u002F\n      height: 15px; \u002F* Specified height *\u002F\n      border-radius: 5px;\n      background: linear-gradient( to right, #f78d8d 0%, #8ff591 100%);\n      outline: none; \u002F* Remove outline *\u002F\n      opacity: 0.7; \u002F* Set transparency (for mouse-over effects on hover) *\u002F\n      -webkit-transition: .2s; \u002F* 0.2 seconds transition on hover *\u002F\n      transition: opacity .2s;\n  }\n\n  \u002F* Mouse-over effects *\u002F\n  .slider:hover {\n      opacity: 1; \u002F* Fully shown on mouse-over *\u002F\n  }\n\n  \u002F* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) *\u002F\n  .slider::-webkit-slider-thumb {\n      -webkit-appearance: none; \u002F* Override default look *\u002F\n      appearance: none;\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-moz-range-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-ms-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  \u002F* Special styling for WebKit\u002FBlink *\u002F\n    input.visible[type=range]::-webkit-slider-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for Firefox *\u002F\n    input.visible[type=range]::-moz-range-thumb {\n      background: #008B8B;\n    }\n    \u002F* All the same stuff for IE *\u002F\n    input.visible[type=range]::-ms-thumb {\n      background: #008B8B;\n    }\n\n    output {\n      display: none;\n      position: absolute;\n      top: -65px;\n      width: 50px;\n      height: 50px;\n      border: 1px solid #e2e2e2;\n      background-color: #fff;\n      border-radius: 30px;\n      color: #1b1717;\n      font-size: 1rem;\n      line-height: 45px;\n      text-align: center;\n    }\n\u003C\u002Fstyle\u003E\n\n\n\u003Cdiv class="container"\u003E\n  \u003Cmain style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n      \u003Cform\u003E \n        \u003Cdiv\u003E\n          Trial ${state.trialNum} out of ${parameters.numberOfTrials}\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv\u003E\n          \u003Ch2\u003EPlease rate again\u003C\u002Fh2\u003E\n          \u003Ch2\u003E${parameters.rating_question}\u003C\u002Fh2\u003E \n          \u003Ch1\u003E ${parameters.statement}?\u003C\u002Fh1\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class="slidecontainer"\u003E\n          \u003Cdiv style="position:relative;"\u003E\n            \u003Coutput id="rating_input" name="rangeVal"\u003E\u003C\u002Foutput\u003E\n            \u003Cinput type="range" name="rating_post" min=1 max=100 class="slider" id="rating_post"\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv style="display:grid; grid-template-columns: 1fr 1fr;"\u003E\n            \u003Cdiv style="display:grid; justify-content: start;"\u003E\n              \u003Ch2\u003E\n                ${parameters.min_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv style="display:grid; justify-content: end;"\u003E\n              \u003Ch2\u003E\n                ${parameters.max_rating_label}\n              \u003C\u002Fh2\u003E\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E \n        \u003C\u002Fdiv\u003E\n        \u003Cdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cbutton type="submit" id="continue_btn" disabled\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {
                    run: function anonymous() {
                      const onTouch = e => {
                        document.getElementById(
                          'continue_btn'
                        ).disabled = false;
                        const target = document.getElementById('rating_post');
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

                      document.getElementById('rating_post').oninput = function(
                        e
                      ) {
                        onTouch(e);
                      };
                      document.getElementById('rating_post').onclick = function(
                        e
                      ) {
                        onTouch(e);
                      };
                      document.getElementById('rating_post').ontouch = function(
                        e
                      ) {
                        onTouch(e);
                      };

                      this.data.rating_pre = this.state.rating_pre;
                      this.data.providedRating = this.state.providedRating;
                    },
                  },
                  title: 'Rating 2',
                  tardy: true,
                },
                {
                  type: 'lab.html.Screen',
                  files: {},
                  parameters: {},
                  responses: {},
                  messageHandlers: {},
                  title: 'Inter-trial interval',
                  timeout: '${parameters.presentationTimeITI}',
                  content: '\u003Cmain\u003E\n\n\n\u003C\u002Fmain\u003E',
                  tardy: true,
                },
              ],
            },
          },
        },
        {
          type: 'lab.html.Form',
          content:
            '\u003Cdiv class="container"\u003E\n  \u003Cmain class="content-horizontal-center\n               content-vertical-center"\n               style="background: #fffaf0b5"\u003E\n    \u003Cdiv\u003E\n        \u003Cp\u003E\n          Thank you for your participation!\n        \u003C\u002Fp\u003E\n\n        \u003Cform\u003E\n          \u003Cbutton type="submit"\u003EFinish\u003C\u002Fbutton\u003E\n        \u003C\u002Fform\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E',
          files: {},
          parameters: {},
          responses: {},
          messageHandlers: {},
          title: 'End',
        },
      ],
    },
  ],
};

// export
export default studyObject;
