import styled from '@react-pdf/styled-components';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';

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
const MyProposal = ({ proposal }) => {
  const { title, description, sections } = proposal;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Heading>{title}</Heading>
          <Text>{description}</Text>
          {sections.map(section => {
            const sectionHeader = section.title;
            return section.cards.map(card => (
              <Text>{ReactHtmlParser(card.content)}</Text>
            ));
          })}
        </View>
      </Page>
    </Document>
  );
};

export { MyProposal };

// <Text>{ReactHtmlParser(card.content)}</Text>
