import React, { useState, useEffect } from "react";
import { getPerfGroupTrades } from "@/api";
import PureTrades from "../pureTrades";
import "./index.less";


function PerformanceTrades(props) {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
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
      <PureTrades listData={listData} loading={loading}/>
    </div>
  );
}

export default PerformanceTrades;
