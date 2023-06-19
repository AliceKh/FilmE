import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';

export default class GraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDatasetIndex: 0,
      datasets: [
        {
          timestamp: '00:01:42',
          totalReactions: 4,
          emotionAvg: {
            joyAvg: 4.5,
            sorrowAvg: 1.5,
            angerAvg: 3.5,
            surpriseAvg: 2.5,
          },
        },
        {
          timestamp: '00:02:33',
          totalReactions: 4,
          emotionAvg: {
            joyAvg: 2.5,
            sorrowAvg: 3.5,
            angerAvg: 1.5,
            surpriseAvg: 3,
          },
        },
        {
          timestamp: '00:03:55',
          totalReactions: 2,
          emotionAvg: {
            joyAvg: 3,
            sorrowAvg: 4,
            angerAvg: 2,
            surpriseAvg: 1,
          },
        },        {
          timestamp: '00:03:55',
          totalReactions: 2,
          emotionAvg: {
            joyAvg: 3,
            sorrowAvg: 4,
            angerAvg: 2,
            surpriseAvg: 1,
          },
        },        {
          timestamp: '00:03:55',
          totalReactions: 2,
          emotionAvg: {
            joyAvg: 3,
            sorrowAvg: 4,
            angerAvg: 2,
            surpriseAvg: 1,
          },
        },
      ],
      contentObjectID: null,
    };
  }

  componentDidMount() {
    const { objectId } = this.props;
    console.log('Received objectId in GraphPage:', objectId);
    this.setState({ contentObjectID: objectId }, () => {
      this.fetchAnalyticsData();
    });
  }

  fetchAnalyticsData = () => {
    // const contentObjectID = props.objectId;
    // console.log(this.state);
    console.log("contentObjectID: " + this.state.contentObjectID);
    axios
      .get(`http://${global.server}:4000/analytics/` + this.state.contentObjectID, {
      })
      .then(response => {
        const { reactions } = response.data;
        console.log(reactions);
        this.setState({ datasets: reactions });
      })
      .catch(error => {
        console.error('Error fetching analytics data:', error);
      });
  };

  handleClick = index => {
    this.setState({ activeDatasetIndex: index });
  };

  render() {
    const { activeDatasetIndex, datasets } = this.state;

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
            activeDataset.emotionAvg.joyAvg,
            activeDataset.emotionAvg.sorrowAvg,
            activeDataset.emotionAvg.angerAvg,
            activeDataset.emotionAvg.surpriseAvg,
          ],
        },
      ],
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
              <Text style={styles.timestamp}>{activeDataset.timestamp}</Text>
            </View>

            <Text style={styles.timestampTitle}>Timestamps:</Text>

            <View style={styles.buttonContainer}>
              {datasets.map((dataset, index) => (
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
});
