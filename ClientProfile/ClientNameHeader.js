import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { app_icon, envelope, heart } from '../../../../utils/images';
import EStyleSheet from 'react-native-extended-stylesheet';

function dp(num) {
    return (EStyleSheet.value(num + 'rem'))
}

const ClientNameHeader = (props) => {
    return (
        <View style={{ flexDirection: 'row', width: '100%' }}>

            <View style={{ width: '50%', marginHorizontal: dp(10), marginTop: dp(13) }}>
                <View style={{ flexDirection: 'row',marginBottom:dp(5) }} >
                    <View style={{ width: '10%'}}>
                        <View style={{ height: dp(10), width: dp(10), borderRadius: dp(5), backgroundColor: props.isOnline?'#42AD0F':'#E4B600', marginTop: dp(3) }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: dp(15), color: '#000', fontWeight: 'bold' }}>{props.Name}{", " + props.Client_Age}</Text>
                        <Text style={{ fontSize: dp(14) }}>{props.Client_City}</Text>
                    </View>
                </View>
            </View>

            <View style={{ width: '45%', flexDirection: 'row', justifyContent: 'space-evenly', }}>

            {props.Client_Like == true? <Image style={{width : dp(25), height : dp(25), resizeMode :'contain', marginTop: dp(20)}} 
                source={app_icon}
                /> :
                <TouchableOpacity style={{ backgroundColor: '#FE0092', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row',
                    borderRadius: dp(15), padding: dp(8), width: '40%', alignSelf: 'center'}}
                    onPress={()=>props.functionLike()} >
                    <Image style={{ width: dp(15), height: dp(15), resizeMode: 'contain' }} source={heart} />
                </TouchableOpacity>} 

                <TouchableOpacity onPress={()=>props.openChatPage()} style={{ backgroundColor: '#FE0092', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row',
                    borderRadius: dp(15), padding: dp(8), width: '40%', alignSelf: 'center' }}>
                    <Image style={{ width: dp(15), height: dp(15), resizeMode: 'contain' }} source={envelope} />
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default ClientNameHeader;