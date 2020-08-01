import React, { useEffect, useState } from "react";
import { Collapse, notification, Spin } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import axios from "axios";

import ListDetail from "./List";
import ModalView from "./Modal";

const MainList = () => {
  /**
   * State local
   */
  const [persons, setPersons] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loadingOutSide, setLoadingOutSide] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editTeam, setEditTeam] = useState({
    team: null,
    person: null,
  });
  const { Panel } = Collapse;

  /**
   * Use effect
   */
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoadingOutSide(true);
        const persons = await axios.get(
          "https://memo-api-rest.herokuapp.com/persons"
        );
        const teams = await axios.get(
          "https://memo-api-rest.herokuapp.com/teams"
        );
        setPersons(persons.data);
        setInitialState(persons.data);
        setTeams(teams.data);
        setLoadingOutSide(false);
      } catch (e) {
        setLoadingOutSide(false);
        // Open notification
        openNotificationWithIcon(
          "error",
          "Error",
          "Error consultando recursos."
        );
        console.log(e);
      }
    };
    fetchAPI();
  }, []);

  /**
   * Open notification
   * @param type
   */
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  return (
    <div>
      <Spin spinning={loadingOutSide} delay={500}>
        {persons.length !== 0 ? (
          <ModalView
            visible={visible}
            setVisible={setVisible}
            editTeam={editTeam}
            persons={persons}
            setPersons={setPersons}
            initialState={initialState}
            setInitialState={setInitialState}
          />
        ) : null}

        {persons.length !== 0 ? (
          <Collapse accordion expandIconPosition="left">
            {teams.map((team) => (
              <Panel
                header={
                  "T" +
                  (team.idTeam + 1) +
                  ": " +
                  persons[team.persons[0].id].name +
                  " - " +
                  persons[team.persons[1].id].name
                }
                key={team.idTeam}
              >
                <ListDetail
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
        ) : null}
      </Spin>
    </div>
  );
};

export default MainList;
