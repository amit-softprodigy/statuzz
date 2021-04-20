import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions,RefreshControl,SafeAreaView } from 'react-native';
import Loader from '../../../utils/Loader';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Male_Default, filter_button, Female_Default } from '../../../utils/images';
import FilterDialog from '../../../dialogs/FilterDialog';
import FastImage from 'react-native-fast-image';
import strings from '../../../language';
import { RecyclerListView } from 'recyclerlistview';

const width = Dimensions.get('window').width;

function dp(num) {
    return (EStyleSheet.value(num + 'rem'))
}

const FindPeople = (props) => {

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#FFF"}}>
            <View style={{
                height: dp(55), justifyContent: 'center', alignItems: 'center', elevation: 10, backgroundColor: '#FFF',
                shadowColor: 'gray', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 1
            }}>
                <TouchableOpacity style={{ position: 'absolute', left: dp(15) }} onPress={() => props.openModal()} >
                    <Image style={{ width: dp(24), height: dp(24), borderRadius: dp(12) }} source={filter_button} />
                </TouchableOpacity>
                <Text style={{ fontSize: dp(18), fontWeight: 'bold', color: '#000' }}>{strings.Find_People}</Text>
            </View>
            <FilterDialog {...props} />

            {props.Show_Loader == true && <Loader />}
            <RecyclerListView
                contentContainerStyle={{ alignItems:'center', paddingTop: dp(60),justifyContent:'center' }}
                rowRenderer={( types,item,index) => {
                    console.log('item gettingg===', item)
                    console.log(item.isOnline)
                    return(
                        <TouchableOpacity key={index} onPress={() => { 
                            console.log('item getting====', item)
                          props.navigateWithKeys(item.id,item.uid)}
                        }
                            style={{marginTop: index % 3 == 1 ? -dp(45) : dp(5) }} >
                            <View style={{ alignItems: 'center'}}>
                                <FastImage
                                    style={{ width: props.deviceWidth / 3.7, height: props.deviceWidth / 3.7, borderRadius: (props.deviceWidth / 3.7) / 2 }}
                                    source={item.avatar == "" ? item.gender == "female" ? Female_Default : Male_Default : { uri: item.avatar }}
                                />
                                <View style={{
                                    backgroundColor: item.isOnline ==true?'#42AD0F':'#E4B600', width: dp(14), height: dp(14), borderRadius: dp(7),
                                    borderColor: '#FFF', borderWidth: 1.5, position: 'absolute', bottom: -dp(8) }} />
                            </View>
                            <View style={{ justifyContent: 'center',width:props.deviceWidth / 4,  alignSelf:'center', alignItems: 'center', marginTop: dp(5) }}>
                                <View style={{flexDirection:'row',width:'90%',alignSelf:'center'}}>
                                    <Text style={{ fontSize: dp(14), color: '#000',width:'55%',textAlign:'right'}} numberOfLines={1} >{item.firstName}</Text>
                                    <Text style={{ fontSize: dp(14), color: '#000'}} numberOfLines={1} >, {item.age}</Text>
                                </View>
                                <Text style={{ fontSize: dp(11) }}>{item.distance == "" ? null : item.distance}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                dataProvider={props.defaultData}
                layoutProvider={props.layoutProvider}
                //forceNonDeterministicRendering={true}//commented
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                onEndReached={(val) => props.onLoadMore(val)}
                scrollViewProps={{
                    refreshControl: (
                    <RefreshControl
                        refreshing={props.Refreshing}
                        onRefresh={props.onRefresh}
                    />
                    )
                }}
            />
        </SafeAreaView>
    )
}

const LocalStyle = EStyleSheet.create({
    FlatList_Container: {
        width: '95%',
        alignSelf: 'center',
        // backgroundColor :'#ffffff'
    }
})

export default FindPeople;

