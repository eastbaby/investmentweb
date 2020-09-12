import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Summary from "./components/summary";
import Position from "./components/position";
import Trades from "./components/trades";
import Transfers from "./components/transfers";

import { getPerfGroupList, getPerfGroupPositions } from "@/api";
import "./index.less";

const { TabPane } = Tabs;

function Performance() {
  const [mainGroups, setMainGroups] = useState([]);
  const [currentGroupId, setCurrentGroupId] = useState("");
  const [currentPerfListKey, setCurrentPerListKey] = useState("");
  const [positionData, setPositionData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPerfGroupList();
      if (result.content && result.content.length > 0) {
        setCurrentGroupId(result.content[0].group_id);
      }
      setMainGroups([
        ...result.content,
        {
          create_time: '',
          modified_time: '',
          group_id: '',
          id: 0,
          name: '汇总',
        },
      ]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getPerfGroupPositions({
        group_id: currentGroupId,
      });
      setPositionData(result.content);
      setLoading(false);
    };
    if (mainGroups && mainGroups.length > 0) {
      fetchData();
    }
  }, [mainGroups, currentGroupId]);

  function handleChangeTab(key) {
    console.log("currentGroupId", key);
    setCurrentGroupId(key);
  }

  function handleChangePerfListTab(key) {
    setCurrentPerListKey(key);
  }

  return (
    <div className="page-performance">
      <Tabs defaultActiveKey={currentGroupId} onChange={handleChangeTab} size="large">
        {mainGroups.map((group) => (
          <TabPane tab={group.name} key={group.group_id}>
            <Summary
              summaryData={positionData.group_statistics}
              loading={loading}
            />
            <Tabs
              defaultActiveKey={currentPerfListKey}
              onChange={handleChangePerfListTab}
              type="card"
              size="small"
            >
              <TabPane tab="持仓" key="asset">
                <Position 
                  positionData={positionData.group_positions}
                  loading={loading}
                />
              </TabPane>
              <TabPane tab="交易记录" key="trade">
                <Trades currentGroupId={currentGroupId} />
              </TabPane>
              <TabPane tab="转账记录" key="transfer">
                <Transfers currentGroupId={currentGroupId} />
              </TabPane>
            </Tabs>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default Performance;
