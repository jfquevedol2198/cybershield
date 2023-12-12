import PropTypes from "prop-types";
import { useState } from "react";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = ({ className }) => {
  const [editorState, setEditorState] = useState(null);

  return (
    <div className={className}>
      <DraftEditor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />
    </div>
  );
};

Editor.propTypes = {
  className: PropTypes.string,
};

export default Editor;
