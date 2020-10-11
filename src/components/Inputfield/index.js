import React from "react"
import { Text, TextInput, View } from "react-native"

function Inputfield (props) {
    return ( 
        <View>
            <View className="form-group">
                <Text htmlFor={props.label}>{props.label}</Text>
                <TextInput type={props.type} className="form-control" 
                    // id="exampleFormControlInput1" 
                    // onChange={props.inputFunction} 
                    name={props.label}
                    placeholder={props.placeholder}
                    minlength={props.minlength} 
                    maxlength={props.maxlength}
                    size={props.size}
                    />
            </View>
            {/* <div className="form-group">
                <label htmlFor="exampleInputPassword1">Subject</label>
                <input type="text" className="form-control" 
                    id="exampleInputPassword1"
                    onChange={props.inputFunction} 
                    name="subject" 
                    placeholder="Subject of Your Email"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Message</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" 
                    rows="6"
                    onChange={props.inputFunction} 
                    name="message" 
                    placeholder="Please write your message here">
                </textarea>
            </div>

   
            <div className="button-container">
                <a type="submit" className="btn btn-primary" href={`mailto:w@w.us?subject=Message from ${props.name}: ${props.subject}&body=${props.message}`}>Mail Me</a>
            </div>  */}
        </View>
        )
    }
export default Inputfield