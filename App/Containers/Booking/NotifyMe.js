import React,{useState} from 'react'
import { View, StyleSheet,Picker,Text, Button} from 'react-native'

export default()=>{
    const [selectedSlot,setSelectedSlot] = useState('')
    return(
            <View style={styles.PickerContainer}>
            <Picker selectedValue={selectedSlot} style={{ height: 100, width: '100%' }} onValueChange={(changedSlot) => setSelectedSlot(changedSlot)}>
                    <Picker.Item label="09:00-09:30" value="09:00-09:30" />
                    <Picker.Item label="09:30-10:00" value="09:30-10:00" />
                    <Picker.Item label="10:00-10:30" value="10:00-10:30" />
            </Picker>
            <View style={{marginTop:150}}>
                <Button 
                title='Notify in this time slot' 
                disabled={selectedSlot===''}
                ></Button>
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    PickerContainer: {
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#D3D3D3'
    },
})