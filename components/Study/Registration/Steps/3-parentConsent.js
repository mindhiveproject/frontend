import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';
import styled from '@react-pdf/styled-components';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { ResponseButtons, OnboardingHeader } from '../../styles';

class ParentConsent extends Component {
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
        <h1>Parental consent required</h1>
        <p>
          For the parent: Your child is invited to take part in the study named
          "{this.props.title}". Please read the following consent before
          allowing your child to participate. Save or print a copy of this
          consent for your records:
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

        <div>
          <label htmlFor="parentName">
            <p>Your name</p>
            <input
              type="text"
              id="parentName"
              name="parentName"
              onChange={this.props.updateState}
            />
          </label>
        </div>

        <div>
          <label htmlFor="parentEmail">
            <p>Your email address</p>
            <input
              type="email"
              id="parentEmail"
              name="parentEmail"
              onChange={this.props.updateState}
            />
          </label>
        </div>

        <button onClick={this.props.onNext}>I agree, next</button>
        <p>
          By clicking "I agree, next" your are consenting to let your child be
          in the research study described above.
        </p>
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
        <Heading>
          For the parent: Your child is invited to take part in the study named
          "{title}". Please read the following consent before allowing your
          child to participate. Save or print a copy of this consent for your
          records:
        </Heading>
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

export default ParentConsent;
