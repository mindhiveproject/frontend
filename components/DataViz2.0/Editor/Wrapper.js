import SpecEditor from "./SpecEditor";
import ScriptEditor from "./ScriptEditor";

export default function Editor({
  studyId,
  data,
  user,
  spec,
  setSpec,
  defaultSpec,
}) {
  return (
    <div>
      <SpecEditor spec={spec} setSpec={setSpec} />
      <ScriptEditor
        studyId={studyId}
        user={user}
        spec={spec}
        setSpec={setSpec}
        defaultSpec={defaultSpec}
      />
    </div>
  );
}
