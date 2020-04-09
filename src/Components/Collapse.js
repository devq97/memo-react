import React, { useState } from 'react';
import { Collapse, Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import Listado from './List';
import ModalView from './Modal';

const { Panel } = Collapse;

function callback(key) {
}

const genExtra = () => (
  <SettingOutlined
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

const Demo = () => {
  
  const [ expandIconPosition, setExpandIconPosition ] = useState('left');
  const [ visible, setVisible ] = useState(false);
  const [ editTeam, setEditTeam ] = useState({
    team: null,
    person: null
  });
  const [ persons, setPersons ] = useState([
    {
      id: 0,
      name: 'David Vargas',
      initial: 'D',
      gender: 'M',
      color: '#0BA738',
      state: 0,
      report: [
        {
          id: 0,
          verse: 12,
          max: 13,
          status: 0,
          available: 1,
        },
        {
          id: 1,
          verse: 0,
          max: 26,
          status: 0,
          available: 0
        },
        {
          id: 2,
          verse: 0,
          max: 40,
          status: 0,
          available: 0
        }
      ]
    },
    {
      id: 1,
      name: 'Sebastián Palacios',
      initial: 'S',
      gender: 'M',
      color: '#0BA738',
      state: 0,
      report: [
        {
          id: 0,
          verse: 0,
          max: 13,
          status: 0,
          available: 1
        },
        {
          id: 1,
          verse: 0,
          max: 26,
          status: 0,
          available: 0
        },
        {
          id: 2,
          verse: 0,
          max: 40,
          status: 0,
          available: 0
        }
      ]
    },
    {
      id: 2,
      name: 'Oscar Benavides',
      initial: 'O',
      gender: 'M',
      color: '#0BA738',
      state: 0,
      report: [
        {
          id: 0,
          verse: 0,
          max: 13,
          status: 0,
          available: 1
        },
        {
          id: 1,
          verse: 0,
          max: 26,
          status: 0,
          available: 0
        },
        {
          id: 2,
          verse: 0,
          max: 40,
          status: 0,
          available: 0
        }
      ]
    },
    {
      id: 3,
      name: 'Daniel Ducuara',
      initial: 'D',
      gender: 'M',
      color: '#0BA738',
      state: 1,
      report: [
        {
          id: 0,
          verse: 13,
          max: 13,
          status: 1,
          available: 1
        },
        {
          id: 1,
          verse: 0,
          max: 26,
          status: 0,
          available: 0
        },
        {
          id: 2,
          verse: 0,
          max: 40,
          status: 0,
          available: 0
        }
      ]
    },
    {
      id: 4,
      name: 'Camila Gómez',
      initial: 'C',
      gender: 'F',
      color: '#A438F0',
      state: 0,
      report: [
        {
          id: 0,
          verse: 0,
          max: 13,
          status: 0,
          available: 1
        },
        {
          id: 1,
          verse: 0,
          max: 26,
          status: 0,
          available: 0
        },
        {
          id: 2,
          verse: 0,
          max: 40,
          status: 0,
          available: 0
        }
      ]
    },
    {
      id: 5,
      name: 'Leidy Niño',
      initial: 'L',
      gender: 'F',
      color: '#A438F0',
      state: 0,
      report: [
        {
          id: 0,
          verse: 0,
          max: 13,
          status: 0,
          available: 1
        },
        {
          id: 1,
          verse: 0,
          max: 26,
          status: 0,
          available: 0
        },
        {
          id: 2,
          verse: 0,
          max: 40,
          status: 0,
          available: 0
        }
      ]
    }
  ])
  const [ teams, setTeams ] = useState([
    {
      id: 0,
      header: 'David Vargas - Sebastián Palacios',
      personas: [{
        id: 0
      },
      {
        id: 1,
      }]
    },
    {
      id: 1,
      header: 'Oscar Benavides - Daniel Ducuara',
      personas: [{
        id: 2
      },
      {
        id: 3
      }]
    },
    {
      id: 2,
      header: 'Camila Gómez - Leidy Niño',
      personas: [{
        id: 4
      },
      {
        id: 5
      }]
    }
  ]); 

  const [ initialState, setInitialState ] = useState(persons);

    return (
      <div>
        <ModalView 
          visible={visible} 
          setVisible={setVisible} 
          editTeam={editTeam}
          persons={persons}
          setPersons={setPersons}
          initialState={initialState}
          setInitialState={setInitialState}
        />
        <Collapse
          accordion
          onChange={callback}
          expandIconPosition={expandIconPosition}
        >
          {teams.map(team => (
            <Panel 
              header={"T"+(team.id+1)+": "+team.header} 
              key={team.id} 
              extra={genExtra()}
            >
              <Listado 
                persons={persons}
                team={team} 
                editTeam={editTeam}
                setEditTeam={setEditTeam}
                visible={visible} 
                setVisible={setVisible} 
              />
            </Panel>
          ))}
        </Collapse>
      </div>
    );
}

export default Demo;