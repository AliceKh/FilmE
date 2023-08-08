import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import { stylesGraph } from '../styles/style';

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
        this.setState({ isLoading: false });
      });
  };

  handleClick = (index) => {
    this.setState({ activeDatasetIndex: index });
  };

  parseTimestampToSeconds = (timestamp) => {
    const parts = timestamp.split(':').map((part) => parseInt(part));
    if (parts.length === 3) {
      // Timestamp with "XX:YY:ZZ" format
      const [hours, minutes, seconds] = parts;
      return (hours * 60 * 60) + (minutes * 60) + seconds;
    } else if (parts.length === 2) {
      // Timestamp with "XX:YY" format
      const [minutes, seconds] = parts;
      return (minutes * 60) + seconds;
    } else {
      // Invalid timestamp format, return 0
      return 0;
    }
  };

  renderTimestampButtons = () => {
    const { activeDatasetIndex, datasets } = this.state;

    const activeDataset = datasets[activeDatasetIndex];

    // Sort timestamps based on their converted values (in seconds)
    const sortedButtons = datasets.sort((a, b) => {
      const timeA = this.parseTimestampToSeconds(a.timestamp);
      const timeB = this.parseTimestampToSeconds(b.timestamp);
      return timeA - timeB;
    });

    const buttons = sortedButtons.map((dataset, index) => (
      <TouchableOpacity
        key={index}
        style={[
          stylesGraph.button,
          index === activeDatasetIndex && stylesGraph.activeButton,
        ]}
        onPress={() => this.handleClick(index)}
      >
        <Text style={stylesGraph.buttonText}>{dataset.timestamp}</Text>
      </TouchableOpacity>
    ));

    return (
      <View style={stylesGraph.timestampContainer}>
        <ScrollView
          style={stylesGraph.scrollView}
          contentContainerStyle={stylesGraph.scrollViewContent}
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
      <View style={stylesGraph.container}>
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={stylesGraph.popupContainer}>
            {datasets.length === 0 ? (
              <View style={stylesGraph.chartContainer}>
                <View style={stylesGraph.noDataContainer}>
                  <Text style={stylesGraph.noDataText}>No analytics data available</Text>
                </View>
              </View>
            ) : (
              <View style={stylesGraph.chartContainer}>
                <BarChart
                  data={chartData}
                  width={Dimensions.get('window').width * 0.8}
                  height={200}
                  chartConfig={chartConfig}
                  style={stylesGraph.chartStyle}
                />
              </View>
            )}

            {datasets.length > 0 && this.renderTimestampButtons()}

            <View style={stylesGraph.closeButtonContainer}>
              <TouchableOpacity
                style={stylesGraph.closeButton}
                onPress={this.props.onClose}
              >
                <Text style={stylesGraph.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
