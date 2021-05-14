import React from "react";
import { Button, List, SearchBar,WhiteSpace,WingBlank,ListView,TabBar,NavBar, Icon,Tabs,Flex  } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {BrowserRouter as Router, Route,Link} from "react-router-dom";
import '../../css/TreeDirectory.css';


class SearchView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            feet : '',
            color : '',
            current : '',
            current_color : '',
        };
    }

    updateSearch = (event) => {
        console.log('updateSearch')
        this.props.history.push("/directory", {
            feet: this.state.feet,
            color: this.state.color,
        });
    }

    changeFeetHandler = (v,i,event) => {
        console.log(v)
        this.setState({
            feet:v,
            current:i,
        })
    }

    changeColorHandler = (v,i,event) => {
        console.log(v)
        this.setState({
            color:v,
            current_color:i,
        })
    }

    render() {
        return (
           <div>
               <NavBar
                   mode="light"
                   rightContent={[
                       <Link to="/directory/search">
                           <Icon key="1" type="ellipsis"/>
                       </Link>
                   ]}
               ></NavBar>
               <WhiteSpace />

               <h3 style={{ color:"#DDE586"}} align="middle">Size</h3>
               <Flex justify="center">
                   <div className='inline'><Button inline  style={{ marginRight: '4px' }} className={this.state.current === 1 ? 'mybtn-active' : 'mybtn'}  onClick={this.changeFeetHandler.bind(this,'large',1)}>Large</Button></div>
                   <div className='inline'><Button inline  style={{ marginRight: '4px' }} className={this.state.current === 2 ? 'mybtn-active' : 'mybtn'}  onClick={this.changeFeetHandler.bind(this,'medium',2)}>Medium</Button></div>
                   <div className='inline'><Button inline  style={{ marginRight: '4px' }} className={this.state.current === 3 ? 'mybtn-active' : 'mybtn'}  onClick={this.changeFeetHandler.bind(this,'small',3)}>Small</Button></div>
               </Flex>
               <WhiteSpace />
               <h3 style={{ color:"#DDE586"}} align="middle">Flowering Color</h3>
               <Flex justify="center">
                   <div className='inline'><Button inline style={{ marginRight: '4px' }} className={this.state.current_color === 1 ? 'mybtn2-active' : 'mybtn2'}  data-v="red"  onClick={this.changeColorHandler.bind(this,'red',1)}>Red</Button></div>
                   <div className='inline'><Button inline style={{ marginRight: '4px'}} className={this.state.current_color === 2 ? 'mybtn2-active' : 'mybtn2'} data-v="blue"  onClick={this.changeColorHandler.bind(this,'blue',2)}>Blue</Button></div>
                   <div className='inline'><Button inline style={{ marginRight: '4px' }} className={this.state.current_color === 3 ? 'mybtn2-active' : 'mybtn2'} data-v="pink"  onClick={this.changeColorHandler.bind(this,'pink',3)}>Pink</Button></div>
               </Flex>
               <WhiteSpace />
               <Flex justify="center">
                   <div className='inline'><Button inline style={{ marginRight: '4px' }} className={this.state.current_color === 4 ? 'mybtn2-active' : 'mybtn2'} data-v="orange"  onClick={this.changeColorHandler.bind(this,'orange',4)}>Orange</Button></div>
                   <div className='inline'><Button inline style={{ marginRight: '4px' }} className={this.state.current_color === 5 ? 'mybtn2-active' : 'mybtn2'} data-v="yellow"  onClick={this.changeColorHandler.bind(this,'yellow',5)}>Yellow</Button></div>
                   <div className='inline'><Button inline style={{ marginRight: '4px' }} className={this.state.current_color === 6 ? 'mybtn2-active' : 'mybtn2'} data-v="white"  onClick={this.changeColorHandler.bind(this,'white',6)}>White</Button></div>
               </Flex>
               <WhiteSpace />
               <Button type="success" style={{ margin: '0 60px'}} onClick={this.updateSearch}>Update Search</Button><WhiteSpace />
           </div>
        )
    }
}

export default SearchView