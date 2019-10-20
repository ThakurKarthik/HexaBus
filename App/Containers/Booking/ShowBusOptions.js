import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet, TouchableOpacity  } from 'react-native'
import {Avatar,Button } from 'react-native-elements'

const BookBusSeat =()=> {
    const [user,setUser] = useState('')
    const [selectedSeat, setSelectedSeat] = useState('')
    const RenderSeats=(isRight)=>{
        let additionalStyles = {
            backgroundColor: '#7FFF00'
        }
        if (isRight){
       return [...Array(10)].map((_,index)=>
       <View style={styles.GroupSeats} key={index}>
               <TouchableOpacity onPress={() => { if(selectedSeat !== (2 * index + 1))
                {setSelectedSeat(2 * index + 1)}
                else{
                    setSelectedSeat('')
                }
                }
                }>
               <View 
                       style={[styles.Seat, ((2 * index + 1) === selectedSeat) && additionalStyles]} id={2*index+1}>
        </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => {
                   if (selectedSeat!==(2*index+2)){setSelectedSeat(2 * index + 2)}
                   else{
                       setSelectedSeat('')
                   }}
                   }>
                   <View style={[styles.Seat, ((2 * index + 2) === selectedSeat)&&additionalStyles]} id={2 * index + 2}>
               </View>
               </TouchableOpacity>
        </View>
        )
        }else{
            return [...Array(10)].map((_, index) =>
                <View style={styles.GroupSeats} key={index}>
                    <TouchableOpacity onPress={() => {
                        if(selectedSeat!==(2*index+21)){
                        setSelectedSeat(2 * index + 21)
                        }else{
                            setSelectedSeat('')
                        }
                        }}>
                    <View 
                            style={[styles.Seat, ((2 * index + 21) === selectedSeat) && additionalStyles]} id={2 * index + 21}>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if(selectedSeat!==(2*index+22))
                        {setSelectedSeat(2 * index + 22)}
                        else{setSelectedSeat('')}
                        }}>
                        <View style={[styles.Seat, ((2 * index + 22) === selectedSeat) && additionalStyles]} id={2 * index + 22}>
                    </View>
                    </TouchableOpacity>
                </View>
            )
        }
       
    }
        return (
            <View style={{flex:1}}>
                <View style={styles.PickerContainer}>
                <Picker selectedValue={user} onValueChange={(changedUser) => setUser(changedUser)}>
                        <Picker.Item label="09:00-09:30 Bus1" value="09:00-09:30 Bus1" />
                        <Picker.Item label="09:30-10:00 Bus2" value="09:30-10:00 Bus2" />
                         <Picker.Item label="10:00-10:30 Bus3" value="10:00-10:30 Bus3" />
                </Picker>
                <Text style={styles.text}>{user}</Text>
                </View>
                <View style={styles.BusContainer}>
                    <View style={styles.Bus}>
                        <View style={styles.DriverSection}>
                            <Avatar
                                rounded
                                icon={{ name: 'user', type: 'font-awesome' }}
                                activeOpacity={0.7}
                                containerStyle={styles.DriverIcon}
                            />
                        </View>
                        <View style={styles.PassengerSection}>
                            <View style={styles.RightSection}>
                                {RenderSeats(true)}
                            </View>
                            <View style={styles.EmptySection}></View>
                            <View style={styles.LeftSection}>{
                                RenderSeats(false)
                            }</View>
                        </View>
                    </View>
                </View>
                <Button
                buttonStyle={{marginBottom:90}}
                    title="Book"
                    disabled={(selectedSeat==='')}
                    raised
                />
            </View>
        )
}
export default BookBusSeat

const styles = StyleSheet.create({
    BusContainer:{
        flex: 4,
    },
    Bus:{
        height: 100,
        width: 'auto',
        borderWidth: 1,
        borderColor:'#D3D3D3',
        backgroundColor:'#fff',
        flexDirection: 'row',
        padding: 4,
        borderRadius: 2
    },
    PassengerSection:{
        flex:9,
    },
    RightSection:{
     flex:2,
     flexDirection:'row',
     justifyContent:"space-around",
    },
    EmptySection:{
        flex:1,
     backgroundColor:'#D3D3D3',
     marginVertical:2
    },
    LeftSection:{
        flex:2,
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    DriverSection:{
        flex:1,
        borderRightWidth: 1,
        borderColor: '#D3D3D3',
    },
    PickerContainer:{
        flex: 4,
        borderWidth: 1,
        borderColor: '#D3D3D3'
    },
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red',
    },
    Seat:{
        borderColor:'#D3D3D3',
        borderWidth: 2,
        backgroundColor:'#fff',
        borderRadius:2,
        height:15,
        width:15
    },
    GroupSeats:{
        flexDirection:'column',
        justifyContent:"space-between"
    },
    DriverIcon:{
         marginTop: 10 
    }
})