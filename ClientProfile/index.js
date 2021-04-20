import React, { Component } from 'react';
import { View } from 'react-native';
import Clientprofile from './Clientprofile';
import { connect } from 'react-redux';
import { getClientprofileApi , getClientprofileVisitedApi, hitClientprofileLike ,blockClientApi,getMessageKey } from '../../../../Redux/Actions/clientProfile_action';

class ClientprofileContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ShowLoader: false,
            Name: '',
            Client_Age: '',
            Client_City: '',
            Client_Data: '',
            Client_profile: '',
            Photo_List: [],
            ImageDialog_Visible: false,
            Client_Like: false,
            Client_Block: false,
            Client_Id: '',
            firebaseid:'',
            Client_message_key:"",
            autoDelete:false
        }
    }

    componentDidMount(){
        let id = this.props.route.params.ID;
        let fbid = this.props.route.params.fbid;

        console.log('id gettingg=====', id)
        console.log('fbid gettingg=====', fbid
        )
        
        // alert(id)
        // this.setState({firebaseid:fbid},()=>{
        //     this.setState({Client_Id:id}, () => {
        //         this.props.getClientprofileApi(this.state.Client_Id,
        //             (data)=>{
        //                 if(data){
        //                     this.setState({Client_message_key:data})
        //                 }
        //             }
        //         );
        //         // this.props.getMessageKey(this.state.Client_Id)
        //     });
        // });
        const {navigation} = this.props;
        navigation.addListener ('focus', () =>{
            this.setState({firebaseid:fbid},()=>{
                this.setState({Client_Id:id}, () => {
                    if(!this.state.Client_message_key){

                    this.props.getClientprofileVisitedApi(this.state.firebaseid)
                     this.props.getClientprofileApi(this.state.Client_Id,
                            (data,autoDelete)=>{
                                    this.setState({Client_message_key:data,autoDelete:autoDelete})
                            }
                        );
                    }
                    // this.props.getMessageKey(this.state.Client_Id)
                });
            });

        });
    }

    functionBack = () => {
        this.props.navigation.goBack();
    }

    functionCloseDialog = (value) => {
        if (value && this.props.Photo.length > 0 ) {
            this.setState({ Photo_List: this.props.Photo.length, ImageDialog_Visible: true })
        }
        else {
            this.setState({ ImageDialog_Visible: false })
        }
    }

    functionLike = () => {
        // const body = { 'liked_id': this.state.Client_Id }

        this.props.hitClientprofileLike(this.props.route.params.fbid);
    }

    functionBlockUser = () => {
        const {Client_Id} = this.state;
        this.props.blockClientApi(Client_Id,1)
    }

    functionnavigationPage = (value) => {
        this.props.navigation.navigate(value)
    }

    openReportUser = (page) => {
        this.props.navigation.navigate( page , {'USER_ID' : this.state.Client_Id})
    }

    // openChatPage=()=>{
    //     this.props.navigation.navigate( 'ChatContainer' ,{ 'NAME' : this.props.F_name , 'CLIENT_ID': this.state.firebaseid ,
    //     'CLIENT_PIC' : this.props.avatar ,'PAGE' : 'CLIENT' })
    // }
    openChatPage=()=>{
        let screen = this.props.route.params.screen;
        if(screen!="CHAT"){
            this.props.navigation.navigate( 'ChatProfile' ,{ 'NAME' : this.props.F_name , 'CLIENT_ID': this.state.firebaseid ,
            'CLIENT_PIC' : this.props.avatar ,'PAGE' : 'CLIENT',"MessageKey":this.state.Client_message_key,"autoDelete":this.state.autoDelete })
        }
        else{
            this.props.navigation.goBack()
        }
    }

    render() {
        const Modal = {
            ImageDialog_Visible: this.state.ImageDialog_Visible,
            ShowLoader: this.props.hideProgress,
            Name: this.props.F_name,
            Client_Age: this.props.Age,
            Client_City: this.props.City,
            Client_Data: this.props.User_data,
            Client_profile: this.props.avatar,
            Photo_List: this.props.Photo,
            Client_Like: this.props.Like,
            Client_Block : this.props.Block,
            functionBack: this.functionBack,
            openChatPage: this.openChatPage,
            functionCloseDialog: this.functionCloseDialog,
            functionLike: this.functionLike,
            functionBlockUser: this.functionBlockUser,
            openReportUser: this.openReportUser,
            functionnavigationPage: this.functionnavigationPage
        }
        return < Clientprofile  {...Modal} />
    }
}

function mapToState(state) {
    const { hideProgress, F_name, Age, City, User_data, avatar, Photo, Like ,Block} = state.ClientprofileReducer;
    return { hideProgress, F_name, Age, City, User_data, avatar, Photo, Like ,Block}

}

export default connect(mapToState, { getClientprofileApi, getClientprofileVisitedApi, hitClientprofileLike ,blockClientApi,getMessageKey})(ClientprofileContainer)