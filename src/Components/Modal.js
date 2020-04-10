import React, { useState } from 'react';
import {Modal, Button, Tag, Collapse, Radio, InputNumber, Form, notification} from 'antd';
import axios from "axios";

const ModalView = ({visible, setVisible, editTeam, persons, setPersons, initialState, setInitialState}) => {

  const [ loading, setLoading ] = useState(false);
  const { Panel } = Collapse;

  /**
   * Send petition to API
   * @returns {Promise<void>}
   */
  const handleSubmit = async () => {

    setLoading(true);

    const data = {
      idPerson: persons[editTeam.person].idPerson,
      name: persons[editTeam.person].name,
      initial: persons[editTeam.person].initial,
      gender: persons[editTeam.person].gender,
      color: persons[editTeam.person].color,
      state: 1,
      report: persons[editTeam.person].report
    }

    try {

      await axios.patch(`https://memo-api-rest.herokuapp.com/persons/${persons[editTeam.person]._id}`, data);

      setPersons({
        ...persons,
        [editTeam.person]: {
          ...persons[editTeam.person],
          state: 1
        }
      })

      setInitialState(persons);

      setInitialState({
        ...persons,
        [editTeam.person]: {
          ...persons[editTeam.person],
          state: 1
        }
      })

      // Open notification
      openNotificationWithIcon('success', 'Confirmación', 'Se ha registrado el cambio correctamente.');

    } catch (e) {

      console.error(e);
      setPersons(initialState);
      // Open notification
      openNotificationWithIcon('error', 'Error', 'Ocurrió un error al registrar el cambio.');

    }

      setLoading(false);
      setVisible(false);

  };

  /**
   * Handle cancel of modal
   */
  const handleCancel = () => {

    setPersons(initialState);
    setVisible(false);

  };

  /**
   * Handle change of radio input
   * @param id
   */
  const handleRadioOnChange = id => {

    let array = persons[editTeam.person].report.slice();
    array[id] = {
      ...persons[editTeam.person].report[id],
      status: 1
    }

    setPersons({
      ...persons,
      [editTeam.person]: {
        ...persons[editTeam.person],
        report:
          array
      }
    })

  };

  /**
   * Handle change of number input
   * @param id
   * @returns {Function}
   */
  const handleInputOnChange = id => value => {

    let array = persons[editTeam.person].report.slice();
    array[id] = {
       ...persons[editTeam.person].report[id],
       verse: value
     }

     setPersons({
       ...persons,
       [editTeam.person]: {
         ...persons[editTeam.person],
         report:
           array
       }
    })

  }

  /**
   * Open notification
   * @param type
   */
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description
    });
  };

  return (
    <div>
      <Modal
        visible={visible}
        title="Reportar Memorización"
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" size="small" onClick={handleCancel}>
            Atrás
          </Button>,
          <Button key="submit" size="small" type="primary" loading={loading} onClick={handleSubmit}>
            Confirmar
          </Button>,
        ]}
      >
        <Collapse expandIconPosition="right">
          {
            persons[Number(editTeam.person)].report.map(item => (
              <Panel header={'Mes ' + (item.id+1)} key={item.id} disabled={!item.available}>
                <Radio.Group onChange={() => handleRadioOnChange(item.id)} value={item.status}>
                  <Radio value={0}>No presentado</Radio>
                  <Radio value={1}>Presentado</Radio>
                </Radio.Group>
                {
                  item.status === 1 && item.available === 1 ?
                    <Form>
                      <Form.Item label="¿Hasta qué versículo presentó?">
                        <InputNumber
                          size="small"
                          min={0}
                          max={40}
                          defaultValue={1}
                          value={item.verse}
                          onChange={handleInputOnChange(item.id)}
                        />
                      </Form.Item>
                    </Form>
                  :
                    null
                }

              </Panel>
            ))
          }
        </Collapse>
        <br/>
        <Tag
          key="tag"
          color={persons[Number(editTeam.person)].gender === 'M' ? 'green' : 'purple'}
        >
          {persons[Number(editTeam.person)].name}
        </Tag>
      </Modal>
    </div>
  );
}

export default ModalView;
