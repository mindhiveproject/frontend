import React, { Component } from 'react';
import styled from '@react-pdf/styled-components';
import { Accordion } from 'semantic-ui-react';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

import { OnboardingHeader } from '../styles';

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
        <p>
          Please read the following consent before deciding to participate. Save
          or print a copy of this consent for your records:
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
                loading ? 'Loading document...' : 'Study Concent'
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
        <button onClick={this.props.onNext}>Next</button>
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
