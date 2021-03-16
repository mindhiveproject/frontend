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
        const [component] = studyBlock[0].tests;
        if (component) {
          const { id } = component;
          // open the test on a new page
          const url = `/dt/r?t=${id}&s=${study.id}`;
          const win = window.open(url, '_blank');
          if (win) {
            win.focus();
          }
          Router.push({
            pathname: `/studies/${study.slug}`,
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
