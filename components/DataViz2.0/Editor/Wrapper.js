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
      <h2>Editor</h2>
      <ScriptEditor
        studyId={studyId}
        user={user}
        spec={spec}
        setSpec={setSpec}
        defaultSpec={defaultSpec}
      />
      <SpecEditor spec={spec} setSpec={setSpec} />
    </div>
  );
}
