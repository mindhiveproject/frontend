import React, { Component } from 'react';
import styled from '@react-pdf/styled-components';
import { Accordion } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

import { OnboardingHeader } from '../../styles';

class StudyConsentForm extends Component {
  render() {
    return (
      <div>
        <OnboardingHeader>
          <div>Study consent</div>
          <a
            style={{ cursor: 'pointer', textAlign: 'end' }}
            onClick={this.props.onClose}
          >
            &times;
          </a>
        </OnboardingHeader>
        <h1>Study consent</h1>
        {this.props.predefinedConsentForm ? (
          <div>
            <p>
              This study <strong>{this.props.title}</strong> is covered under{' '}
              <strong>{this.props.consentTitle}</strong>. Before proceeding,
              please review the consent form here and save a copy for your
              records.
            </p>
            <p>{ReactHtmlParser(this.props.predefinedConsentForm)}</p>
            {this.props.coveredStudies.length ||
            this.props.coveredTasks.length ? (
              <div>
                <p>
                  Other studies and tasks on MindHive that belong to this
                  protocol:
                </p>

                {this.props.coveredStudies.length ? (
                  <div>
                    <p>Studies</p>
                    {this.props.coveredStudies.map(study => (
                      <li key={study.id}>{study.title}</li>
                    ))}
                  </div>
                ) : (
                  <div></div>
                )}

                {this.props.coveredTasks.length ? (
                  <div>
                    <p>Tasks</p>
                    {this.props.coveredTasks.map(task => (
                      <li key={task.id}>{task.title}</li>
                    ))}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}

            {true && (
              <div>
                <label htmlFor="saveCoveredConsent">
                  <div className="checkboxField">
                    <input
                      type="checkbox"
                      id="saveCoveredConsent"
                      name="saveCoveredConsent"
                      checked={this.props.saveCoveredConsent}
                      onChange={this.props.toggleState}
                    />
                    <span>
                      Save my consent for all covered studies/tasks (if you
                      uncheck this box, you will be prompted with this consent
                      page each time).
                    </span>
                  </div>
                </label>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>
              Please read the following consent before deciding to participate.
              Save or print a copy of this consent for your records:
              {` `}
              <a style={{ 'text-decoration': 'underline' }}>
                <PDFDownloadLink
                  document={
                    <MyDocument
                      text={this.props.consentForm}
                      title={this.props.title}
                    />
                  }
                  fileName="somename.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Study Consent'
                  }
                </PDFDownloadLink>
              </a>
            </p>
            <Accordion
              defaultActiveIndex={this.props.consentForm.map((c, i) => i)}
              panels={this.props.consentForm}
              exclusive={false}
              fluid
            />
          </div>
        )}

        <button onClick={this.props.onNext}>I agree, next</button>
        <button onClick={this.props.onSkip}>Skip consent</button>
      </div>
    );
  }
}

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  section: {
    margin: 20,
    padding: 20,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
});

const Heading = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  font-family: 'Helvetica';
`;

// Create Document Component
const MyDocument = ({ text, title }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Heading>Consent form for the study {title}</Heading>
        <Text></Text>
        {text &&
          text.map(p => (
            <>
              <Heading>{p.title}</Heading>
              <Text>{p.content}</Text>
            </>
          ))}
      </View>
    </Page>
  </Document>
);

// ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);

export default StudyConsentForm;
