import axios from "axios"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { VictoryLine } from "victory-native"

export default function App() {
	const [ data, setData ] = useState()
	const [ coin, setCoin ] = useState("bitcoin")
	const [ period, setPeriod ] = useState(30)

	useEffect(
		() => {
			getData()
		},
		[ coin, period ]
	)

	async function getData() {
		try {
			const response = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${period}`
			)
			const formatData = response.data.prices.map(function(i) {
				return {
					x: i[0],
					y: i[1]
				}
			})
			setData(formatData)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Coin Chart</Text>
			<View style={styles.coins}>
				<Text
					style={[ styles.title, coin === "bitcoin" ? styles.underline : null ]}
					onPress={() => setCoin("bitcoin")}
				>
					Bitcoin
				</Text>
				<Text
					style={[ styles.title, coin === "ethereum" ? styles.underline : null ]}
					onPress={() => setCoin("ethereum")}
				>
					Ethereum
				</Text>
			</View>
			<VictoryLine
				style={{
					data: {
						stroke: "#000",
						strokeWidth: 2
					}
				}}
				width={400}
				height={200}
				data={data}
			/>
			<View style={styles.timeWrapper}>
				<Text style={[ styles.time, period === 1 ? styles.underline : null ]} onPress={() => setPeriod(1)}>
					1 Day
				</Text>
				<Text style={[ styles.time, period === 7 ? styles.underline : null ]} onPress={() => setPeriod(7)}>
					1 Week
				</Text>
				<Text style={[ styles.time, period === 30 ? styles.underline : null ]} onPress={() => setPeriod(30)}>
					1 Month
				</Text>
				<Text style={[ styles.time, period === 365 ? styles.underline : null ]} onPress={() => setPeriod(365)}>
					1 Year
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5fcff"
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		margin: 10
	},
	timeWrapper: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},

	coins: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	time: {
		margin: 10
	},
	header: {
		position: "absolute",
		top: 50,
		fontSize: 30,
		fontWeight: "bold"
	},
	underline: { textDecorationLine: "underline" }
})
