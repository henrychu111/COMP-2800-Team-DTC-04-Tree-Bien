import React from "react";
import { Button, List, SearchBar,WhiteSpace,WingBlank,ListView,TabBar,NavBar, Icon,Tabs  } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {BrowserRouter as Router, Route,Link} from "react-router-dom";
import TreeHome from "./TreeHome";
import '../css/footerbar.css'


class SearchView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            feet : '',
            color : '',
        };
    }


    updateSearch = (event) => {
        console.log('updateSearch')
    }

    changeFeetHandler = (event) => {
        console.log(event)
        let params =  event.target.dataset
        console.log(params)
    }

    changeColorHandler = (event) => {
        console.log(event)
        let params =  event
        console.log(params)
    }

    render() {

        return (
           <div>
               <NavBar
                   icon={
                       <Link to="/">
                            <Icon key="1" type="left"/>
                       </Link>
                   }
                   mode="light"
                   rightContent={[
                       <Link to="/search">
                           <Icon key="1" type="ellipsis"/>
                       </Link>
                   ]}
               ></NavBar>
               {/*<SearchBar*/}
               {/*    placeholder="Which tree are you looking for"*/}
               {/*    maxLength={50}*/}
               {/*    cancelText='cancel'*/}
               {/*/>*/}
               {/*<WhiteSpace />*/}

               <h3 style={{ color:"#DDE586"}}>Size Range</h3>
               {/*<Button type="primary" inline  style={{ marginRight: '4px' }} className="mybtn">Large Tree (More than 30 feet)</Button>*/}
               {/*<Button type="primary" inline  style={{ marginRight: '4px' }} className="mybtn">Medium Tree (Between 20 to 30 feet)</Button>*/}
               {/*<Button type="primary" inline  style={{ marginRight: '4px' }} className="mybtn">Small Tree (Under than 20 feet)</Button>*/}
               <Button inline  style={{ marginRight: '4px' }} className="mybtn" data-v="large"  onClick={this.changeFeetHandler}>Large</Button>
               <Button inline  style={{ marginRight: '4px' }} className="mybtn" data-v="medium"  onClick={this.changeFeetHandler}>Medium</Button>
               <Button inline  style={{ marginRight: '4px' }} className="mybtn" data-v="small"  onClick={this.changeFeetHandler}>Small</Button>
               <WhiteSpace />

               <h3 style={{ color:"#DDE586"}}>Flowering Color</h3>
               <Button inline style={{ marginRight: '4px',width:"25%" }} className="mybtn2" data-v="red"  onClick={this.changeColorHandler}>Red</Button>
               <Button inline style={{ marginRight: '4px',width:"25%" }} className="mybtn2" data-v="blue"  onClick={this.changeColorHandler}>Blue</Button>
               <Button inline style={{ marginRight: '4px',width:"25%" }} className="mybtn2" data-v="pink"  onClick={this.changeColorHandler}>Pink</Button>
               <WhiteSpace />

               <Button inline style={{ marginRight: '4px',width:"25%" }} className="mybtn2" data-v="orange"  onClick={this.changeColorHandler}>Orange</Button>
               <Button inline style={{ marginRight: '4px',width:"25%" }} className="mybtn2" data-v="yellow"  onClick={this.changeColorHandler}>Yellow</Button>
               <Button inline style={{ marginRight: '4px',width:"25%" }} className="mybtn2" data-v="white"  onClick={this.changeColorHandler}>White</Button>

               <WhiteSpace />
               <Button type="success" style={{ margin: '0 60px'}} onClick={this.updateSearch}>Update Search</Button><WhiteSpace />
           </div>
        )
    }
}

export default SearchView