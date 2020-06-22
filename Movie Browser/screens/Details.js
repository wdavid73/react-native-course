import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

export default class Details extends React.Component {
    static navigationOptions = {
        title: "Details Movie",
    };
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.poster}
                    source={{
                        uri: this.props.navigation.getParam("movie").Poster,
                    }}
                    resizeMode="cover"
                />
                <Text style={styles.text}>
                    {this.props.navigation.getParam("movie").Title} -{" "}
                    {this.props.navigation.getParam("movie").Year}
                </Text>
                <ScrollView>
                    <Text style={styles.info}>
                        Genre : {this.props.navigation.getParam("movie").Genre}
                    </Text>
                    <Text style={styles.info}>
                        Director :{" "}
                        {this.props.navigation.getParam("movie").Director}
                    </Text>
                    <Text style={styles.info}>
                        Writer :{" "}
                        {this.props.navigation.getParam("movie").Writer}
                    </Text>
                    <Text style={styles.info}>
                        Actors :{" "}
                        {this.props.navigation.getParam("movie").Actors}
                    </Text>
                    <Text style={styles.info}>
                        Language :{" "}
                        {this.props.navigation.getParam("movie").Language}
                    </Text>
                    <Text style={styles.info}>
                        Country :{" "}
                        {this.props.navigation.getParam("movie").Country}
                    </Text>
                    <Text style={styles.info}>
                        Awards :{" "}
                        {this.props.navigation.getParam("movie").Awards}
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ebebeb",
    },
    text: {
        color: "#101010",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    poster: {
        width: "100%",
        height: 300,
    },
    info: {
        color: "#101010",
        fontSize: 16,
        width: "100%",
        marginTop: 12,
        textAlign: "center",
        padding: 10,
    },
});
