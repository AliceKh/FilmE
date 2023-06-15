import React from 'react';
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
});
