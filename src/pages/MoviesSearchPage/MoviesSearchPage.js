import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Search, Grid, Card, Segment, Loader, Dimmer, Image, Modal, Header, Button, Rating } from 'semantic-ui-react'
import _ from 'lodash'
import { GO_GET_MOVIE_DETAILS, GO_SEARCH_MOVIES, GO_SET_SELECTED_MOVIE } from './Movies.actions';
import './MoviesSearchPage.sass'

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

    viewMovie(selectedMovie) {
        this.show('blurring')
        this.props.GO_GET_MOVIE_DETAILS(selectedMovie.imdbID, 'short')
    }

    generateMoviesGrid() {
        const { isLoading } = this.state;
        const { items } = this.props.moviesdata.data;
        let movieCards;
        if (items) {

            movieCards = items.map((item) =>
                <Card className={"movie-card"} key={item.imdbID} onClick={this.viewMovie.bind(this, item)}>
                    <Image src={item.Poster !== "N/A" ? item.Poster : "https://via.placeholder.com/300x300.png?text=Sorry,%20No%20Image%20Available"} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{item.Title}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{item.Year}</span>
                        </Card.Meta>
                    </Card.Content>
                </Card>
            );
        }
        //loading?
        if (isLoading) {
            return (
                <Segment className="fullHeight">
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                    <Grid padded centered >
                        {movieCards}
                    </Grid>
                </Segment>
            )
        }
        return (
            <Grid centered >
                {movieCards}
            </Grid>
        )
    }

    show = dimmer => this.setState({ ...this.state, dimmer, open: true })
    close = () => this.setState({ ...this.state, open: false, shortplotmode: true })

    toggleGrabFullPlot(id) {
        // console.log('grabbing the full plot of ', id);
        const plotLength = this.state.shortplotmode ? 'full' : 'short';
        this.setState({ ...this.state, fullPlotToggleLoading: true, shortplotmode: !this.state.shortplotmode })
        this.props.GO_GET_MOVIE_DETAILS(id, plotLength).then(() => {
            console.log('movie Data arrived')
            this.setState({ ...this.state, fullPlotToggleLoading: false })
        })
    }

    movieModalContent() { //generates the pop-up modal and its content
        const { open, dimmer, fullPlotToggleLoading } = this.state;
        const { isLoading, data } = this.props.moviesdata;
        const { item } = data;
        // movie photo, name, year, short
        // plot, and a button to expand to full plot
        // console.log('selected movie: ', item);
        if (isLoading && !fullPlotToggleLoading) {
            return (

                <Segment className="fullHeight">
                    <Dimmer inverted active >
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                </ Segment>
            )

        }
        if (!_.isEmpty(item)) {
            // console.log(item);
            const { Title, Poster, imdbRating, Plot, Released, Year, imdbID } = item;
            return (
                <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon>

                    <Modal.Header>{Title}</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/300x300.png?text=Sorry,%20No%20Image%20Available"} />

                        <Modal.Description>
                            <Header>{Year}</Header>
                            <Rating icon='star' rating={imdbRating} maxRating={10} disabled />
                            <br />
                            <br />
                            {Plot}
                            <br />
                            <br />
                            <Button basic onClick={this.toggleGrabFullPlot.bind(this, imdbID)} color={"green"} loading={fullPlotToggleLoading}>
                                {this.state.shortplotmode ? 'Read Full Plot' : 'Read Short Plot'}
                            </Button>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Content className={'date'}>Released: {Released}</Modal.Content>

                </Modal>

            )
        }
    }
    render() {
        const { isLoading, value, results } = this.state
        // console.log(this.props);

        return (
            <Grid stackable doubling centered columns={1} className="fullHeight">
                <Grid.Column verticalAlign={value !== '' ? 'top' : "middle"} >
                    <Grid.Row className={"searchRow"}>

                        <Search
                            fluid={value !== '' ? true : false}
                            className={value !== '' ? "fullWidth" : null}
                            // aligned='right'
                            open={false}
                            size="large"
                            input={{ icon: 'search', iconPosition: 'left' }}
                            placeholder='Search Movies..'
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                leading: true,
                            })}
                            results={results !== undefined ? results : []}
                            value={value}
                            autoFocus
                        />
                    </Grid.Row>
                    <Grid.Row>
                        {this.movieModalContent()}
                    </Grid.Row>
                    <Grid.Row id={"moviesGrid"}>
                        {results.length > 0 ? this.generateMoviesGrid() : null}
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