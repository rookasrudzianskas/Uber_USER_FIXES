import React from 'react';
import {Dimensions, Text, View} from "react-native";
import styles from "./styles";
import HomeMap from "../../components/HomeMap";
import CovidMessage from "../../components/CovidMessage";
import HomeSearch from "../../components/HomeSearchComponent";
import OrderMap from "../../components/OrderMap";

const OrderScreen = (props) => {

    const []

    return (
        <View style={styles.container}>
            <View style={{height: Dimensions.get('window').height - 200}}>

                <OrderMap />
            </View>

            {/*<CovidMessage />*/}

            {/*<HomeSearch />*/}
        </View>
    );
};

export default OrderScreen;
