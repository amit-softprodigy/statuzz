import React, { } from 'react';
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity,SafeAreaView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { back, camera, icon_aboutMe ,vexboy } from '../../../../utils/images';
import strings from '../../../../language';
import Loader from '../../../../utils/Loader';
import ShowImageDialog from '../../../../dialogs/ShowImageDialog';
import ClientNameHeader from './ClientNameHeader';

function dp(num) {
    return (EStyleSheet.value(num + 'rem'))
}

const Clienprofile = (props) => {
    
    var result = "";
    if (props.Client_Data != undefined || props.Client_Data != null) {
        result = Object.keys(props.Client_Data).map(key => {
            if(key!="about"){
                return (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: dp(5) }}>
                        <Text style={{ fontSize: dp(14), width: '55%' }}>{strings[key]} </Text>
                        <Text style={{ fontSize: dp(14), color: '#FE0092',width:'45%',textAlign:'right' }}> {props.Client_Data[key] || strings.unanswered}</Text>
                    </View>
                )
            }
        }
        );
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#FFF"}} >
            <View style={{ width: '100%', height: '100%', }}>
                <ImageBackground source={ props.Client_profile == "" ? vexboy :{ uri: props.Client_profile }} style={{ height: dp(380), width: '100%', position: 'absolute' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', alignSelf: 'center', marginVertical: dp(10) }}>
                        <TouchableOpacity onPress={() => props.functionBack()}>
                            <Image style={{ width: dp(30), height: dp(30), resizeMode: 'contain' }} source={back} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ width: dp(25), height: dp(25), resizeMode: 'contain' }} source={camera} />
                            {
                                (props.Photo_List) &&
                                <Text style={{ fontSize: dp(22), fontWeight: 'bold', color: '#FFF', marginHorizontal: dp(10) }}>{props.Photo_List.length} </Text>
                            }
                        </View>
                    </View>
                </ImageBackground>
                <ShowImageDialog {...props} />
                {props.ShowLoader == true ? <Loader /> :
                    <View style={{ marginTop: dp(60) }}>
                        <ScrollView keyboardShouldPersistTaps="always" overScrollMode='never'
                            contentContainerStyle={{ flexGrow: 1 }}>
                            <TouchableOpacity style={{ width: '100%', height: dp(320), backgroundColor: 'transparent' }}
                                onPress={() => props.functionCloseDialog(true)}>
                            </TouchableOpacity>

                            <View style={{ width: '100%', backgroundColor: '#ffffff' }}>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#BDBDBD' }} />
                                <ClientNameHeader {...props} />
                                <View style={{ backgroundColor: '#FE0092', height: dp(40), marginVertical: dp(5), paddingHorizontal: dp(10),
                                    flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={icon_aboutMe} style={{ width: dp(22), height: dp(22), resizeMode: 'contain' }} />
                                    <Text style={{ fontSize: dp(17), color: '#FFF', paddingHorizontal: dp(4) }}>{strings.about}</Text>
                                </View>
                                {props.Client_Data!=null?props.Client_Data.about!=null||props.Client_Data.about!=undefined?
                                    <Text style={{marginLeft:'8%',marginRight:'5%', fontSize:dp(13), color:'#000'}}>{props.Client_Data.about}</Text>:null:null}
                                <View style={{ width: '85%', alignSelf: 'center', marginVertical: dp(10) }}>
                                    <View style={{ borderLeftColor: '#FE0092', borderLeftWidth: 1, marginVertical: dp(5) }}>
                                        {props.Client_Data != null ? result : null }
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: dp(16) }}>
                                    {props.Client_Block === false  &&
                                    <TouchableOpacity style={{ backgroundColor: '#FE0092', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row',
                                        borderRadius: dp(15), padding: dp(8), width: '40%', alignSelf: 'center' }}
                                        onPress={()=>props.functionBlockUser()} >
                                        <Text numberOfLines={1} style={{ color: '#FFF', fontWeight: 'bold' }}>{strings.Block} {props.Name}</Text>
                                    </TouchableOpacity> } 

                                    <TouchableOpacity style={{ backgroundColor: '#FE0092', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row',
                                        borderRadius: dp(15), padding: dp(8), width: '40%', alignSelf: 'center' }}
                                        onPress={() => props.openReportUser('ReportContainer')} >
                                        <Text numberOfLines={1} style={{ color: '#FFF', fontWeight: 'bold',paddingHorizontal:dp(2),textAlign:'center' }}>{strings.Report} {props.Name}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </ScrollView>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default Clienprofile;