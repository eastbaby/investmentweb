import React, { useState, useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import { getPerfGroupTransfers } from "@/api";
import "./index.less";


function PerformanceTranfers(props) {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getPerfGroupTransfers({
        group_id: props.currentGroupId,
      });
      setListData(result.content);
      setLoading(false);
    };
    fetchData();
  }, [props.currentGroupId]);

  const columns = [
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "金额",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => b.time - a.time,
      render: (time) => <span>{moment(time, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: "备注",
      dataIndex: "comment",
      key: "comment",
    },
  ];
  const sortedData = listData.sort((a, b) => {
    return b.time - a.time;
  });
  const data = sortedData.map((item, index) => {
    return {
      ...item,
      key: index + 1,
      amount: item.amount.toFixed(2),
    };
  });

  return (
    <div className="perf-trades">
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
        loading={loading}
      />
    </div>
  );
}

export default PerformanceTranfers;
