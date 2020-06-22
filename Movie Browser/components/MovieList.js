import React from "react";
import { StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import Movie from "./Movie";

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={style.MovieList}>
                {this.props.movies.map((movie) => (
                    <Movie {...movie} key={movie.imdbID} />
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    MovieList: {
        margin: 5,
    },
});
