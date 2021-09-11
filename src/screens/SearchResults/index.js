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
            return false;
        }

        // submit to the server

        try {

            const userInfo = await Auth.currentAuthenticatedUser();
            const input = {
                type: type,
                originLatitude: originPlace.origin.details.geometry.location.lat,
                originLongitude: originPlace.origin.details.geometry.location.lng,


                destLatitude: destinationPlace.destination.details.geometry.location.lat,
                destLongitude: destinationPlace.destination.details.geometry.location.lng,


                userId: userInfo.attributes.sub,

                carId: "",
            }
            const response = await API.graphql(graphqlOperation(createOrder({
                input
            })))

            // console.log("This is response", response);

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
