import { Icon } from "semantic-ui-react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import { saveAs } from "file-saver";
import { jsonToCSV } from "react-papaparse";

const GET_USERS_DATA = gql`
  query GET_USERS_DATA($ids: [ID!]) {
    profiles(where: { id_in: $ids }) {
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

      researcherIn {
        id
        title
        slug
        shortDescription
        description
        components
        settings
        image
        collaborators {
          username
        }
        classes {
          title
        }
        proposal {
          slug
          sections {
            cards {
              title
              content
              createdAt
              updatedAt
            }
          }
          reviews {
            author {
              publicReadableId
            }
            settings
            content
            createdAt
          }
        }
        createdAt
        updatedAt
      }

      collaboratorInStudy {
        id
        title
        slug
        shortDescription
        description
        components
        settings
        image
        collaborators {
          username
        }
        classes {
          title
        }
        proposal {
          slug
          sections {
            cards {
              title
              content
              createdAt
              updatedAt
            }
          }
          reviews {
            author {
              publicReadableId
            }
            settings
            content
            createdAt
          }
        }
        createdAt
        updatedAt
      }

      reviews {
        study {
          title
        }
        settings
        content
        createdAt
      }
    }
  }
`;

export default function DownloadUsersData({ fileName, ids }) {
  const [getData, { loading, error, data }] = useLazyQuery(GET_USERS_DATA);

  const downloadUserData = async ({ ids }) => {
    if (!loading) {
      const res = await getData({ variables: { ids } });
      const { data } = res;
      const { profiles } = data;
      const modifiedProfiles = profiles.map((profile) => ({
        ...profile,
        info: JSON.stringify(profile?.info),
        consentsInfo: JSON.stringify(profile?.consentsInfo),
        generalInfo: JSON.stringify(profile?.generalInfo),
        studiesInfo: JSON.stringify(profile?.studiesInfo),
        tasksInfo: JSON.stringify(profile?.tasksInfo),
        studentIn: JSON.stringify(profile?.studentIn),
        participantIn: JSON.stringify(profile?.participantIn),
        memberOfTalk: JSON.stringify(profile?.memberOfTalk),
        journals: JSON.stringify(profile?.journals),
        researcherIn: JSON.stringify(profile?.researcherIn),
        collaboratorInStudy: JSON.stringify(profile?.collaboratorInStudy),
        reviews: JSON.stringify(profile?.reviews),
      }));

      const name = fileName || `users`;
      const csv = jsonToCSV(modifiedProfiles);
      const blob = new Blob([csv], {
        type: "text/csv",
      });
      saveAs(blob, `${name}.csv`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div onClick={() => downloadUserData({ ids })}>
      <a>
        <Icon name="download" />
      </a>
    </div>
  );
}
