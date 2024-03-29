import React, { useState, useImperativeHandle } from "react";
import { Table, Tooltip } from "antd";
import moment from "moment";
import "./index.less";


function PureTrades(props) {
  const {
    listData,
    loading,
    bordered = true,
    size = 'small',
    onRef,
  } = props;

  const [currentHighlightIds, setCurrentHighlightIds] = useState([]);

  const handleHighlight = (value, record) => {
    // eslint-disable-next-line
    const hightlightList = eval(record.highlight) || [];
    setCurrentHighlightIds(prev => [...prev, ...hightlightList, value]);
  };

  useImperativeHandle(onRef, () => ({
    // clearHighlight 就是暴露给父组件的方法
    clearHighlight: () => {
      setCurrentHighlightIds([]);
    },
    highlightSale: () => {
      const allSaleRecords = listData.filter(item => item.type === '卖出');
      const ids = allSaleRecords.reduce((prev, record) => {
        // eslint-disable-next-line
        const hightlightList = eval(record.highlight) || [];
        return [...prev, ...hightlightList, record.identifier];
      }, [])
      setCurrentHighlightIds(ids);
    }
  }));

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "代码",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => b.time - a.time,
      render: (time) => <span>{moment(time, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: "成交价",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "数量",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "金额",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "费用",
      dataIndex: "fee",
      key: "fee",
    },
    {
      title: "利息",
      dataIndex: "interest",
      key: "interest",
    },
    {
      title: "实现盈利",
      dataIndex: "profit",
      key: "profit",
    },
    {
      title: "备注",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "标识",
      dataIndex: "identifier",
      key: "identifier",
      render: (value, record) => (
        // eslint-disable-next-line
        <a onClick={() => handleHighlight(value, record)}>{value}</a>
      ),
    },
    {
      title: "对应",
      dataIndex: "corresponding",
      key: "corresponding",
      render: value => (
        <Tooltip placement="left" title={value}>
          <div className="ellipsis">{value}</div>
        </Tooltip>
      )
    },
  ];
  const sortedData = listData.sort((a, b) => {
    return b.time - a.time;
  });
  const data = sortedData.map((item, index) => {
    return {
      ...item,
      key: item.identifier,
      price: item.price.toFixed(3),
      amount: item.amount.toFixed(2),
      profit: item.profit.toFixed(2),
      fee: item.fee.toFixed(2),
      interest: item.interest.toFixed(2)
    };
  });

  const handleRowClassname = (record, index) => {
    if(currentHighlightIds.includes(record.identifier)) {
      return 'highlight-row';
    } else {
      return '';
    }
  };

  return (
    <Table
      className="pure-trade-table"
      size={size}
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered={bordered}
      loading={loading}
      rowClassName={handleRowClassname}
    />
  );
}

export default PureTrades;
