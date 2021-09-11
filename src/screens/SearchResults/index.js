import React, {useState} from 'react';
import {Dimensions, Text, View} from "react-native";
import UberTypes from "../../components/UberTypes";
import RouteMap from "../../components/RouteMap";
import {useRoute} from "@react-navigation/native";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {createOrder} from "../../graphql/mutations";




const SearchResults = (props) => {

    const route = useRoute();
    const {originPlace, destinationPlace} = route.params;
    // console.log(originPlace)
    // console.log("These are the maps", originPlace.origin.details.geometry.location.lat, destinationPlace.destination.details.geometry.location.lng);
    const typeState = useState(null);
    // console.log("🚀",route.params);

    const onSubmit = async() => {
        const [type] = typeState;
        if(!type) {
            return;
        }

        // submit to the server

        const date = new Date();

        try {

            const userInfo = await Auth.currentAuthenticatedUser();
            const input = {
                createdAt: date.toISOString(),
                type: type,
                originLatitude: originPlace.details.geometry.location.lat,
                originLongitude: originPlace.details.geometry.location.lng,


                destLatitude: destinationPlace.details.geometry.location.lat,
                destLongitude: destinationPlace.details.geometry.location.lng,


                userId: userInfo.attributes.sub,

                carId: "1",
            }
            const response = await API.graphql(graphqlOperation(createOrder({
                input: input
            })));

            console.log("This is response", response);

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={{justifyContent: 'space-between'}}>


            <View style={{height: Dimensions.get('window').height - 550}}>
                <RouteMap origin={originPlace} destination={destinationPlace} />
            </View>

            <View style={{height: 550}}>
                <UberTypes typeState={typeState} onSubmit={onSubmit} />
            </View>
        </View>
    );
};

export default SearchResults;
