//
// by Fakhruddin Abdi, 27th Apr 2018
//------------------------------------------------------------------

// vendor
import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import './CustomStyle.scss'
import './Search.style';
import createHistory from 'history/createBrowserHistory';

// local
import s from './Search.style';
import { searchPostsSuggestion, algoliaImporter } from '../Methods/algoliaSearch';
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
        algoliaImporter();
    }

    componentWillReceiveProps(nextProps) {
    }

    // custom methods
    // --------------------------------


    // submit
    // ------------------------
    Post = ({ hit }) => {
        return (
            <div style={s.post}>
                <Link to={`/post/${hit.objectID}`} className="hit-name" style={s.itemLinks}>
                    <span style={s.searchItemTitle}>
                        <span style={s.searchItemTitle_span}>title: </span>{ hit.title }
                    </span>
                    <span>
                        <span style={s.searchItemTitle_span}>description: </span> { hit.description}
                    </span>
                    
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
                        onBlur={() => setTimeout(() => this.setState({ showResult: false }), 200)}
                        onKeyDown={(e) => e.which === 27 && this.setState({ showResult: false })}
                    />
                    {
                        showResult &&
                        <Hits hitComponent={this.Post} />
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
