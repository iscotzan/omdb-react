import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, Card, Segment, Loader, Dimmer, Image } from 'semantic-ui-react'
import { GO_SET_SELECTED_MOVIE } from './../pages/MoviesSearchPage/Movies.actions';
class MovieGrid extends Component {

    CallModal() {
        this.props.viewMovie();
    }
    setMovie(movie) {
        this.props.GO_SET_SELECTED_MOVIE(movie).then(()=> {
            this.CallModal();
        })
    }
    render() {

        const { isLoading, items } = this.props;
        // console.log(props);
        let movieCards;
        if (items) {

            movieCards = items.map((item) =>
                <Card className={"movie-card"} key={item.imdbID} onClick={() => this.setMovie(item)}>
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

}

const mapStateToProps = state => ({
    moviesdata: state.moviesReducer
})
export default connect(mapStateToProps, { GO_SET_SELECTED_MOVIE })(MovieGrid);