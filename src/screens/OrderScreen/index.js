import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from "react-native";
import styles from "./styles";
import HomeMap from "../../components/HomeMap";
import CovidMessage from "../../components/CovidMessage";
import HomeSearch from "../../components/HomeSearchComponent";
import OrderMap from "../../components/OrderMap";
import {useRoute} from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {getOrder} from "../../graphql/queries";

const OrderScreen = (props) => {

    const [car, setCar] = useState(null);
    const [order, setOrder] = useState(null);

    const route = useRoute();
    // console.warn(route.params.id);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderData = await API.graphql(graphqlOperation(getOrder, {
                    id: route.params.id
                }))

                setOrder(orderData.data.getOrder);
            } catch (e) {
                console.log(e);
            }
        }

        fetchOrder();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{height: Dimensions.get('window').height - 200}}>

                <OrderMap car={car} />
            </View>

            <View>
                <Text>Order status: {order?.status}</Text>
            </View>

            {/*<CovidMessage />*/}

            {/*<HomeSearch />*/}
        </View>
    );
};

export default OrderScreen;
