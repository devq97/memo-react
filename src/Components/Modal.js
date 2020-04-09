import React, { useState } from 'react';
import { Modal, Button, Tag, Collapse, Radio, InputNumber, Form } from 'antd';

const ModalView = ({visible, setVisible, editTeam, persons, setPersons, initialState, setInitialState}) => {

  const [ loading, setLoading ] = useState(false);
  const [ local, setLocal ] = useState(0);
  console.log(initialState);
  
  
  const { Panel } = Collapse;

  const handleOk = () => {
    setLoading(true);

    // Se hace el post 

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

    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setPersons(initialState);
 
    setVisible(false);
  };

  const onChange = id => {
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

  const handleChange = id => value => {
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

     setLocal(id);
  }

    return (
      <div>
        <Modal
          visible={visible}
          title="Reportar Memorización"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" size="small" onClick={handleCancel}>
              Atrás
            </Button>,
            <Button key="submit" size="small" type="primary" loading={loading} onClick={handleOk}>
              Confirmar
            </Button>,
          ]}
        >
          <Collapse expandIconPosition="right">
            {
              persons[Number(editTeam.person)].report.map(item => (
                <Panel header={'Mes ' + (item.id+1)} key={item.id} disabled={!item.available}>
                  <Radio.Group onChange={() => onChange(item.id)} value={item.status}>
                    <Radio value={0}>No presentado</Radio>
                    <Radio value={1}>Presentado</Radio>
                  </Radio.Group>
                  { 
                    item.status === 1 && item.available ?
                      <Form>
                        <Form.Item label="¿Hasta qué versículo presentó?">
                          <InputNumber 
                            size="small" 
                            min={1} 
                            max={40} 
                            defaultValue={1} 
                            value={item.verse}
                            onChange={handleChange(item.id)}
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