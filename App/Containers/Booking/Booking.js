import React,{useState} from 'react'
import {ButtonGroup} from 'react-native-elements'
import ShowBusOptions from'./ShowBusOptions'
import NotifyMe from './NotifyMe'


const Booking = () => {
   const [buttonIndex,setButtonIndex] = useState(0)
    const buttons = ['SeatBooking','Notify Me!']

    return (
        <React.Fragment>
        <ButtonGroup
            onPress={(selectedIndex)=>setButtonIndex(selectedIndex)}
            selectedIndex={buttonIndex}
            buttons={buttons}
            containerStyle={{ height: 50,marginTop:50 }}
        />
        {(buttonIndex===0)?
            <ShowBusOptions />:
            <NotifyMe />
        }
        </React.Fragment>
    )
}

export default Booking