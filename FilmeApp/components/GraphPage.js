import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';

export default class GraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDatasetIndex: 0,
      datasets: [],
      contentObjectID: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { objectId } = this.props;
    this.setState({ contentObjectID: objectId }, () => {
      this.fetchAnalyticsData();
    });
  }

  fetchAnalyticsData = () => {
    axios
      .get(`http://${global.server}:4000/analytics/${this.state.contentObjectID}`)
      .then(response => {
        const { reactions } = response.data;
        this.setState({ datasets: reactions, isLoading: false });
      })
      .catch(error => {
        console.error('Error fetching analytics data:', error);
        this.setState({ isLoading: false });
      });
  };

  handleClick = (index) => {
    this.setState({ activeDatasetIndex: index });
  };

  renderTimestampButtons = () => {
    const { activeDatasetIndex, datasets } = this.state;

    const activeDataset = datasets[activeDatasetIndex];
    const buttons = datasets.map((dataset, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.button,
          index === activeDatasetIndex && styles.activeButton,
        ]}
        onPress={() => this.handleClick(index)}
      >
        <Text style={styles.buttonText}>{dataset.timestamp}</Text>
      </TouchableOpacity>
    ));

    return (
      <View style={styles.timestampContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {buttons}
        </ScrollView>
      </View>
    );
  };

  render() {
    const { activeDatasetIndex, datasets, isLoading } = this.state;

    const activeDataset = datasets[activeDatasetIndex];

    const chartConfig = {
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(94, 3, 98, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      yAxis: {
        min: 0,
        max: 5,
        stepSize: 1,
        fixedLabel: true,
        labelCount: 6,
      },
    };

    const chartData = {
      labels: ['Joy', 'Sorrow', 'Anger', 'Surprise'],
      datasets: [
        {
          data: [
            activeDataset ? activeDataset.emotionAvg.joyAvg : 0,
            activeDataset ? activeDataset.emotionAvg.sorrowAvg : 0,
            activeDataset ? activeDataset.emotionAvg.angerAvg : 0,
            activeDataset ? activeDataset.emotionAvg.surpriseAvg : 0,
          ],
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.popupContainer}>
            {datasets.length === 0 ? (
              <View style={styles.chartContainer}>
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No analytics data available</Text>
                </View>
              </View>
            ) : (
              <View style={styles.chartContainer}>
                <BarChart
                  data={chartData}
                  width={Dimensions.get('window').width * 0.8}
                  height={200}
                  chartConfig={chartConfig}
                  style={styles.chartStyle}
                />
              </View>
            )}

            {datasets.length > 0 && this.renderTimestampButtons()}

            <View style={styles.closeButtonContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={this.props.onClose}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
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
  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timestampContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row', // Arrange the timestamps in a row
    alignItems: 'center', // Center the timestamps horizontally
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
  noDataContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButtonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  closeButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  scrollView: {
    // Add some spacing to the top and bottom of the ScrollView
    marginTop: 8,
    marginBottom: 8,
  },
  scrollViewContent: {
    flexDirection: 'row', // Arrange the timestamps horizontally
    alignItems: 'center', // Center the timestamps vertically
  },
});
