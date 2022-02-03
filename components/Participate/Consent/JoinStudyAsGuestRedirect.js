import Router from 'next/router';

const joinStudyAsGuestRedirect = async (study, profile) => {
  // check if study wants to redirect the participant to the first task
  if (study?.settings?.proceedToFirstTask) {
    const userStudyInfo = profile?.studiesInfo[study.id];
    if (userStudyInfo && userStudyInfo.blockId) {
      const userBlock = userStudyInfo.blockId;
      const studyBlock = study.components.blocks.filter(
        block => block.blockId === userBlock
      );
      if (studyBlock && studyBlock.length && studyBlock[0].tests) {
        const [component] = studyBlock[0].tests;
        if (component) {
          const { testId } = component;
          // await Router.push({
          //   pathname: `/studies/${study.slug}`,
          // });
          Router.push({
            pathname: `/do/task`,
            query: {
              s: study.id,
              v: testId,
              code: profile?.publicId,
            },
          });
        } else {
          Router.push({
            pathname: `/studies/${study.slug}`,
            query: {
              code: profile?.publicId,
            },
          });
        }
      } else {
        Router.push({
          pathname: `/studies/${study.slug}`,
          query: {
            code: profile?.publicId,
          },
        });
      }
    } else {
      Router.push({
        pathname: `/studies/${study.slug}`,
        query: {
          code: profile?.publicId,
        },
      });
    }
  } else if (study?.slug) {
    Router.push({
      pathname: `/studies/${study.slug}`,
      query: {
        code: profile?.publicId,
      },
    });
  } else {
    Router.push({
      pathname: `/dashboard`,
    });
  }
};

export default joinStudyAsGuestRedirect;
