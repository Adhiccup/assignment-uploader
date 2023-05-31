import React, { useState, Fragment } from "react";
import "./styles.css";
import { Container, Row, Col } from "react-bootstrap";
import { useDropzone, FileRejection } from "react-dropzone";
import { map, filter, isEmpty } from "lodash";
const iconWord = require('./images/icon-word.svg');

interface File {
  name: string;
  type: string;
  preview?: string;
}

interface FileError {
  code: string;
  message: string;
  type: string;
}

interface Props { }

const App: React.FC<Props> = () => {
  const fileIcons = [
    { type: "*", icon: iconWord }
  ];

  const [dropFiles, setDropFiles] = useState<File[] | undefined>();
  const maxLength = 20;
  const filesArray: string[] = [];

  const fileValidator = (file: File): FileError | null => {
    filesArray.push(file.name);
    console.log(
      "fileValidator",
      filesArray.indexOf(file.name),
      filesArray.indexOf(file.name) === -1
    );
    if (file.name.length > maxLength) {
      return {
        code: "name-too-large",
        message: `Name is larger than ${maxLength} characters`,
        type: file.type
      };
    }
    if (filesArray.indexOf(file.name) === -1) {
      return {
        code: "same-filename",
        message: `the file name "${file.name}" is already exist`,
        type: file.type
      };
    }
    return null;
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: ".jpeg, .jpg, .png, .pdf",
    // accept: "*",
    validator: fileValidator,
    onDrop: (acceptedFiles: any[]) => {
      setDropFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const filesList = map(dropFiles, (list: File) => {
    const getIcon = filter(fileIcons, (o) => o.type === list.type);
    return (
      <div className="fileList" key={list.name}>
        {typeof getIcon !== "undefined" && !isEmpty(getIcon) ? (
          <div className="fileIconArea">
            <img className="fileIcon" src={getIcon[0].icon} alt={list.name} />
          </div>
        ) : (
          <Fragment />
        )}
        <div className="fileNameArea">
          <div className="fielName">
            <p>{list.name}</p>
            {/* <img src={checkIcon} className="status-icon" alt="file status" /> */}
          </div>
          <div className="loader success" />
        </div>
      </div>
    );
  });

  const tempDrop = () => {
    var input = document.getElementById("file_drop");
    input?.click();
  };

  console.log("files", dropFiles, fileRejections);

  return (
    <div className="App">
      <Container>
        <div className="fileUploader">
          <div>
            <p className="demoTitle">
              Add file to check container or start <br />signing by uploading documents
            </p>
            <button className="addBtn" onClick={tempDrop}>
              <img src={iconWord} alt="" />
              <span>Add file(s)</span>
            </button>
            <p className="dragHere">or drop document(s) here</p>

            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} id="file_drop" />
            </div>
          </div>
        </div>

        <br></br>

        <div className="fileUploader">
          <div className="dropzone">

          </div>
        </div>

        {/* <Row>
        <Col>{filesList}</Col>
      </Row> */}
        {/* <Row>
      <Col>{fileRejectionItems}</Col>
    </Row> */}
      </Container>
    </div>
  );
};

export default App;
