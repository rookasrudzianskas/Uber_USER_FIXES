import React, {useState} from 'react';
import {Dimensions, Text, View} from "react-native";
import styles from "./styles";
import HomeMap from "../../components/HomeMap";
import CovidMessage from "../../components/CovidMessage";
import HomeSearch from "../../components/HomeSearchComponent";
import OrderMap from "../../components/OrderMap";

const OrderScreen = (props) => {

    const [car, setCar] = useState(null);
    const [order, setOrder] = useState(null);

    return (
        <View style={styles.container}>
            <View style={{height: Dimensions.get('window').height - 200}}>

                <OrderMap car={car} />
            </View>

            {/*<CovidMessage />*/}

            {/*<HomeSearch />*/}
        </View>
    );
};

export default OrderScreen;
