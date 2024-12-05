import {Button, Text, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../components/customer-card/CustomerCard';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

export default function Details({route}: Props) {
  const {customer} = route.params;
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Email: {customer.role}</Text>
      <Text>Name: {customer.name}</Text>
      <Text>Email: {customer.email}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
