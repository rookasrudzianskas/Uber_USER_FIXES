import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from "react-native";
import styles from "./styles";
import HomeMap from "../../components/HomeMap";
import CovidMessage from "../../components/CovidMessage";
import HomeSearch from "../../components/HomeSearchComponent";
import OrderMap from "../../components/OrderMap";
import {useRoute} from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {getCar, getOrder} from "../../graphql/queries";

const OrderScreen = (props) => {

    const [car, setCar] = useState(null);
    const [order, setOrder] = useState(null);

    const route = useRoute();
    // console.warn(route.params.id);

    console.log(route.params.id);

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


    useEffect(() => {

        if(!order?.carId || order.carId === '1') {
            return;
        }

        const fetchCar = async () => {
            try {
                const carData = await API.graphql(graphqlOperation(getCar, {
                    id: order.carId
                }))

                setOrder(carData.data.getCar);
            } catch (e) {
                console.log(e);
            }
        }

        fetchCar();
    }, [order]);

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
