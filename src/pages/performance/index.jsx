import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Summary from './components/summary';
import { getPerfGroupList, getPerfGroupPositions } from "@/api";
import "./index.less";

const { TabPane } = Tabs;

function Performance() {
  const [mainGroups, setMainGroups] = useState([]);
  const [currentGroupId, setCurrentGroupId] = useState('');
  const [positionData, setPositionData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPerfGroupList();
      setMainGroups(result.content);
      if(result.content && result.content.length > 0) {
        setCurrentGroupId(result.content[0].group_id);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPerfGroupPositions({
        group_id: currentGroupId,
      });
      setPositionData(result.content);
    };
    if(currentGroupId) {
      fetchData();
    }
  }, [currentGroupId]);


  function handleChangeTab(key) {
    console.log('currentGroupId', key)
    setCurrentGroupId(key);
  }

  return (
    <div className="page-performance">
      <Tabs defaultActiveKey={currentGroupId} onChange={handleChangeTab}>
        {mainGroups.map((group) => (
          <TabPane tab={group.name} key={group.group_id}>
            {
              positionData.group_statistics ?
                <Summary summaryData={positionData.group_statistics || {}}></Summary>
              : null
            }
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default Performance;
