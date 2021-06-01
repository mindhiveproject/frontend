import Router from 'next/router';

const joinStudyRedirect = async (study, profile) => {
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
          // open the test on a new page
          // const url = `/do/task?s=${study.id}&v=${testId}`;
          // const win = window.open(url, '_blank');
          // if (win) {
          //   win.focus();
          // }
          await Router.push({
            pathname: `/studies/${study.slug}`,
          });
          Router.push({
            pathname: `/do/task`,
            query: {
              s: study.id,
              v: testId,
            },
          });
        } else {
          Router.push({
            pathname: `/studies/${study.slug}`,
          });
        }
      } else {
        Router.push({
          pathname: `/studies/${study.slug}`,
        });
      }
    } else {
      Router.push({
        pathname: `/studies/${study.slug}`,
      });
    }
  } else {
    Router.push({
      pathname: `/studies/${study.slug}`,
    });
  }
};

export default joinStudyRedirect;
