import React from "react";
import ReactDOM from "react-dom";
import fire from '../../firebase'
import { BrowserRouter as Link } from "react-router-dom";
import {
  SearchBar,
  WhiteSpace,
  ListView,
  NavBar,
  Icon,
} from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import "../../css/TreeDirectory.css";

import pic_1 from "../TreeDirectory/images/p-1.jpg";
import pic_2 from "../TreeDirectory/images/p-2.jpg";
import pic_3 from "../TreeDirectory/images/p-3.jpg";
import pic_4 from "../TreeDirectory/images/p-4.jpg";
import pic_5 from "../TreeDirectory/images/p-5.jpg";
import pic_6 from "../TreeDirectory/images/p-6.jpg";
import pic_7 from "../TreeDirectory/images/p-7.jpg";
import pic_8 from "../TreeDirectory/images/p-8.jpg";
import pic_9 from "../TreeDirectory/images/p-9.jpg";
import pic_10 from "../TreeDirectory/images/p-10.jpg";
import pic_11 from "../TreeDirectory/images/p-11.jpg";
import pic_12 from "../TreeDirectory/images/p-12.jpg";
import pic_13 from "../TreeDirectory/images/p-13.jpg";
import pic_14 from "../TreeDirectory/images/p-14.jpg";
import pic_15 from "../TreeDirectory/images/p-15.jpg";
import pic_16 from "../TreeDirectory/images/p-16.jpg";
import pic_17 from "../TreeDirectory/images/p-17.jpg";
import pic_18 from "../TreeDirectory/images/p-18.jpg";
import pic_19 from "../TreeDirectory/images/p-19.jpg";
const db = fire.firestore()

var data = [];
const imgs = [pic_1, pic_2, pic_3, pic_4, pic_5, pic_6, pic_7, pic_8, pic_9, pic_10, pic_11, pic_12, pic_13, pic_14, pic_15, pic_16, pic_17, pic_18, pic_19]

function genData(keyword = "", feet = "", color = "") {
  /**
   * Read the data of tree and convert them into a list dataBlob with length <30.
   * @param {string} keyword
   * @param {string} feet
   * @param {string} color
   * @returns {string} dataBlob
   */
  const NUM_ROWS = data.length;
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    let row = data[i];

    if (feet != "") {
      if (feet == "large") {
        if (row.size * 1 <= 30) {
          continue;
        } else {
          dataBlob[`${i}`] = `row - ${i}`;
        }
      }
      if (feet == "medium") {
        if (row.size * 1 < 20 || row.size * 1 > 30) {
          continue;
        } else {
          dataBlob[`${i}`] = `row - ${i}`;
        }
      }
      if (feet == "small") {
        if (row.size * 1 >= 20) {
          continue;
        } else {
          dataBlob[`${i}`] = `row - ${i}`;
        }
      }
    }

    if (color != "") {
      let data_color = row.color.toLowerCase();

      if (data_color == color) {
        dataBlob[`${i}`] = `row - ${i}`;
      } else {
        continue;
      }
    }

    if (keyword != "") {
      let title = row.title.toLowerCase();
      keyword = keyword.toLowerCase();
      if (title.indexOf(keyword) !== -1) {
        dataBlob[`${i}`] = `row - ${i}`;
      } else {
        continue;
      }
    }

    dataBlob[`${i}`] = `row - ${i}`;
  }

  return dataBlob;
}

class TreeDirectory extends React.Component {
  constructor(props) {
    super(props);
    /**
     * Given the sectionID, read the data from dataBlob of this position.
     * @param {list} dataBlob
     * @param {number} sectionID
     */

    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      isLoading: true,
      height: (document.documentElement.clientHeight * 3) / 4,
      feet_query: this.props.location.state
        ? this.props.location.state.feet
        : "",
      color_query: this.props.location.state
        ? this.props.location.state.color
        : "",
      keyword_query: this.props.location.state
        ? this.props.location.state.keyword_query
        : "",
    };
  }

  setDataSource() {
    /**
    * Set up the searching tree list.
    * @returns {ListView} dataSource
    */
    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    this.rData = genData(
      this.state.keyword_query,
      this.state.feet_query,
      this.state.color_query
    );
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
      height: hei,
    });
  }

  componentDidMount() {
    /**
     * Add ID for each tree data.
     * @returns {snapshot} doc
     */
    data = []
    db.collection('Tree-Directory').get().then((snapshot) => {
      let index = 0;
      snapshot.forEach(doc => {
        data.push({
          id: doc.id,
          ...doc.data(),
          img: imgs[index++]
        })
      })
      this.setDataSource()
    })
  }

  onChange = (value) => {
    /**
     * Update the searching keywords.
     * @param {string} value
     * @returns {string} keyword_query
     */

    this.setState({
      keyword_query: value,
    });
  };

  submitCancel = () => {
    /**
     * When click the "cancel", empty the searching bar and display none in the list.
     */
    this.refs.searchBar.doClear(false);
    this.setState({
      keyword_query: "",
      feet_query: "",
      color_query: "",
    });
    this.rData = genData("", "", "");
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  };

  submitSearch = (event) => {
    /**
    * Generate a list of trees which fit the searching content.
    * @param {MouseEvent} event
    * @returns {ListView} dataSource
    */

    if (this.state.color_query || this.state.feet_query) {
      this.setState({
        keyword_query: "",
      });
    }

    this.rData = genData(
      this.state.keyword_query,
      this.state.feet_query,
      this.state.color_query
    );
    if (Object.keys(this.rData).length === 0) {
      this.props.history.push("/directory/empty");
      return false
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  };

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED",
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      const obj = data[rowID];
      if (rowID == -1) {
        this.props.history.push("/directory/empty");
      } else {
        return (
          <div key={rowID} style={{ padding: "0 15px" }}>
            <div
              style={{
                lineHeight: "50px",
                color: "#DDE5B6",
                fontSize: 18,
                fontWeight: "bold",
                borderBottom: "1px solid #F6F6F6",
              }}
            >
              {obj.title}
            </div>
            <div
              style={{
                display: "flex",
                padding: "15px 0",
              }}
            >
              <img
                style={{ height: "64px", marginRight: "15px" }}
                src={obj.img}
                alt=""
              />
              <div style={{ lineHeight: 1 }}>
                <div
                  style={{
                    marginBottom: "8px",
                    textAlign: "left",
                    color: "#ADC178",
                  }}
                >
                  {" "}
                  {obj.description}
                </div>
              </div>
            </div>
          </div>
        );
      }
    };
    const loadingDiv = (<div style={{ padding: 30, textAlign: "center" }}>
      Loading...
    </div>)

    return (
      <ListView
        ref={(el) => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderHeader={() => (
          <div>
            <NavBar
              mode="light"
              rightContent={[
                <Link to="/directory/search">
                  <Icon key="1" type="ellipsis" />
                </Link>,
              ]}
            ></NavBar>
            <SearchBar
              placeholder="Which tree are you looking for"
              maxLength={50}
              value={this.state.keyword_query}
              cancelText="Cancel"
              onSubmit={this.submitSearch}
              onChange={this.onChange}
            />
            <WhiteSpace />
          </div>
        )}
        renderFooter={() => (
          this.state.isLoading ? loadingDiv : null
        )}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: "auto",
        }}
        pageSize={10}
        onScroll={() => {
        }}
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={10}
      />
    );
  }
}
export default TreeDirectory;