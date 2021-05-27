import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Upload, Modal, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import treeImage from "../../images/green_tree.png";
import "../../css/ImageLog.css";
import firebase from "../../firebase";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import Compress from "react-image-file-resizer";

function getBase64(file) {
  /**
 * @description Read the data in the file and convert them into a string.
 * @param {string} file
 * @returns {string} base64 encoded string
 */
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
  const [deleteAlbum, setDeleteAlbum] = useState(false);
  const [deleteArgs, setDeleteArgs] = useState({
    uid: "",
    list: [],
  });
  const { Paragraph } = Typography;

  const handleCancel = () => {
  /**
   * @description When the user click cancel button, do not display anything.
   */
    setPreviewVisible(false);
    setEditorVisible(false);
    setDeleteAlbum(false);
    setDeleteArgs({
      uid: "",
      list: [],
    });
  };

  const { treeID } = props.tree;

  const handleDelete = (uid, fileList) => {
   /**
   * @description Delete the tree from users' album.
   * @param {number} uid
   * @param {list} fileList
   */
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
  /**
   * @description Preview the trees of users.
   * @param {string} file
   */
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

  /**
  * Resize the image.
  * I found this code on blog.
  *
  * @author Erick Wachira
  * @see https://blog.bywachira.com/post/how-to-compress-images-in-react-series-2
  */

  function resizeImage(file,cb) {
   /**
   * @description Resize the image that user uploads.
   */
    Compress.imageFileResizer(
      file, 480, 480, "JPEG",  70, 0,
      (uri) => {
        cb(uri)
      },
      "base64" 
    );
  }

  const handleChange = async ({ file, fileList }) => {
   /**
   * @description Handle delete Album, add new preview tile and add new trees to the Album.
   * @param {string} file
   * @param {list} fileList
   */
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
        if (Object.keys(album).length > 0) {
          setEditorVisible(true);
          document.getElementById("description_form").value = "";
          resizeImage(file.originFileObj,uri=>{
            album.forEach(item=>{
              item.url = uri
            })
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
          })
          
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

  const listenDb = () => {
    /**
   * @description Add new tree and treeID into snapshot.
   */
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
    /**
   * @description When the user updates the tree, display this tree and add it into user's Album.
   */
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
            className="description_form"
            id="description_form"
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
