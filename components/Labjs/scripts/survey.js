// Define study
const studyObject = {
  title: 'root',
  type: 'lab.flow.Sequence',
  parameters: {},
  plugins: [],
  metadata: {
    title: '',
    description: '',
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
          const pages = JSON.parse(this.parameters.pages);
          this.parameters.pages = pages.map((page, number) => ({
            ...page,
            number: number + 1,
          }));
          this.parameters.numberOfPages = pages.length;
        },
      },
      title: 'Survey',
      content: [
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
                this.options.templateParameters = this.parameters.pages || [];
                // randomize if needed
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
                    '\u003Cheader\u003E\n Page ${this.parameters.number} out of ${this.parameters.numberOfPages}\n\u003C\u002Fheader\u003E\n\n\u003Cdiv class="container"\u003E\n  \u003Cmain class="content-horizontal-center\n               content-vertical-center"\n               style="background: ${this.parameters.backgroundColor}"\u003E\n \n      \u003Cform style="width:100%;"\u003E\n        \u003Cdiv id="questionForm"\u003E\u003C\u002Fdiv\u003E\n        \u003Cbutton type="submit" id="continue_btn"\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fform\u003E\n  \n  \u003C\u002Fmain\u003E\n\u003C\u002Fdiv\u003E\n\n\n\u003Cstyle\u003E\n\n  .slidecontainer {\n      width: 100%; \u002F* Width of the outside container *\u002F\n      margin: 0 auto; \u002F* Put in the middle *\u002F\n      display: grid; \n      grid-row-gap: 20px;\n      padding-top: 50px;\n  }\n  \u002F* The slider itself *\u002F\n  .slider {\n      -webkit-appearance: none;  \u002F* Override default CSS styles *\u002F\n      appearance: none;\n      width: 100%; \u002F* Full-width *\u002F\n      height: 15px; \u002F* Specified height *\u002F\n      border-radius: 5px;\n      background: linear-gradient( to right, #ddd 0%, rgb(180, 180, 180) 100%);\n      outline: none; \u002F* Remove outline *\u002F\n      opacity: 0.7; \u002F* Set transparency (for mouse-over effects on hover) *\u002F\n      -webkit-transition: .2s; \u002F* 0.2 seconds transition on hover *\u002F\n      transition: opacity .2s;\n  }\n\n  \u002F* Mouse-over effects *\u002F\n  .slider:hover {\n      opacity: 1; \u002F* Fully shown on mouse-over *\u002F\n  }\n\n  \u002F* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) *\u002F\n  .slider::-webkit-slider-thumb {\n      -webkit-appearance: none; \u002F* Override default look *\u002F\n      appearance: none;\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-moz-range-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  .slider::-ms-thumb {\n      width: 40px; \u002F* Set a specific slider handle width *\u002F\n      height: 40px; \u002F* Slider handle height *\u002F\n      border-radius: 50%; \n      background: transparent; \u002F* Green background *\u002F\n      cursor: pointer; \u002F* Cursor on hover *\u002F\n      border: 1px solid transparent;\n  }\n\n  \u002F* Special styling for WebKit\u002FBlink *\u002F\n    input.visible[type=range]::-webkit-slider-thumb {\n      background: #d4425f;\n    }\n    \u002F* All the same stuff for Firefox *\u002F\n    input.visible[type=range]::-moz-range-thumb {\n      background: #d4425f;\n    }\n    \u002F* All the same stuff for IE *\u002F\n    input.visible[type=range]::-ms-thumb {\n      background: #d4425f;\n    }\n\n    output {\n      display: none;\n      position: absolute;\n      top: -65px;\n      width: 50px;\n      height: 50px;\n      border: 1px solid #e2e2e2;\n      background-color: #fff;\n      border-radius: 30px;\n      color: #1b1717;\n      font-size: 1rem;\n      line-height: 45px;\n      text-align: center;\n    }\n\u003C\u002Fstyle\u003E',
                  scrollTop: true,
                  files: {},
                  responses: {},
                  parameters: {},
                  messageHandlers: {
                    run: function anonymous() {
                      const questionForm = document.querySelector(
                        '#questionForm'
                      );

                      for (const question of this.parameters.page) {
                        if (question.type === 'text') {
                          const text = document.createElement('div');
                          const header = document.createElement('p');
                          header.textContent = question.header;
                          text.appendChild(header);
                          const textContent = document.createElement('p');
                          textContent.textContent = question.text;
                          text.appendChild(textContent);
                          questionForm.appendChild(text);
                        }

                        if (question.type === 'freeinput') {
                          const freeinput = document.createElement('div');
                          freeinput.style = 'display: grid;';
                          const header = document.createElement('p');
                          header.textContent = question.header;
                          freeinput.appendChild(header);
                          const textarea = document.createElement('textarea');
                          textarea.style = 'display: initial';
                          textarea.rows = 10;
                          textarea.cols = 50;
                          textarea.name = question.header
                            .toLowerCase()
                            .split(' ')
                            .join('-');
                          textarea.autofocus = true;
                          freeinput.appendChild(textarea);
                          questionForm.appendChild(freeinput);
                        }

                        if (question.type === 'select') {
                          const select = document.createElement('div');
                          const selectWrapper = document.createElement('div');
                          selectWrapper.style =
                            'display: grid; justify-content: center;';
                          const header = document.createElement('p');
                          header.textContent = question.header;
                          select.appendChild(header);
                          const options = document.createElement('table');
                          options.style =
                            'text-align: center; display: inline-block';
                          const optionsParameters = question.options;
                          const questionSlug = question.header
                            .toLowerCase()
                            .split(' ')
                            .join('-');
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
                          selectWrapper.appendChild(options);
                          select.appendChild(selectWrapper);
                          questionForm.appendChild(select);
                        }

                        if (question.type === 'likert') {
                          const likert = document.createElement('div');
                          const header = document.createElement('p');
                          header.textContent = question.header;
                          likert.appendChild(header);
                          const likertTable = document.createElement('table');
                          likertTable.style =
                            'text-align: center; table-layout: fixed;';
                          const items = question.items || [];
                          const options = question.options || [];
                          const questionSlug = question.header
                            .toLowerCase()
                            .split(' ')
                            .join('-');
                          // create a header of the table
                          const tableHeader = document.createElement('tr');
                          const e = document.createElement('div');
                          tableHeader.appendChild(e);
                          for (const option of options) {
                            const l = document.createElement('label');
                            l.textContent = option;
                            const td_h = document.createElement('th');
                            td_h.appendChild(l);
                            tableHeader.appendChild(td_h);
                          }
                          likertTable.appendChild(tableHeader);

                          // append items
                          for (const item of items) {
                            // create slugs
                            const itemName = item
                              .toLowerCase()
                              .split(' ')
                              .join('-');
                            const itemSlug = `${questionSlug}-${itemName}`;
                            // append label
                            const div = document.createElement('tr');
                            const a = document.createElement('label');
                            a.textContent = item;
                            const td_a = document.createElement('td');
                            td_a.style['text-align'] = 'start';
                            td_a.appendChild(a);
                            div.appendChild(td_a);
                            // append radio buttons
                            for (const option of options) {
                              const valueSlug = option
                                .toLowerCase()
                                .split(' ')
                                .join('-');
                              const o = document.createElement('INPUT');
                              o.setAttribute('type', 'radio');
                              o.setAttribute('name', itemSlug);
                              o.setAttribute('value', valueSlug);
                              o.setAttribute('id', `${itemSlug}-${valueSlug}`);
                              const td_o = document.createElement('td');
                              td_o.appendChild(o);
                              div.appendChild(td_o);
                            }
                            likertTable.appendChild(div);
                          }
                          likert.appendChild(likertTable);
                          questionForm.appendChild(likert);
                        }

                        if (question.type === 'vas') {
                          const vas = document.createElement('div');
                          vas.style = 'display: grid;';
                          const header = document.createElement('p');
                          header.textContent = question.header;
                          vas.appendChild(header);

                          const slider = document.createElement('div');
                          slider.id = 'slider';
                          const slidecontainer = document.createElement('div');
                          slidecontainer.classList.add('slidecontainer');

                          const outputContainer = document.createElement('div');
                          outputContainer.style = 'position:relative;';
                          const output = document.createElement('output');
                          output.name = 'rangeVal';
                          const input = document.createElement('input');
                          input.type = 'range';
                          input.name = question.header
                            .toLowerCase()
                            .split(' ')
                            .join('-');
                          input.min = question.min_value || 1;
                          input.max = question.max_value || 100;
                          input.classList.add('slider');
                          outputContainer.appendChild(output);
                          outputContainer.appendChild(input);

                          const outerLabelContainer = document.createElement(
                            'div'
                          );
                          outerLabelContainer.style =
                            'display:grid; grid-template-columns: 1fr 1fr;';

                          const leftLabelContainer = document.createElement(
                            'div'
                          );
                          leftLabelContainer.style =
                            'display:grid; justify-content: start;';
                          const leftLabel = document.createElement('p');
                          leftLabel.textContent = question.min_rating_label;
                          leftLabelContainer.appendChild(leftLabel);

                          const rightLabelContainer = document.createElement(
                            'div'
                          );
                          rightLabelContainer.style =
                            'display:grid; justify-content: end;';
                          const rightLabel = document.createElement('p');
                          rightLabel.textContent = question.max_rating_label;
                          rightLabelContainer.appendChild(rightLabel);

                          outerLabelContainer.appendChild(leftLabelContainer);
                          outerLabelContainer.appendChild(rightLabelContainer);

                          slidecontainer.appendChild(outputContainer);
                          slidecontainer.appendChild(outerLabelContainer);
                          slider.appendChild(slidecontainer);

                          slider.style.display = 'block';
                          const { min_value } = question;
                          const { max_value } = question;

                          const onTouch = e => {
                            input.classList.add('visible');
                            if (min_value && max_value) {
                              const minValue = input.min;
                              const maxValue = input.max;
                              const val = input.value;
                              const thumbWidth = 50;
                              const newVal = Number(
                                ((val - minValue) * 100) / (maxValue - minValue)
                              );
                              const correction = 3 - (newVal / 100) * 6;
                              output.style.left = `calc(${newVal}% - (${(newVal *
                                thumbWidth) /
                                100}px) + (${correction}px))`;
                              output.value = val;
                              output.style.display = 'inline';
                            }
                          };
                          input.oninput = function(e) {
                            onTouch(e);
                          };
                          input.onclick = function(e) {
                            onTouch(e);
                          };
                          input.ontouch = function(e) {
                            onTouch(e);
                          };
                          vas.appendChild(slider);
                          questionForm.appendChild(vas);
                        }
                      }
                    },
                  },
                  title: 'Input',
                },
              ],
            },
          },
        },
      ],
    },
  ],
};

// export
export default studyObject;
