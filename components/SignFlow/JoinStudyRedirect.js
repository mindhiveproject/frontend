import Router from 'next/router';

const joinStudyRedirect = (study, profile) => {
  // check if study wants to redirect the participant to the first task
  if (study?.settings?.proceedToFirstTask) {
    const userStudyInfo = profile?.studiesInfo[study.id];
    if (userStudyInfo && userStudyInfo.blockId) {
      const userBlock = userStudyInfo.blockId;
      const studyBlock = study.components.blocks.filter(
        block => block.blockId === userBlock
      );
      if (studyBlock && studyBlock.length && studyBlock[0].tests) {
        const components = studyBlock[0].tests;
        const taskId = components[0].id;
        Router.push({
          pathname: `/studies/${study.slug}`,
          query: { c: taskId },
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
};

export default joinStudyRedirect;
