import React, { useState, Fragment } from "react";
import "./styles.css";
import { Container, Row, Col } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { map, filter, isEmpty } from "lodash";
import pdfIcon from "./images/icon-file-pdf.svg";
import jpgIcon from "./images/icon-file-jpg.svg";
import pngIcon from "./images/icon-file-png.svg";
import checkIcon from "./images/icon-check.svg";
import closeIcon from "./images/icon-close.svg";
import iconWord from "./images/icon-word.svg";

export default function App() {

  const fileIcons = [
    { type: "application/pdf", icon: pdfIcon },
    { type: "image/png", icon: pngIcon },
    { type: "image/jpeg", icon: jpgIcon },
    { type: "image/jpg", icon: jpgIcon }
  ];

  const [dropFiles, setDropFiles] = useState();
  const maxLength = 20;
  const filesArray = [];

  const fileValidator = (file) => {
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
    onDrop: (acceptedFiles) => {
      setDropFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const filesList = map(dropFiles, (list) => {
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
            <img src={checkIcon} className="status-icon" alt="file status" />
          </div>
          <div className="loader success" />
        </div>
      </div>
    );
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    const getIcon = filter(fileIcons, (o) => o.type === file.type);
    return (
      <div className="fileList rejectedfiles" key={file.path}>
        {typeof getIcon !== "undefined" && !isEmpty(getIcon) ? (
          <div className="fileIconArea">
            <img className="fileIcon" src={getIcon[0].icon} alt={file.name} />
          </div>
        ) : (
          <Fragment />
        )}
        <div className="fileNameArea">
          <div className="fielName">
            <p>{file.name}</p>
            <img src={closeIcon} className="status-icon" alt="file status" />
          </div>
          <div className="loader danger" />
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
              <span>
                Add file(s)
              </span>
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
}
