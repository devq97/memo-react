import React from 'react';
import { List, Avatar, Tag, Timeline } from 'antd';

const Listado = ({persons, setVisible, team, editTeam, setEditTeam}) => {

  const handleClick = (id) => {
    setEditTeam({
      team: team.id,
      person: id
    })
    setVisible(true);
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={team.personas}
      renderItem={
        item => (
          <List.Item 
            onClick={() => handleClick(item.id)}
          >
            <List.Item.Meta
              avatar= {
                <Avatar style={{ color: '#FFF', backgroundColor: persons[item.id].color }}>
                  {persons[item.id].initial}
                </Avatar>
              }
              title={<a href="#!">{persons[item.id].name}</a>}
              description= { 
                persons[item.id].state === 1 ? 
                <Timeline>
                  {persons[item.id].report.map( event => (
                    event.status === 1 ?
                    <Timeline.Item 
                      key={event.id}
                      color={event.max <= event.verse ? 'green' : 'red'}
                    >
                      { 'Reporte hasta vrs. ' + event.verse }
                    </Timeline.Item> : null
                  ))}
                </Timeline>
                : 
                  <Tag color="warning">Pendiente por reportar</Tag>
              }
            />
          </List.Item>
    )}
  />
  )
}

export default Listado;