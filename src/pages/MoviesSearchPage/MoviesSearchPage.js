import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react'
import _ from 'lodash'
import { GO_GET_MOVIE_DETAILS, GO_SEARCH_MOVIES, GO_SET_SELECTED_MOVIE } from './Movies.actions';
import './MoviesSearchPage.sass'
import MovieGrid from './../../components/MovieGrid';
import MovieModal from './../../components/MovieModal';
import SearchBar from './../../components/SearchBar';

const initialState = { isLoading: false, results: [], value: '', open: false, selectedMovie: null, fullPlotToggleLoading: false, shortplotmode: true }

class MoviesSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = initialState

    }


    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        if (value !== '') {
            this.setState({ isLoading: true, value })
            setTimeout(// to emulate slow server response and view the loading mode
                () => {
                    // console.log(value)
                    this.props.GO_SEARCH_MOVIES(value).then(() => {
                        // console.log('search movies finished')
                        if (this.state.value === '') return this.setState(initialState)
                        const allowed = ['Title', 'imdbID'];
                        const filtered = (item) => {
                            return Object.keys(item)
                                .filter(key => allowed.includes(key))
                                .reduce((obj, key) => {
                                    obj[key.toLowerCase()] = item[key];
                                    obj['key'] = item['imdbID'];
                                    return obj;
                                }, {});
                        }
                        function searchResults(items) {
                            const searchResultsArr = [];
                            if (items) {

                                for (let i = 0; i < items.length; i += 1) {
                                    searchResultsArr.push(filtered(items[i]));
                                }
                            }
                            return searchResultsArr;
                        }
                        // console.log(this.props.moviesdata.data.items, searchResults(this.props.moviesdata.data.items));
                        this.setState({
                            isLoading: false,
                            results: searchResults(this.props.moviesdata.data.items)
                        })

                    })
                }, 250)
        } else {
            this.setState(initialState);
        }
    }

    viewMovie() { //reads the Id of the selected movie, opens a modal popup and dispatching the get_movie_details action.
        const { imdbID } = this.props.moviesdata.data.item;
        this.show('blurring')
        this.props.GO_GET_MOVIE_DETAILS(imdbID, 'short')
    }

    show = dimmer => this.setState({ ...this.state, dimmer, open: true })
    close = () => this.setState({ ...this.state, open: false, shortplotmode: true })

    toggleGrabFullPlot() {
        // console.log('grabbing the full plot of ', id);
        const { imdbID } = this.props.moviesdata.data.item;

        const plotLength = this.state.shortplotmode ? 'full' : 'short';
        this.setState({ ...this.state, fullPlotToggleLoading: true, shortplotmode: !this.state.shortplotmode })
        this.props.GO_GET_MOVIE_DETAILS(imdbID, plotLength).then(() => {
            console.log('movie Data arrived')
            this.setState({ ...this.state, fullPlotToggleLoading: false })
        })
    }

    render() {
        const { isLoading, value, results, open, dimmer, fullPlotToggleLoading } = this.state
        // console.log(this.props);

        return (
            <Grid stackable doubling centered columns={1} className="fullHeight">
                <Grid.Column verticalAlign={value !== '' ? 'top' : "middle"} >
                    <Grid.Row className={"searchRow"}>
                        <SearchBar isLoading={isLoading} value={value} results={results} handleResultSelect={this.handleResultSelect.bind(this)} handleSearchChange={this.handleSearchChange.bind(this)} />
                    </Grid.Row>
                    <Grid.Row>
                        <MovieModal open={open} close={this.close.bind(this)} dimmer={dimmer} fullPlotToggleLoading={fullPlotToggleLoading} toggleGrabFullPlot={this.toggleGrabFullPlot.bind(this)} shortplotmode={this.state.shortplotmode} />
                    </Grid.Row>
                    <Grid.Row id={"moviesGrid"}>
                        {results.length > 0 ? <MovieGrid isLoading={isLoading} items={this.props.moviesdata.data.items} viewMovie={this.viewMovie.bind(this)} /> : null}
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}
const mapStateToProps = state => ({
    moviesdata: state.moviesReducer
})

export default connect(mapStateToProps, { GO_GET_MOVIE_DETAILS, GO_SEARCH_MOVIES, GO_SET_SELECTED_MOVIE })(MoviesSearchPage);