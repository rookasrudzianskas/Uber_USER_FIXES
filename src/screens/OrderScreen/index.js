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
import {onCarUpdated, onOrderUpdated} from "./subscriptions";

const OrderScreen = (props) => {

    const [car, setCar] = useState(null);
    const [order, setOrder] = useState(null);

    const route = useRoute();
    // console.warn(route.params.id);

    console.log(route.params.id);

    // fetch order on the initial render
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

    // subscribe to the order updates
    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(onOrderUpdated, { id: route.params.id })
        ).subscribe({
            next: ({ value }) => setOrder(value.data.onOrderUpdated),
            error: error => console.warn(error)
        })

        return () => subscription.unsubscribe();
    }, []);


        // the car fetching then order is updated
    useEffect(() => {

        if(!order?.carId || order.carId === '1') {
            return;
        }

        const fetchCar = async () => {
            try {
                const carData = await API.graphql(graphqlOperation(getCar, {
                    id: order.carId
                }))

                setCar(carData.data.getCar);
                // console.log("Car DAAATA", carData);
            } catch (e) {
                console.log(e);
            }
        }

        fetchCar();
    }, [order]);

    // subscribe to the car updates
    useEffect(() => {
        if(!order?.carId || order.carId === '1') {
            return;
        }

        const subscription = API.graphql(
            graphqlOperation(onCarUpdated, { id: order.carId })
        ).subscribe({
            next: ({ value }) => setCar(value.data.onCarUpdated),
            error: error => console.warn(error)
        })

        return () => subscription.unsubscribe();
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


// app is done 🔥s
