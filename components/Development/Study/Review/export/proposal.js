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
  console.log('proposal', proposal);
  const { title, description, sections } = proposal;

  // let text;
  // sections.map(section => {
  //   const sectionHeader = section.title;
  //   text = text.concat(`<Text>${sectionHeader}</Text>`);
  //   //
  // });

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
            // return <Heading>{sectionHeader}</Heading>;
          })}
        </View>
      </Page>
    </Document>
  );
};

export { MyProposal };

// <Text>{ReactHtmlParser(card.content)}</Text>
