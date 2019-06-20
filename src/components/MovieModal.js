

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Segment, Loader, Dimmer, Image, Modal, Header, Rating, Button } from 'semantic-ui-react'
import { GO_SET_SELECTED_MOVIE } from './../pages/MoviesSearchPage/Movies.actions';
import _ from 'lodash'

class MovieModal extends Component {

    CallModal() {
        this.props.viewMovie();
    }
    setMovie(movie) {
        this.props.GO_SET_SELECTED_MOVIE(movie).then(() => {
            this.CallModal();
        })
    }
    render() {

        const { open, dimmer, fullPlotToggleLoading, toggleGrabFullPlot, shortplotmode, close } = this.props;
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
            const { Title, Poster, imdbRating, Plot, Released, Year } = item;
            return (
                <Modal dimmer={dimmer} open={open} onClose={() => close()} closeIcon>

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
                            <Button basic onClick={() => toggleGrabFullPlot()} color={"green"} loading={fullPlotToggleLoading}>
                                {shortplotmode ? 'Read Full Plot' : 'Read Short Plot'}
                            </Button>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Content className={'date'}>Released: {Released}</Modal.Content>

                </Modal>

            )
        }
        return null;
    }

}

const mapStateToProps = state => ({
    moviesdata: state.moviesReducer
})
export default connect(mapStateToProps, { GO_SET_SELECTED_MOVIE })(MovieModal);