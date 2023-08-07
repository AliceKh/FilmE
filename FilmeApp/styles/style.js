import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');
const width = height * 0.5625; // 16:9 aspect ratio

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    color: 'white'
  }
});

const stylesLogin = StyleSheet.create({
  visibilityBtn: {
    height: 15,
    width: 15,
    margin: 5
  },
  visibilityView: {
    position: 'absolute'
  },
  title: {
    marginHorizontal: 55,
    alignItems: "center",
    marginTop: 50,
    paddingVertical: 10,
  },
  titleText: {
    color: "#9960D2",
    margin: 5,
    fontSize: 24
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 25,
    paddingHorizontal: 10,
    borderColor: "#9960D2",
    borderRadius: 12,
    paddingVertical: 2
  },
  inputText: {
    width: "100%"
  },
  buttonContainer: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    paddingVertical: 10
  },
  logo: {
    alignSelf: "center",
    margin: "5%",
    height: 190,
    width: 120
  },
  linkButton: {
    alignSelf: "center",
    color: "#9960D2",
    paddingBottom: "5%"
  },
  error: {
    color: "#dc3545",
    paddingHorizontal: 35
  },
  mainBackground: {
    height: "100%",
    backgroundColor: "rgba(20,8,32, 1.0)"
  },
  mainLogo: {
    alignSelf: "center",
    margin: "15%",
    height: 240,
    width: 140
  }
});

const stylesExplore = StyleSheet.create({
  searchBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#584177',
    borderRadius: 5,
    paddingHorizontal: 7,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: 'white'
  },
  backButton: {
    marginRight: 10,
  },
  centeredButton: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  recentlyPlayed: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white'
  },
  seeAll: {
    color: 'gray',
    fontSize: 16,
  },
  recentlyPlayedContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  recentlyPlayedItem: {
    alignItems: 'center',
    margin: 10,
  },
  recentlyPlayedImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 10,
  },
  recentlyPlayedName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  recentlyPlayedArtist: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray'
  },
  songItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  songDetails: {
    flex: 1,
  },
  songName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white'
  },
  artistName: {
    fontSize: 14,
    color: 'gray'
  },

});

const stylesProfile = StyleSheet.create({
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    paddingHorizontal: 10
  },
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center'
  },
  itemImage: {
    flex: 1,
    width: 210,
    height: 235,
    aspectRatio: 1,
  },
  infoName: {
    fontSize: 16,
    color: 'gray',
  },
  infoStatic: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 8,
    color: 'white',
  },
  headerText: {
    fontSize: 16,
    color: 'white'
  },
  followBtn: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20
  },
  centerStyle: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBtn: {
    borderColor: '#686060', borderWidth: 1, borderRadius: 3
  },
});

const stylesReaction = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    height: 1,
    width: 1,
    alignItems: 'flex-end'
  },
  text: {
    textAlign: 'center'
  }
});

const stylesMedia = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    height: 50,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,

  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: height,
    width: width,
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artist: {
    color: 'white',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginTop: 10,
  },
  controlButton: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  dialogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginVertical: height / 6,
    marginHorizontal: width / 15,
    borderRadius: 20,
    borderWidth: 1
  },
  dialogContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  dialogImageContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  dialogTextContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  dialogButtonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
    borderRadius: 20
  },
  dialogText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#807e7e',
    marginTop: 20
  },
  paraText: {
    marginTop: 10,
    color: '#cccccc',

  },
  dialogButton: {
    marginTop: 55,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  headerText: {
    fontSize: 16,
    color: 'white'
  }
});

const stylesGraph = StyleSheet.create({
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
  }
});

const stylesUpload = StyleSheet.create({
  page: {
    paddingTop: 30,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  headerText: {
    fontSize: 16,
    color: 'white'
  },
  titleView: {
    display: 'flex',
    marginHorizontal: 55,
    alignSelf: 'center',
    margin: 10
  },
  title: {
    color: "#9960D2",
    margin: 5,
    fontSize: 24
  },
  typeView: {
    marginHorizontal: 80,
  },
  uploadView: {
    paddingTop: 10,
    alignItems: 'center'
  },
  uploadPreviewView: {
    paddingTop: 10,
    marginHorizontal: 80,
    alignItems: "center"
  },
  uploadFAB: {},
  uploadedImage: undefined,
  borderInput: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: "#9960D2",
    borderRadius: 12,
    paddingVertical: 2
  }

});

export {
  styles,
  stylesMedia,
  stylesExplore,
  stylesGraph,
  stylesLogin,
  stylesProfile,
  stylesReaction,
  stylesUpload,
}