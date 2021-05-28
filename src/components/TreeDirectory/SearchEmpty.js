import React from "react";
import { SearchBar, WhiteSpace, NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { BrowserRouter as Link } from "react-router-dom";
import '../../css/TreeDirectory.css';
import 'antd/dist/antd.css';
import { Empty } from 'antd';

class SearchEmpty extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword_query: '',
        };
    }

    submitSearch = (event) => {
        /**
        * Submit the search keywords in the search bar.
        */
        this.props.history.push("/directory", {
            keyword_query: this.state.keyword_query,
        });
    }

    onChange = (value) => {
        /**
         * Get the value from the search bar.
         */
        this.setState({
            keyword_query: value,
        });
    };

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent={[
                        <Link to="/directory">
                            <Icon key="1" type="left" />
                        </Link>
                    ]}
                ></NavBar>
                <SearchBar
                    placeholder="Which tree are you looking for"
                    maxLength={50}
                    cancelText="Cancel"
                    onSubmit={this.submitSearch}
                    onChange={this.onChange}
                />
                <WhiteSpace />
                <div className="placeholder">
                    <Empty />
                </div>
            </div>
        )
    }
}

export default SearchEmpty