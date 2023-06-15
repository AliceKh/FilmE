import React from 'react';
<<<<<<< HEAD
import { View, Text, Image, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default class GraphPage extends React.Component {
  render() {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99],
        },
      ],
    };

    return (
      <View style={styles.body}>
        {/* Header section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Graph Page</Text>
        </View>

        {/* Graph section */}
        <View style={styles.graphContainer}>
          <BarChart
            data={data}
            width={300}
            height={200}
            yAxisLabel=""
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              fillShadowGradientOpacity: 1,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.graph}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  body: {
    flex: 1,
    backgroundImage: 'linear-gradient(to right, #29024f, #000000, #29024f)',
  },
  headerText: {
    fontSize: 16,
    color: 'white',
  },
  graphContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  graph: {
    borderRadius: 16,
  },
=======
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default class GraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDatasetIndex: 0,
    };
  }

  handleClick = (index) => {
    this.setState({ activeDatasetIndex: index });
  }

  render() {
    const datasets = [
      {
        timeStamp: 0.12,
        data: [75, 20, 35, 50],
      },
      {
        timeStamp: 1.42,
        data: [50, 10, 45, 90],
      },
      {
        timeStamp: 3.23,
        data: [2, 30, 77, 83],
      },
    ];

    const activeDataset = datasets[this.state.activeDatasetIndex];

    const chartData = {
      labels: ['Joy', 'Sorrow', 'Anger', 'Surprise'],
      datasets: [
        {
          data: activeDataset.data,
        },
      ],
    };

    const chartConfig = {
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(94, 3, 98, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Graph Title</Text>

        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.popupContainer}>
            <View style={styles.chartContainer}>
              <BarChart
                data={chartData}
                width={Dimensions.get('window').width * 0.8}
                height={200}
                chartConfig={chartConfig}
                style={styles.chartStyle}
              />
              <Text style={styles.timestamp}>{activeDataset.timeStamp}</Text>
            </View>

            <Text style={styles.timestampTitle}>Timestamps:</Text>

            <View style={styles.buttonContainer}>
              {datasets.map((dataset, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    index === this.state.activeDatasetIndex && styles.activeButton
                  ]}
                  onPress={() => this.handleClick(index)}
                >
                  <Text style={styles.buttonText}>{dataset.timeStamp}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timestampTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    marginRight: 8,
  },
  activeButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
>>>>>>> b6aaedafe28bde0dabc0b2cce42f797cd9caf69e
});
