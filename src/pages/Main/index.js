import React, { useState } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import api from '../../services/api';

import loadingList from '../../../lottie/loading.json';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  Manuten,
  Title,
  Avatar,
  Desc,
  Status,
  Version,
  Loading,
  DescBold,
  Container1,
  Container2,
} from './styles';

export default function Main() {
  // eslint-disable-next-line react/sort-comp
  // static navigationOptions = {
  //   title: 'Jira El Sistemas',
  // };

  // eslint-disable-next-line react/static-property-placement
  // static propTypes = {
  //   navigation: PropTypes.shape({
  //     navigate: PropTypes.func,
  //   }).isRequired,
  // };

  // state = {
  //   manu: [],
  //   newManu: '',
  //   loading: false,
  // };

  const [manu, setManu] = useState(''); // <==== array
  const [jira, setJira] = useState([]); // aqui ta certo, vc tem que converter o retorno pra array, saquei e como faz? kkk
  const [loading, setLoading] = useState(false);

  async function handleGetMaintenance() {
    // const { newManu } = this.state;
    // this.setState({ loading: true });
    setLoading(true);

    if (!manu) {
      DropdownAlert.dropDownAlertRef.alertWithType(
        'error',
        'Jira',
        'Manutenção não pode ser embranco!',
      );
      setLoading(false);
    } else {
      try {
        const response = await api.get(`/rest/api/2/issue/Ei-${manu}`, {
          auth: {
            username: 'desenvolvimento@elinfo.com.br',
            password: 'A7AcyZztDIAiu7HmnU02A313',
          },
        });
        const data = {
          title: response.data.fields.project.name,
          id: response.data.id,
          avatar: response.data.fields.assignee.avatarUrls['48x48'],
          desc: response.data.fields.description.split('*'),
          devName: response.data.fields.assignee.displayName,
          status: response.data.fields.status.name,
          version: response.data.fields.fixVersions[0].name,
          priority: response.data.fields.priority.iconUrl,
        };

        setJira([data]);
        setManu('');
        setLoading(false);

        Keyboard.dismiss();
      } catch (error) {
        DropdownAlert.dropDownAlertRef.alertWithType(
          'warn',
          'Jira',
          'Manutenção não encontrada!',
        );
        setManu('');
        setLoading(false);
      }
    }
  }

  return (
    <Container>
      <Form>
        <DropdownAlert ref={ref => (DropdownAlert.dropDownAlertRef = ref)} />
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Número da Manutenção"
          value={manu}
          onChangeText={text => setManu(text)} // daria certo tbm, mas ali em cima teria que ser assim
          returnKeyType="send"
          onSubmitEditing={() => handleGetMaintenance()}
        />
        <SubmitButton loading={loading} onPress={() => handleGetMaintenance()}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>
      {loading ? (
        <Loading>
          <Lottie
            loop={false}
            source={loadingList}
            autoPlay
            resizeMode="contain"
            style={{
              width: 100,
              alignContent: 'center',
              alignItems: 'center',
            }}
          />
        </Loading>
      ) : (
        <List
          data={jira}
          keyExtractor={manus => manus.id}
          renderItem={({ item }) => (
            <Manuten>
              <Avatar source={{ uri: item.avatar }} />
              <Title>Desenvolvedor: {item.devName}</Title>
              <Status>Status: {item.status}</Status>
              <Version>Versão: {item.version}</Version>
              <Container1>
                <DescBold>{item.desc[1]}</DescBold>
                <Desc>{item.desc[2]}</Desc>
              </Container1>
              <Container1>
                <DescBold>{item.desc[3]}</DescBold>
                <Desc>{item.desc[4]}</Desc>
              </Container1>
              <Container2>
                <Desc>
                  <DescBold style={{ fontWeight: 'bold', color: 'black' }}>
                    {item.desc[5]}
                  </DescBold>
                  {item.desc[6]}
                </Desc>
              </Container2>
              <Container2>
                <Desc>
                  <DescBold style={{ fontWeight: 'bold', color: 'black' }}>
                    {item.desc[7]}
                  </DescBold>
                  {item.desc[8]}
                </Desc>
              </Container2>
              <Container2>
                <Desc>
                  <DescBold style={{ fontWeight: 'bold', color: 'black' }}>
                    {item.desc[9]}
                  </DescBold>
                  {item.desc[10]}
                </Desc>
              </Container2>
            </Manuten>
          )}
        />
      )}
    </Container>
  );
}
