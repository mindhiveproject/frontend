import { useState } from "react";
import Render from "./Render";
import Editor from "./Editor/Wrapper";
import Selector from "./Controller/Selector";

const defaultSpec = {
  width: "500",
  height: "400",
  title: "My graph",
  mark: "point",
  transform: [],
  encoding: {
    x: {
      field: "Anxiety_Rating_Survey_ld4pgfug_anxiety_rating",
      type: "quantitative",
    },
    y: {
      field: "Anxiety_Rating_Survey_ld4pgffl_anxiety_rating",
      type: "quantitative",
    },
  },
  data: { name: "values" },
};

export default function StateManager({ studyId, data, variables, user }) {
  const [spec, setSpec] = useState(defaultSpec);

  return (
    <div>
      State manager of data of the length {data.length}
      <Selector spec={spec} setSpec={setSpec} variables={variables} />
      <Render data={data} spec={spec} />
      <Editor
        studyId={studyId}
        user={user}
        spec={spec}
        setSpec={setSpec}
        defaultSpec={defaultSpec}
      />
    </div>
  );
}
