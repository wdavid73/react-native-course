import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    ScrollView,
    TouchableHighlight,
    Image,
} from "react-native";

const ApiUrl = "https://www.omdbapi.com/?apikey=ed0b273a";

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            movies: [],
            movie_select: {},
        };
    }
    static navigationOptions = {
        title: "Movie Browser",
    };

    find = () => {
        fetch(ApiUrl + "&s=" + this.state.name, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    movies: [...responseJson.Search],
                });
            })
            .catch((error) => {
                alert("Error in Fetching to Api Movie");
            });
    };

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
            .then(() => {
                this.props.navigation.navigate("Details", {
                    movie: this.state.movie_select,
                });
            })
            .catch((error) => {
                alert("Error in Fetching to Api Movie");
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Movie Browser</Text>
                <TextInput
                    style={styles.input_movie}
                    textAlign={"center"}
                    placeholder="Enter a Movie Name..."
                    value={this.state.name || ""}
                    onChangeText={(text) => {
                        this.setState({ name: text });
                    }}
                    onSubmitEditing={() => this.find()}
                />
                <ScrollView style={styles.MovieList}>
                    {this.state.movies.map((movie) => (
                        <TouchableHighlight
                            key={this.props.imdbID}
                            onPress={() => this.getMovieSelect(movie.imdbID)}
                        >
                            <View style={styles.main}>
                                <Image
                                    style={styles.poster}
                                    source={{
                                        uri: movie.Poster,
                                    }}
                                    resizeMode="cover"
                                />
                                <Text style={styles.movie}>
                                    {movie.Title} - {movie.Year}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#2f3640",
    },
    text: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        margin: 15,
    },
    input_movie: {
        fontSize: 20,
        padding: 20,
        width: "100%",
        borderRadius: 6,
        marginBottom: 35,
        backgroundColor: "#fff",
    },
    MovieList: {
        margin: 5,
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
    main: {
        flex: 1,
        width: "100%",
        marginBottom: 20,
    },
});
