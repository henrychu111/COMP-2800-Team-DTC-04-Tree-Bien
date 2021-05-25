import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Upload, Modal, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import treeImage from "../../images/green_tree.png";
import "../../css/ImageLog.css";
import firebase from "../../firebase";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ImageLogs = (props) => {
  const db = firebase.firestore();
  const [fileLists, setFileLists] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [editorVisible, setEditorVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewFotter, setPreviewFotter] = useState("");
  // const [flipping, setFlipping] = useState(true);
  const [deleteAlbum, setDeleteAlbum] = useState(false);
  const [deleteArgs, setDeleteArgs] = useState({
    uid: "",
    list: [],
  });
  const { Paragraph } = Typography;

  const handleCancel = () => {
    setPreviewVisible(false);
    setEditorVisible(false);
    setDeleteAlbum(false);
    setDeleteArgs({
      uid: "",
      list: [],
    });
  };

  const { treeID } = props.tree;

  // const handleDelete = (uid, fileList) => {
  //   db.collection("users")
  //   .doc(props.loggedinUserData)
  //   .collection("New-Tree-Album")
  //     .doc(deleteArgs.uid)
  //     .delete()
  //     .then(() => {
  //       console.log("Form submitted");
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  //     setFileLists(deleteArgs.list);
  //   setDeleteAlbum(false);
  // }

  const handleDelete = (uid, fileList) => {
    db.collection("users")
      .doc(props.loggedinUserData)
      .collection("add-new-tree")
      .doc(treeID)
      .collection("New-Tree-Album")
      .doc(deleteArgs.uid)
      .delete()
      .then(() => {
        console.log("Form submitted");
      })
      .catch((error) => {
        alert(error.message);
      });
    setFileLists(deleteArgs.list);
    setDeleteAlbum(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewFotter(file.previewFotter);
    setPreviewVisible(true);
  };

  const handleChange = async ({ file, fileList }) => {
    if (file["status"] === "removed") {
      setDeleteAlbum(true);
      setDeleteArgs({
        uid: file["uid"],
        list: fileList,
      });
    }
    if (!file.url && !file.preview) {
      setFileLists(fileList);
      file.url = await getBase64(file.originFileObj);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
      console.log(file.status);
      if (file["status"] === "done" || "error") {
        let album = [];
        album.push({
          name: file["name"],
          uid: file["uid"],
          url: file["url"],
          status: file["status"],
          previewFotter: "",
        });
        console.log(album);
        // if (Object.keys(album).length > 0) {
        //   setEditorVisible(true);
        //   document.getElementById("form_input").value = "";
        //   db.collection("users")
        //     .doc(props.loggedinUserData)
        //     .collection("New-Tree-Album")
        //     .doc(file["uid"])
        //     .set(...album)
        //     .then(() => {
        //       console.log("Form submitted");
        //     })
        //     .catch((error) => {
        //       alert(error.message);
        //     });
        // }
        if (Object.keys(album).length > 0) {
          setEditorVisible(true);
          document.getElementById("form_input").value = "";
          db.collection("users")
            .doc(props.loggedinUserData)
            .collection("add-new-tree")
            .doc(treeID)
            .collection("New-Tree-Album")
            .doc(file["uid"])
            .set(...album)
            .then(() => {
              console.log("Form submitted");
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      }
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // const listenDb = () => {
  //   db.collection("users")
  //     .doc(props.loggedinUserData)
  //     .collection("New-Tree-Album")
  //     .get()
  //     .then((snapshot) => {
  //       let files = [];
  //       snapshot.docs.forEach((file) => {
  //         files.push(file.data());
  //       });
  //       if (files.length > 0) setFileLists(files);
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  const listenDb = () => {
    console.log("this is tree id", treeID);
    db.collection("users")
      .doc(props.loggedinUserData)
      .collection("add-new-tree")
      .doc(treeID)
      .collection("New-Tree-Album")
      .get()
      .then((snapshot) => {
        let files = [];
        snapshot.docs.forEach((file) => {
          files.push(file.data());
        });
        if (files.length > 0) setFileLists(files);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(listenDb, []);

  const handleBackButton = () => {
    window.history.back();
  };

  const handleEditMessage = (value) => {
    let uid = "",
      album = [];
    fileLists.forEach((list, index) => {
      let albumList = fileLists;
      if (list["name"] === previewTitle) {
        albumList[index]["previewFotter"] = value;
        setFileLists(albumList);
        setPreviewFotter(value);
        uid = list["uid"];
        album = albumList[index];
      }
    });
    if (uid !== "" && Object.keys(album).length > 0) {
      // db.collection("users")
      //   .doc(props.loggedinUserData)
      //   .collection("New-Tree-Album")
      //   .doc(uid)
      //   .update({
      //     previewFotter: value,
      //   })
      //   .then(() => {
      //     console.log("Form updated!");
      //   })
      //   .catch((error) => {
      //     alert(error.message);
      //   });

      db.collection("users")
        .doc(props.loggedinUserData)
        .collection("add-new-tree")
        .doc(treeID)

        .collection("New-Tree-Album")
        .doc(uid)
        .update({
          previewFotter: value,
        })
        .then(() => {
          console.log("Form updated!");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <>
      <div>
        <ArrowLeftOutlined
          onClick={handleBackButton}
          className="back-button-image-log"
        />
        <img
          src={treeImage}
          alt="tree-shadow"
          id="tree-page-tree-image-album"
          // className={flipping ? "flipping" : ""}
        ></img>
      </div>
      <div id="tree-photos">
        <Upload
          listType="picture-card"
          fileList={fileLists}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {uploadButton}
        </Upload>
        <Modal
          visible={deleteAlbum}
          footer={"You will delete your photo!"}
          closable={true}
          onCancel={handleCancel}
        >
          <button
            type="submit"
            className="edit-submit-button"
            onClick={handleDelete}
          >
            CONFIRM DELETE
          </button>
        </Modal>
        <Modal
          visible={editorVisible}
          title={"Description"}
          footer={""}
          closable={true}
          onCancel={handleCancel}
        >
          <input
            type="text"
            placeholder=""
            className="form_input"
            id="form_input"
            required
            onChange={(input) => handleEditMessage(input.target.value)}
          />
          <button
            type="submit"
            className="edit-submit-button"
            onClick={handleCancel}
          >
            OK
          </button>
        </Modal>
        <Modal
          visible={previewVisible}
          title={
            <Paragraph editable={{ onChange: handleEditMessage }}>
              {previewFotter}
            </Paragraph>
          }
          footer={previewTitle}
          closable={true}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    </>
  );
};

export default ImageLogs;
