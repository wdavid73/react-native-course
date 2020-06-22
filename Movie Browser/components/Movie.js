import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from "react-native";
const ApiUrl = "https://www.omdbapi.com/?apikey=ed0b273a";

export default class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_select: {},
        };
    }

    getMovieSelect = (id) => {
        fetch(ApiUrl + "&i=" + id, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    movie_select: responseJson,
                });
            })
            .catch((error) => {
                alert("Error in Fetching to Api Movie");
            });
    };

    render() {
        return (
            <TouchableHighlight
                key={this.props.imdbID}
                onPress={() => this.getMovieSelect(this.props.imdbID)}
            >
                <View style={style.main}>
                    <Image
                        style={style.poster}
                        source={{
                            uri: this.props.Poster,
                        }}
                        resizeMode="cover"
                    />
                    <Text style={style.movie}>
                        {this.props.Title} - {this.props.Year}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        width: "100%",
        marginBottom: 20,
    },
    movie: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        padding: 20,
        backgroundColor: "#2c3e50",
    },
    poster: {
        width: "100%",
        height: 300,
    },
});
