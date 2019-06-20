

import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class SearchBar extends Component {

    render() {
        const { isLoading, value, results, handleResultSelect, handleSearchChange } = this.props


        return (
            <Search
                fluid={value !== '' ? true : false}
                className={value !== '' ? "fullWidth" : null}
                // aligned='right'
                open={false}
                size="large"
                input={{ icon: 'search', iconPosition: 'left' }}
                placeholder='Search Movies..'
                loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={_.debounce(handleSearchChange, 500, {
                    leading: true,
                })}
                results={results !== undefined ? results : []}
                value={value}
                autoFocus
            />
        );
    }

}

export default SearchBar;