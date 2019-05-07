import React, {Component} from 'react';
import {Text, TextInput, Button, Divider} from 'react-native-paper';
import {View, ScrollView, Picker} from 'react-native';


export default class AddClient extends React.Component {

    constructor() {
        super();
        this.state = {
            States: ["andaman & nicobar", "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chandigarh", "chhattisgarh", "dadra & nagar haveli", "daman & diu", "delhi", "goa", "gujarat", "haryana", "himachal pradesh", "jammu & kashmir", "jharkhand", "karnataka", "kerala", "lakshadweep", "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "orissa", "pondicherry", "punjab", "rajasthan", "sikkim", "tamil nadu", "tripura", "uttar pradesh", "uttaranchal", "west bengal"],
            States_Selected: '',
            Districts: ["adoor", "alappuzha", "attingal", "chalakudy", "changanassery", "cherthala", "chittur-thathamangalam", "guruvayoor", "kanhangad", "kannur", "kasaragod", "kayamkulam", "kochi", "kodungallur", "kollam", "kottayam", "kozhikode", "kunnamkulam", "malappuram", "mattannur", "mavelikkara", "mavoor", "muvattupuzha", "nedumangad", "neyyattinkara", "nilambur", "ottappalam", "palai", "palakkad", "panamattom", "panniyannur", "pappinisseri", "paravoor", "pathanamthitta", "peringathur", "perinthalmanna", "perumbavoor", "ponnani", "punalur", "puthuppally", "koyilandy", "shoranur", "taliparamba", "thiruvalla", "thiruvananthapuram", "thodupuzha", "thrissur", "tirur", "vaikom", "varkala", "vatakara"],
            Districts_Selected: '',
            Sales_Filter: ['margin_money_received', 'dd_received', 'advance_received', 'finance_tie_up', 'negotiation_stage', 'requirement_identified', 'breaker_delivered'],
            Sales_Filter_Selected: '',
            Breaker: ['400', '450', '650', '750', '1000', '1400'],
            Breaker_Selected: '',
            Deal: ['hot','cold'],
            Deal_Selected: ''

        }
    }


    async onSubmit() {
        this.setState({state: this.state.States_Selected,district: this.state.Districts_Selected,
            sales_filter: this.state.Sales_Filter_Selected, breaker:this.state.Breaker_Selected, deal:this.state.Deal_Selected});
        let response = await NetworkPost('/client/add_new',this.state);
        if (response.status === 'success'){
            this.props.navigation.navigate('Employee');
        }
    }


    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{padding: 10, flex: 1}}>
                    <TextInput
                        value={this.state.name? this.state.name:''}
                        onChangeText={(name) => this.setState({name})}
                        label='Name'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.mobile? this.state.mobile:''}
                        onChangeText={(mobile) => this.setState({mobile})}
                        label='Mobile'
                        mode='outlined'
                    />

                    <Divider/>
                    <Divider/>

                    <Picker
                        selectedValue={this.state.States_Selected}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({States_Selected: itemValue})
                        }>
                        {this.state.States.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>)
                        })}
                    </Picker>

                    <Divider/>
                    <Divider/>

                    <Picker
                        selectedValue={this.state.Districts_Selected}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({Districts_Selected: itemValue})
                        }>
                        {this.state.Districts.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>)
                        })}
                    </Picker>

                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.location? this.state.location:''}
                        onChangeText={(location) => this.setState({location})}
                        label='Location'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.address? this.state.address:''}
                        onChangeText={(address) => this.setState({address})}
                        label='Address'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.password? this.state.password:''}
                        onChangeText={(password) => this.setState({password})}
                        label='Email'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.staff_name? this.state.staff_name:''}
                        onChangeText={(staff_name) => this.setState({staff_name})}
                        label='Staff Name'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.staff_contact_number? this.state.staff_contact_number:''}
                        onChangeText={(staff_contact_number) => this.setState({staff_contact_number})}
                        label='Staff Contact Number'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.email_id? this.state.email_id:''}
                        onChangeText={(email_id) => this.setState({email_id})}
                        label='Email Id'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.base_machine? this.state.base_machine:''}
                        onChangeText={(base_machine) => this.setState({base_machine})}
                        label='Base Machine'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <Picker
                        selectedValue={this.state.Breaker_Selected}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({Breaker_Selected: itemValue})
                        }>
                        {this.state.Breaker.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>)
                        })}
                    </Picker>
                    <Divider/>
                    <Divider/>
                    <Picker
                        selectedValue={this.state.Deal_Selected}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({Deal_Selected: itemValue})
                        }>
                        {this.state.Deal.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>)
                        })}
                    </Picker>
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.followup_date? this.state.followup_date:''}
                        onChangeText={(followup_date) => this.setState({followup_date})}
                        label='Followup Date'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.comment? this.state.comment:''}
                        onChangeText={(comment) => this.setState({comment})}
                        label='Comment'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <Picker
                        selectedValue={this.state.Sales_Filter_Selected}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({Sales_Filter_Selected: itemValue})
                        }>
                        {this.state.Sales_Filter.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>)
                        })}
                    </Picker>
                    <Divider/>
                    <Divider/>
                    <Button mode="contained" onPress={()=> this.onSubmit()}>Add Contact</Button>
                </View>

            </ScrollView>
        );
    }
}