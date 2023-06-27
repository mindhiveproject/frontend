import { Icon } from "semantic-ui-react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";
import { saveAs } from "file-saver";
import { jsonToCSV } from "react-papaparse";

const GET_USER_DATA = gql`
  query GET_USER_DATA($id: ID!) {
    profile(where: { id: $id }) {
      id
      username

      studentIn {
        id
        title
        description
        creator {
          username
        }
      }

      authorOfHomework {
        title
        assignment {
          title
        }
        content
        createdAt
        settings
        public
      }

      journals {
        title
        description
        settings
        createdAt
        posts {
          title
          content
          settings
          createdAt
        }
      }

      memberOfTalk {
        settings
        classes {
          title
        }
        studies {
          title
        }
        members {
          username
        }
        words {
          message
          settings
          isMain
          children {
            message
            settings
            isMain
            author {
              username
            }
            createdAt
          }
          author {
            username
          }
          createdAt
          updatedAt
        }
      }

      info
      generalInfo
      studiesInfo
      tasksInfo
      consentsInfo

      participantIn {
        id
        title
        slug
        shortDescription
        description
        components
        settings
        createdAt
        image
        collaborators {
          username
        }
        classes {
          title
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export default function DownloadUserData({ id }) {
  const [getData, { loading, error, data }] = useLazyQuery(GET_USER_DATA);

  const downloadUserData = async ({ id }) => {
    const res = await getData({ variables: { id } });
    const { data } = res;
    const { profile } = data;
    const name = `${profile?.username || id}`;
    const blob = new Blob([JSON.stringify(profile)], {
      type: "text/plain",
    });
    saveAs(blob, `${name}.txt`);
  };

  return <Icon name="download" onClick={() => downloadUserData({ id })} />;
}
