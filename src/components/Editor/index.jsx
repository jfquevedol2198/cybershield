import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import BoldSvg from "../../assets/images/editor-bold.svg";
import ItalicSvg from "../../assets/images/editor-italic.svg";
import OrderedSvg from "../../assets/images/editor-ordered.svg";
import UnderlineSvg from "../../assets/images/editor-underline.svg";
import UnorderedSvg from "../../assets/images/editor-unordered.svg";

const Editor = ({ className, placeholder }) => {
  const [editorState, setEditorState] = useState(null);

  return (
    <div className={clsx("relative", className)}>
      <div className="absolute left-3 top-12 text-base text-gray-3">
        {placeholder}
      </div>
      <DraftEditor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ["fontSize", "inline", "list", "textAlign"],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["bold", "italic", "underline"],
            bold: {
              icon: BoldSvg,
              className: "editor-button",
            },
            italic: {
              icon: ItalicSvg,
              className: "editor-button",
            },
            underline: {
              icon: UnderlineSvg,
              className: "editor-button",
            },
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            className: "editor-button",
            component: undefined,
            dropdownClassName: undefined,
          },
          textAlign: {
            inDropdown: true,
            className: "editor-button",
            component: undefined,
            dropdownClassName: undefined,
            options: ["left", "center", "right", "justify"],
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["unordered", "ordered"],
            unordered: {
              icon: UnorderedSvg,
              className: "editor-button",
            },
            ordered: {
              icon: OrderedSvg,
              className: "editor-button",
            },
          },
        }}
      />
    </div>
  );
};

Editor.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Editor;
