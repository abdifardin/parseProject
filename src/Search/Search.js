/**
 * Created by abdi.fakhruddin on 3/17/16.
 */

// vendor
import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import 'react-instantsearch-theme-algolia/style.scss';
import './Search.style';
import createHistory from 'history/createBrowserHistory';

// local
import s from './Search.style';
import { searchPostsSuggestion } from '../Methods/algoliaSearch';
import { initiateAlgoliaSearch } from '../Methods/firebaseQueries';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Highlight,
    ScrollTo,
    PoweredBy,
    Toggle,
    Menu,
    RefinementList,
    Pagination,
    CurrentRefinements,
    ClearAll
} from 'react-instantsearch/dom';



//
// Main class
// -----------------------------------------------------------------------------
class Search extends Component {

    state={
        showResult: false
    }
    // life cycle method
    //-----------------------------------------------
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    // custom methods
    // --------------------------------


    // submit
    // ------------------------
    Product = ({ hit }) => {
        //todo: console
        console.log('hit', hit);
        return (
            <div style={{ marginTop: '15px' }}>
                <Link to={`/post/${hit.fbKey}`} className="hit-name" style={s.itemLinks}>
                    something
                </Link>
            </div>
        );
    };

    // render
    // ----------------------
    render() {
        const { showResult} = this.state;
        const { active } = this.props;
        const { city } = this.context;

        return (
            <InstantSearch
                appId="M1Q3DVZ6SY"
                apiKey="8635e55a7b0b5c19155e80fac09db18d"
                indexName={'parsProject'}
            >
                <div>
                    <SearchBox
                        onFocus={() => this.setState({ showResult: true })}
                        style={{ float: 'right' }}
                        // because the onBlur event is fired before the click event is registered,
                        // i.e. your link disappears from the DOM before it can acknowledge it was clicked
                        onBlur={() => setTimeout(() => this.setState({ showResult: false }), 200)}
                        onKeyDown={(e) => e.which === 27 && this.setState({ showResult: false })}
                    />
                    {
                        showResult &&
                        <Hits hitComponent={this.Product} />
                    }
                </div>
            </InstantSearch>
        );
    }

}

export default (Search);

/*
 TODO:
 ====================================================================
 1.

 unitTests
 ====================================================================


 docs
 ====================================================================
 1.
 */
