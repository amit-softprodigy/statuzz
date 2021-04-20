import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, Keyboard,SafeAreaView } from 'react-native';
import { Left_back } from '../../../../utils/images';
import { connect } from 'react-redux';
import { client_ReportApi } from '../../../../Redux/Actions/clientProfile_action';
import Loader from '../../../../utils/Loader';
import EStyleSheet from 'react-native-extended-stylesheet';

function dp(num) {
    return (EStyleSheet.value(num + 'rem'))
}

class ReportContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Selectionvalue: "",
            Title: 'Signaler',
            User_Id: '',
        }
        this.props.navigation.addListener(
            'focus',
            payload => {
                let id = this.props.route.params.USER_ID;
                console.log(id)
                this.setState({ User_Id: id });
            }
        );
    }
    setTextReport = (text) => {
        this.setState({ Selectionvalue: text })
    }
    functionBack = () => {
        this.props.navigation.goBack();
    }
    ReportApi = () => {
        const { Selectionvalue, User_Id } = this.state;
        let Data = { 'body': Selectionvalue }
        Keyboard.dismiss();
        if (Selectionvalue == "") {
            alert('Please enter Someting')
        }
        else {
            this.props.client_ReportApi(Data, User_Id);
        }
    }
    render() {
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%' }}>
                    <View style={{
                        height: dp(50), justifyContent: 'center', alignItems: 'center', elevation: 10, backgroundColor: '#FFF',
                        shadowColor: 'gray', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 1, flexDirection: 'row'
                    }}>
                        <View style={[LocalStyle.Image_Container, { width: '18%' }]}>
                            <TouchableOpacity onPress={() => this.functionBack()}>
                                <Image style={{ width: dp(30), height: dp(30), resizeMode: 'contain' }} source={Left_back} />
                            </TouchableOpacity>
                        </View>
                        <View style={[LocalStyle.Image_Container, { width: '60%' }]}>
                            <Text style={{ fontSize: dp(18), fontWeight: 'bold', color: '#000' }}>{this.state.Title}</Text>
                        </View>
                        <TouchableOpacity style={[LocalStyle.Image_Container, { width: '22%' }]} onPress={() => this.ReportApi()}>
                            <Text style={{ fontSize: dp(14), color: '#BDBDBD' }}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                    {this.props.hideProgress == true && <Loader />}
                    <View style={{ width: '90%', height: undefined, alignSelf: 'center' }}>
                        <View style={{
                            width: '100%', height: dp(150), borderColor: '#757575', borderWidth: dp(.5),
                            borderRadius: dp(10), marginTop: dp(20)
                        }}>
                            <TextInput style={{ width: '90%', height: '100%', alignSelf: 'center' }}
                                multiline={true}
                                onChangeText={text => this.setTextReport(text)}
                                value={this.Selectionvalue}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const LocalStyle = EStyleSheet.create({
    Image_Container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function mapToState(state) {
    const { hideProgress } = state.ClientprofileReducer;
    return { hideProgress }
}

export default connect(mapToState, { client_ReportApi })(ReportContainer)

