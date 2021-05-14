import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Button,
  List,
  SearchBar,
  WhiteSpace,
  WingBlank,
  ListView,
  TabBar,
  NavBar,
  Icon,
  Tabs,
} from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import "../../css/TreeDirectory.css";
// import firebase from '../firebase';

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

const data = [
  {
    id: 1,
    img: pic_1,
    title: "Red-Leaf Japanese Maple",
    size: "20",
    color: "Red",
    desc: "Acer Palmatum 'Atropurpurea is a small tree with delicate foliage with rich purple leaves in the spring becoming deeper in the summer. Height at maturity; up to 20ft.",
  },
  {
    id: 2,
    img: pic_2,
    title: "Orangeola Cutleaf Japanese Maple",
    size: "8",
    color: "Red",
    desc: "Acer Palmatum Dissectum 'Orangeola' is small tree featuring large, bright orange-red leaves. Prefers moist soil and some shade. Great for containers. Grows to 8ft.",
  },
  {
    id: 3,
    img: pic_3,
    title: "Hearts of Gold Eastern Redbud",
    size: "20",
    color: "Pink",
    desc: "Cercis Canadensis 'Hearts of Gold' is a multi-stemmed tree with stunning pea-like rose-purple flowers and golden foliage. Full sun to part shade. Grows to 20ft.",
  },
  {
    id: 4,
    img: pic_4,
    title: "Prairie Star Persimmon",
    size: "12",
    color: "Orange",
    desc: "Diospyros Virginiana 'Prairie Star' is one of the earliest varieties to ripen. This self-fertile tree will produce large juicy persimmons. Full Sun. Grows to 12ft.",
  },
  {
    id: 5,
    img: pic_5,
    title: "Saratoga Ginkgo",
    size: "25",
    color: "Yellow",
    desc: "Ginkgo Biloba 'Saratoga' is pyramidal shaped low maintenance tree with green leaves that turn to golden-yellow in fall. Grows to 25ft.",
  },
  {
    id: 6,
    img: pic_6,
    title: "Blue Bird Hibiscus",
    size: "20",
    color: "Purple",
    desc: "Hisbiscus Syriacus 'Blue Bird'is noted for its large, trumpet-shaped, violet-blue flowers. Full sun. Grows to 8ft.",
  },
  {
    id: 7,
    img: pic_7,
    title: "Carpathian English Walnut",
    size: "40",
    color: "Green",
    desc: "Juglans Regia 'Carpathian' is partially self-fertile tree producing large walnuts in the fall. Best planted with another walnut variety. Full sun, Grows to 40ft",
  },
  {
    id: 8,
    img: pic_8,
    title: "Manregion English Walnut",
    size: "8",
    color: "Green",
    desc: "Small tree featuring large, bright orange-red leaves. Prefers moist soil and some shade. Great for containers. Grows to 2.5 metres.",
  },
  {
    id: 9,
    img: pic_9,
    title: "Weeping Larch",
    size: "10",
    color: "Green",
    desc: "Larix decidua 'Pendula' is a lovely deciduous conifer that will take on many forms, mounding, arching or weeping, depending on training. Grows to 10ft.",
  },
  {
    id: 10,
    img: pic_10,
    title: "Golden Gift Magnolia",
    size: "20",
    color: "White",
    desc: "Magnolia 'Golden Gift' is multi-stemmed tree covered in stunning fragrant gold cup-shaped flowers in the spring. Grows to 25ft.",
  },
  {
    id: 11,
    img: pic_11,
    title: "DD Blanchard Sourthern Magnolia",
    size: "30",
    color: "White",
    desc: "Magnolia Grandiflora 'DD Blanchard' is broadleaf evergreen with beautiful dark shine foliage all year and large white flowers in summer. Sunny sheltered location. Grows to 30ft.",
  },
  {
    id: 12,
    img: pic_12,
    title: "Victoria Southern Magnolia",
    size: "30",
    color: "White",
    desc: "Magnola Grandiflora 'Victoria' is broadleaf evergreen with beautiful dark shine foliage all year and large white flowers in summer. Sunny sheltered location. Grows to 30ft.",
  },
  {
    id: 13,
    img: pic_13,
    title: "Rustica Rubra Saucer Magnolia",
    size: "20",
    color: "Pink",
    desc: "Magnolia x Soulangeana 'Rustica Rubra' is slow-growing small tree with huge rosy-pink flowers with white tones inside. Full sun to part shade. Grows to 20ft.",
  },
  {
    id: 14,
    img: pic_14,
    title: "Combination Apple",
    size: "15",
    color: "Red",
    desc: "Malus Domestica Combination ( Red Macintosh, Granny Smith, Lodi, Yellow Delicious & Spartan) is A combination of three to five varieties of apples are grafted on to one plant to create a unique and novel plant. Grows to 15ft.",
  },
  {
    id: 15,
    img: pic_15,
    title: "Treasured Red Columnar Apple",
    size: "10",
    color: "Red",
    desc: "Malus Domestica 'Treasured Red' grows vertically with almost no branching! Produces large juicy scarlet apples. Great for containers. Full sun. Grows to 10ft",
  },
  {
    id: 16,
    img: pic_16,
    title: "Baby Blue Spruce",
    size: "30",
    color: "Blue",
    desc: "Picea pungens 'Baby Blue' is a compact pyramidal blue-needled evergreen. Holds its colour well all year. Drought tolerant. Full sun to part shade. Grows to 30ft",
  },
  {
    id: 17,
    img: pic_17,
    title: "Cupid Cherry",
    size: "10",
    color: "Red",
    desc: "Prunus 'Cupid' a hybrid cherry with a variety of large red and surprisingly sweet cherries. Grows to 10ft. ",
  },
  {
    id: 18,
    img: pic_18,
    title: "Bounty Plum",
    size: "15",
    color: "Red",
    desc: "Prunus nigra 'Bounty' is a small tree with white blossoms that produces red oblong fruit with yellow flesh in late summer. Full sun. Grows to 15ft.",
  },
  {
    id: 19,
    img: pic_19,
    title: "Victoria Southern Magnolia",
    size: "30",
    color: "White",
    desc: "Magnola Grandiflora 'Victoria' is broadleaf evergreen with beautiful dark shine foliage all year and large white flowers in summer. Sunny sheltered location. Grows to 30ft.",
  },
];

let pageIndex = 0;

const dataBlobs = {};

const NUM_ROWS = data.length;
console.log(NUM_ROWS);

function genData(keyword = "", feet = "", color = "") {
  console.log(keyword, feet, color, "-----");
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

    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
console.log(this.props.location)
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
      // feet_query:"",
      // color_query:"",
      keyword_query: "",
    };
  }

  componentDidMount() {
    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;

    setTimeout(() => {
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
    }, 600);
  }

  onChange = (value) => {
    this.setState({
      keyword_query: value,
    });
  };

  submitCancel = () => {
    console.log(this.refs);
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
              display: "-webkit-box",
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
                {obj.desc}
              </div>
            </div>
          </div>
        </div>
      );
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
              cancelText="cancel"
              onSubmit={this.submitSearch}
              onChange={this.onChange}
            />
            <WhiteSpace />
          </div>
        )}
        // renderFooter={() => (
        //   <div style={{ padding: 30, textAlign: "center" }}>
        //     {this.state.isLoading ? "Loading..." : "Loaded"}
        //   </div>
        // )}
        renderFooter={() => (
          this.state.isLoading?loadingDiv:null
        )}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: "auto",
        }}
        pageSize={10}
        onScroll={() => {
          console.log("scroll");
        }}
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={10}
      />
    );
  }
}
export default TreeDirectory;

