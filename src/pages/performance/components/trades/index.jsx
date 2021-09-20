import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { getPerfGroupTrades } from "@/api";
import PureTrades from "../pureTrades";
import "./index.less";


function PerformanceTrades(props) {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const pureTradesRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getPerfGroupTrades({
        group_id: props.currentGroupId,
      });
      setListData(result.content);
      setLoading(false);
    };
    fetchData();
  }, [props.currentGroupId]);

  return (
    <div className="perf-trades">
      <div className="perf-trades-action">
        <Button type="primary" shape="round" size="small" onClick={() => pureTradesRef.current.clearHighlight()}>高亮重置</Button>
      </div>
      <PureTrades listData={listData} loading={loading} onRef={pureTradesRef}/>
    </div>
  );
}

export default PerformanceTrades;
