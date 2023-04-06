import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  DELETE_SCRIPT,
  CREATE_SCRIPT,
  UPDATE_SCRIPT,
} from "../../Mutations/Script";
import { STUDY_SCRIPTS } from "../../Queries/Script";

export default function ScriptEditor({
  studyId,
  user,
  spec,
  setSpec,
  defaultSpec,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scriptId, setScriptId] = useState(null);

  // get the scripts
  const { data, error, loading } = useQuery(STUDY_SCRIPTS, {
    variables: {
      id: studyId,
    },
  });

  // create a new script
  const [
    createScript,
    {
      data: createScriptData,
      loading: createScriptLoading,
      error: createScriptError,
    },
  ] = useMutation(CREATE_SCRIPT, {
    variables: {
      title,
      description,
      studyId,
      content: JSON.stringify(spec),
    },
    refetchQueries: [{ query: STUDY_SCRIPTS, variables: { id: studyId } }],
  });

  // update a script
  const [
    updateScript,
    {
      data: updateScriptData,
      loading: updateScriptLoading,
      error: updateScriptError,
    },
  ] = useMutation(UPDATE_SCRIPT, {
    variables: {
      title,
      description,
      content: JSON.stringify(spec),
    },
    refetchQueries: [{ query: STUDY_SCRIPTS, variables: { id: studyId } }],
  });

  const [deleteScript, { loading: deleteScriptLoading }] = useMutation(
    DELETE_SCRIPT,
    {
      refetchQueries: [{ query: STUDY_SCRIPTS, variables: { id: studyId } }],
    }
  );

  const scripts = data?.scripts || [];
  //   console.log(scripts);

  const openScript = (script) => {
    setScriptId(script?.id);
    setTitle(script?.title);
    setDescription(script?.description);
    setSpec(JSON.parse(script?.content));
  };

  const newScript = () => {
    setScriptId(null);
    setTitle("");
    setDescription("");
    setSpec(defaultSpec);
  };

  return (
    <div>
      Script editor
      <div>
        <h2>Saved scripts</h2>
        <button onClick={() => newScript()}>New Script</button>
        {scripts.map((script) => (
          <div>
            {script?.title}
            {script?.description}

            <button onClick={() => openScript(script)}>Open Script</button>
            <button
              onClick={() => deleteScript({ variables: { id: script?.id } })}
            >
              Delete Script
            </button>
          </div>
        ))}
      </div>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {scriptId ? (
          <button
            onClick={() => updateScript({ variables: { id: scriptId } })}
            disabled={updateScriptLoading}
          >
            Update
          </button>
        ) : (
          <button onClick={() => createScript()} disabled={createScriptLoading}>
            Save
          </button>
        )}
      </fieldset>
    </div>
  );
}
