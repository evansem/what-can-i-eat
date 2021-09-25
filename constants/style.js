import { StyleSheet } from 'react-native';

const primaryColor = '#008037'
const secondaryColor = '#DBB700' //FF914D'

const global_style = StyleSheet.create({
  //=================================================================//
  //                       WRAPPERS AND BOXES                        //
  //=================================================================//
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin: 5,
    padding: 10,
    justifyContent: 'center',
  },
  softContainer: {
    margin: 40,
    fontSize: 18,
    alignItems: "center",
  },
  item: {
    backgroundColor: primaryColor,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    //primary colour in dec with opacity
    backgroundColor: 'rgba(00,128,55, 0.3)',
    borderRadius: 5,
    alignItems: "center",
    minWidth: 100
  },
  compactItem: {
    padding: 10
  },
  whiteItem: {
    borderWidth: 0.5,
    backgroundColor: '#FFF'
  },
  mainHeader: {
    fontSize: 32,
    fontWeight: "700"
  },
  //=================================================================//
  //                       INPUT AND BUTTONS                         //
  //=================================================================//
  checkboxContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    margin: 40,
},
  primaryButton: {
    backgroundColor: primaryColor,
    padding: 100,
    height: 100,
  },
  error_msg: {
    color: 'red',
  },
  inputBox: {
    fontSize: 20,
    borderColor: "#707070",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 15,
    marginBottom: 10
  },
  separator: {
    marginVertical: 22,
    borderBottomColor: '#707070',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  //=================================================================//
  //                           STYLE FOR TEXT                        //
  //=================================================================//
  textForm: {
    width: "80%",
    margin: "10%"
  },
  paragraph: {
    padding: 10,
    marginVertical: 5,
    textAlign: 'justify',
    // fontWeight: "900",
    fontSize: 14

  },

  title: {
    fontSize: 20,
    textAlign: 'justify',
    justifyContent: 'space-between',
  },
  h2: {
    fontSize: 18,
  },
  important: {
    fontWeight: "bold"
  }
});

export { global_style, primaryColor, secondaryColor }