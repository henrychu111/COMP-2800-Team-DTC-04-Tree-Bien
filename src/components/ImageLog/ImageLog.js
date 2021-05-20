import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import treeImage from "../../images/green_tree.png";
import "../../css/ImageLog.css";
import fire from "../../firebase";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ImageLogs = (props) => {
  const db = fire.firestore();
  const initials = [
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://www.lantra.co.uk/sites/default/files/styles/crop_article_banner/public/2020-03/tree-3822149_1920.jpg?itok=BA7VY9bK',
      previewFotter: ''
    },
  ];
  const [fileLists, setFileLists] = useState(initials);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [editorVisible, setEditorVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewFotter, setPreviewFotter] = useState('');
  const [previewItem, setPreviewItem] = useState('');

  const handleCancel = () => {
    setPreviewVisible(false);
    setEditorVisible(false);
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewFotter(file.previewFotter);
  };

  const handleChange = ({ fileList }) => {
    const fileLen = fileList.length;
    if (fileLen > fileLists.length) {
      setEditorVisible(true);
    }
    setFileLists(fileList);
    if (fileLen - 1 > 0) {
      setPreviewItem(fileList[fileLen - 1]['name']);
      console.log(...fileList);
      console.log(fileList[1]['thumbUrl'])
      db.collection("users")
      .doc(props.loggedinUserData)
      .collection("album")
        .doc("new-tree-album")
        .set(...fileList)
        .then(() => {
          console.log("Form submitted");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const listenDb = () => {
    db.collection("users")
    .doc(props.loggedinUserData)
    .collection("album")
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs.length);
        let files = [];
        snapshot.docs.forEach((file) => {
          files.push(file.data())
        });
        if (files.length > 0) setFileLists(files);
      })
      .catch((error) => {
        alert(error.message);
      });
  } 

  useEffect(listenDb, []);

  return (
    <>
      <div>
        <img
          src={treeImage}
          alt="tree-shadow"
          id="tree-page-tree-image"
        ></img>
      </div>
      <div id="tree-photos">
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileLists}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
          <Modal
            visible={editorVisible}
            title={'Description'}
            footer={'Updated'}
            closable={false}
            onCancel={handleCancel}
          >
            <input
              type="text"
              placeholder="text"
              className="form_input"
              required
              onChange={(input) => {
                fileLists.forEach((list, index) => {
                  let albumList = fileLists;
                  if (list['name'] === previewItem) {
                    albumList[index]['previewFotter'] = input.target.value;
                    setFileLists(albumList);
                  }
                })
              }}
            />
          </Modal>
          <Modal
            visible={previewVisible}
            title={previewFotter}
            footer={previewTitle}
            closable={true}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
      </div>
    </>
  );
}

export default ImageLogs;