import React, { Component } from 'react';
import FindPeople from './findPeople';
import { connect } from 'react-redux';
import { Dimensions,View } from 'react-native';
import { getDefaultList } from '../../../Redux/Actions/findPeople_action';
import { showMessageIcon } from '../../../Redux/Actions/tabbarIconAction';
import  * as  Storage  from '../../../service/AsyncStoreConfig';
import { LayoutProvider,DataProvider } from 'recyclerlistview';
// import firebase from 'react-native-firebase';

const deviceWidth = Dimensions.get('window').width

class FindPeopleContainer extends Component {
    constructor(props) {
        super(props)
        this.onRefresh= this.onRefresh.bind(this);
        this.state = {
            modalVisible:false,
            Man: true,
            Woman: false,
            Min_value:18,
            Max_value:70,
            showPlacesList: true,
            CityVal :'',
            Gender:'',
            Show_Loader:false,
            Page:1,
            onEndReachedCalledDuringMomentum: true,
            Filter:false,
            Refreshing: false,



            defaultData: new DataProvider((r1,r2)=>r1 !== r2).cloneWithRows(0),
            hideProgress: false,
            Current_Index: 1,
            data:[],
            Last_Index:1,
        }
        this.viewabilityConfig = {viewAreaCoveragePercentThreshold: 50}
        this.layoutProvider= new LayoutProvider((i) => {
            // index % 3 == 1 ? -dp(45) : dp(5)
            if (i % 3 == 0) {
                return 'HALF_RIGHT';
            } else if(i % 2 == 0){
                return 'HALF_LEFT';
            } 
            else{
                return 'CENTER';
            }
        },(types,dim)=>{
            switch(types){
                case 'HALF_LEFT':
                    dim.width=deviceWidth/3.1;
                    dim.height=180;
                    break;
                case 'HALF_RIGHT':
                    dim.width=deviceWidth/3.1;
                    dim.height=180;
                    break;
                case 'CENTER':
                    dim.width=deviceWidth/3.1;
                    dim.height=180;
                    break;
                default:
                    dim.width=0;
                    dim.height=0;
                    break;
            }
        })
    }

    onRefresh=()=>{
        this.setState({Refreshing : true,Filter : false,hideProgress:true})
        const {Min_value, Max_value,CityVal, Gender} = this.state;
        // this.props.getDefaultList(Min_value, Max_value, Gender,CityVal, 1,true);
        this.props.getDefaultList(Min_value, Max_value, Gender, CityVal, 1,true,(data,cp,lp)=>{
            this.setState({data:this.state.data.concat(data)})
            this.setState({
                hideProgress: false,
                defaultData: new DataProvider((r1,r2)=>r1 !== r2).cloneWithRows(this.state.data) ,
                Current_Index : cp,
                Last_Index : lp
            })
        },()=>{
            this.setState({
                hideProgress: false})
        });
        this.setState({ Refreshing : false})
    }

    componentDidMount() {
        Storage.getData('uid').then((fbid)=>{
            this.initialdata();
            // this.props.showMessageIcon();
            this.setonline(fbid);
            this.somerandomfunction(fbid,true);
        })
    }

    initialdata=()=>{
        this.setState({hideProgress:true})
        Storage.getData('Modal_data').then((Modal_data)=>{
            if(JSON.parse(Modal_data) != null ){
                let mData= JSON.parse(Modal_data)
                this.setState({Refreshing : true,Filter : false})
                if(mData.Gender.toLowerCase() == "male"){
                    this.setState({Man :true, Woman : false , Gender :'Male'})
                }
                else{
                    this.setState({Man :false , Woman : true, Gender :'Female'})
                }
                this.props.getDefaultList(mData.Min_value, mData.Max_value, mData.Gender, mData.CityVal, 1,true,(data,cp,lp)=>{
                    // console.log("1",data)
                    this.setState({
                        hideProgress: false,
                        defaultData: new DataProvider((r1,r2)=>r1 !== r2).cloneWithRows(data) ,
                        Current_Index : cp,
                        Last_Index : lp
                    })
                },()=>{
                    this.setState({
                        hideProgress: false})
                });
                this.setState({ Refreshing : false})
            }
            else{
                this.setState({Refreshing : true,Filter : false})
                Storage.getData('USERDATA').then((user)=>{
                    // alert(JSON.stringify(user))
                    let mData= JSON.parse(user)
                    if(mData.gender.toLowerCase() == "male"){
                        this.setState({Man :false, Woman : true , Gender :'Female'})
                        this.props.getDefaultList(this.state.Min_value, this.state.Max_value, "Female", "", 1,true,(data,cp,lp)=>{
                            this.setState({data:this.state.data.concat(data)})
                            this.setState({
                                hideProgress: false,
                                defaultData: new DataProvider((r1,r2)=>r1 !== r2).cloneWithRows(this.state.data) ,
                                Current_Index : cp,
                                Last_Index : lp
                            })
                        },()=>{
                            this.setState({
                                hideProgress: false})
                        });                    
                    }
                    else{
                        this.setState({Man :true , Woman : false, Gender :'Male'})
                        this.props.getDefaultList(this.state.Min_value, this.state.Max_value, "Male", "", 1,true,(data,cp,lp)=>{
                            // console.log("3",data)
                            this.setState({data:this.state.data.concat(data)})
                            this.setState({
                                hideProgress: false,
                                defaultData: new DataProvider((r1,r2)=>r1 !== r2).cloneWithRows(this.state.data) ,
                                Current_Index : cp,
                                Last_Index : lp
                            })
                        },()=>{
                            this.setState({
                                hideProgress: false})
                        });                    
                    }
                    this.setState({ Refreshing : false})
                })
            }
        })
    }

	setonline(firebaseId){
		// var loggedDate = new Date();
		// var amOnline = firebase.database().ref('.info/connected');
		// var userRef = firebase.database().ref('presence').child(firebaseId);
		// firebase.database().ref('users').child(firebaseId).update({
		//   loggedAt: loggedDate,
		// })
		// amOnline.on('value', function (snapshot) {
		//   if (snapshot.val()) {
		// 	userRef.onDisconnect().remove();
        //     userRef.set(true);
		//   }
		// })
    }

    somerandomfunction(firebaseId,value){
        // firebase.database().ref('messageFriends').child(firebaseId).once("value", mFSnapshot => {
        //     mFSnapshot.forEach(friends => {
        //         var update = firebase.database().ref('messageFriends').child(friends.key);
        //         firebase.database().ref('messageFriends').child(friends.key).once("value", mFSnap => {
        //             mFSnap.forEach(friends2 => {
        //                 if (friends2.key == firebaseId) {
        //                     update.child(friends2.key).update({
        //                         isOnline:value
        //                     })
        //                 } 
        //             })
        //         });
        //     });
        // })
    }
	
    functionnavigationPage=(value)=>{
        this.props.navigation.navigate(value)
    }
    
    navigateWithKeys=(id,fbid)=>{
        console.log(id,fbid)
        this.props.navigation.navigate('ClientProfile', {ID : id,fbid:fbid});
    }

    multiSliderValuesChange = (value) => {
        let mMin= value[0];
        let mMax= value[1];
        this.setState({Min_value : mMin, Max_value : mMax})
    }

    selectGender = (index, value) => {
        switch (index) {
            case 'MAN':
                value == true ? this.setState({ Man: false, Woman: true , Gender :'Female'}):this.setState({ Man: true, Woman: false , Gender :'Male'})
                break;
            case 'WOMAN':
                value == true ?  this.setState({ Man: true, Woman: false ,Gender :'Male'}) : this.setState({ Man: false, Woman: true,Gender :'Female' });
                break;
            default:
                break;
        }
    }

    setFlag=()=>{
        this.setState({onEndReachedCalledDuringMomentum : false})
    }

    functionFilter=()=>{
        const {Min_value, Max_value,CityVal, Gender, Page} = this.state;
        this.setState({modalVisible : false, Filter : true,data:[]})
        var mdata = {
            "Min_value":Min_value,
            "Max_value":Max_value,
            "CityVal":CityVal,
            "Gender":Gender
        }
        Storage.saveData("Modal_data" , JSON.stringify(mdata));
        this.setState({Page:1,hideProgress:true},()=>{
            // this.props.getDefaultList(Min_value, Max_value, Gender, CityVal, 1, true);
            this.props.getDefaultList(Min_value, Max_value, Gender, CityVal, 1,true,(data,cp,lp)=>{
                this.setState({data:this.state.data.concat(data)})
                this.setState({
                    hideProgress: false,
                    defaultData: new DataProvider((r1,r2)=>r1 !== r2).cloneWithRows(this.state.data) ,
                    Current_Index : cp,
                    Last_Index : lp
                })
            },()=>{
                this.setState({
                    hideProgress: false})
            });
        })
    }

    googlefuntion = (data) => {
        this.setState({
            CityVal: data.description,
            showPlacesList: false
        })
    }

    closeModal = () => {
        this.setState({ modalVisible: false });
    }

    openModal = () => {
        this.setState({ modalVisible: true });
    }

    onLoadMore=(value)=>{
        //console.log('1')
        const {Min_value, Max_value,CityVal, Gender, Page,Filter} = this.state;
       if(Filter){
            var CurrentIndex= this.state.Current_Index;
            var LastIndex = this.state.Last_Index;
            if(LastIndex == CurrentIndex){
                //console.log('inside if sad', '')
            }
            else{
                //console.log('Inside ---sad->','Else' )
                let mCheck=Page;
                this.setState({Page : this.state.Page+1,hideProgress: true});
                this.props.getDefaultList(Min_value, Max_value, Gender, CityVal, Page+1,false,(data,cp,lp)=>{
                    this.setState({data:this.state.data.concat(data)})
                    this.setState({
                        hideProgress: false,
                        defaultData: new DataProvider((r1,r2)=>r1 !== r2).cloneWithRows(this.state.data) ,
                        Current_Index : cp,
                        Last_Index : lp
                    })
                },()=>{
                    this.setState({
                        hideProgress: false})
                });
                //console.log('1called')
                // this.props.getDefaultList(Min_value, Max_value, Gender, CityVal, mCheck++);
            }
        }
        else{
            var CurrentIndex= this.state.Current_Index;
            var LastIndex = this.state.Last_Index;
            //console.log("CurrentIndex", CurrentIndex)
            //console.log("LastIndex", LastIndex)
            if(LastIndex == CurrentIndex){
                //console.log('inside if', '')
            }
            else{
                //console.log('Inside ---->','Else' )
                let mCheck=Page;
                this.setState({Page : this.state.Page+1,hideProgress: true});
                this.props.getDefaultList(Min_value, Max_value, Gender, CityVal, Page+1,false,(data,cp,lp)=>{
                    this.setState({data:this.state.data.concat(data)})
                    this.setState({
                        hideProgress: false,
                        defaultData: new DataProvider((r1,r2)=>r1 !== r2).cloneWithRows(this.state.data) ,
                        Current_Index : cp,
                        Last_Index : lp
                    })
                },()=>{
                    this.setState({
                        hideProgress: false})
                });
                // this.props.getDefaultList(Min_value, Max_value, Gender, CityVal, mCheck++);
            }
        }
    }

    onViewableItemsChanged(isVisible){
        //console.log("changed : " + JSON.stringify(isVisible.changed))
        //console.log("viewableItems : " + JSON.stringify(isVisible.viewableItems))
    }
    render() {
        const Modal = {
            //List: this.state.List,
            title: this.state.title,
            Man : this.state.Man,
            Woman : this.state.Woman,
            CityVal : this.state.CityVal,
            modalVisible: this.state.modalVisible,
            Min_value : this.state.Min_value,
            Max_value : this.state.Max_value,
            showPlacesList : this.state.showPlacesList,
            functionnavigationPage: this.functionnavigationPage,
            multiSliderValuesChange: this.multiSliderValuesChange,
            closeModal: this.closeModal,
            openModal: this.openModal,
            selectGender : this.selectGender,
            functionFilter : this.functionFilter,
            googlefuntion :  this.googlefuntion,
            onLoadMore: this.onLoadMore,
            navigateWithKeys: this.navigateWithKeys,
            defaultData : this.state.defaultData,
            onViewableItemsChanged:this.onViewableItemsChanged,
            setFlag : this.setFlag,
            onRefresh : this.onRefresh,
            Refreshing : this.state.Refreshing,
            layoutProvider: this.layoutProvider,
            //Redux
            Show_Loader : this.state.hideProgress,
            deviceWidth: deviceWidth
        }
        return <FindPeople  {...Modal} />

    }
}
function mapToState(state) {
    return { }
}
export default connect(mapToState, { getDefaultList,showMessageIcon })(FindPeopleContainer)


