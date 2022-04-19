import React from 'react';
import { Table, Space, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  FilterDropdownProps,
  ColumnType,
  TablePaginationConfig,
  ColumnFilterItem,
  TableRowSelection,
} from 'antd/lib/table/interface';
import { DefaultRecordType, GetComponentProps } from 'rc-table/lib/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { sortString } from '../../Utils';
export interface LaoITDevColumn<RecordType> {
  name?: string;
  title: string | JSX.Element;
  render?: (
    text: any,
    record: RecordType,
    index: number
  ) => JSX.Element | string | number;
  width?: string | number;
  ellipsis?: boolean;
  search?: boolean;
  sorter?: boolean;
  onCell?: GetComponentProps<RecordType>;
  className?: string;
  onFilter?: (
    value: string | number | boolean,
    record: DefaultRecordType
  ) => boolean;
  filters?: ColumnFilterItem[];
  children?: LaoITDevColumn<RecordType>[];
}

interface Props<RecordType> {
  columns: LaoITDevColumn<RecordType>[];
  dataSource: Array<any>;
  loading: boolean;
  size?: SizeType;
  pagination?: false | TablePaginationConfig;
  summary?: (data: readonly RecordType[]) => React.ReactNode;
  rowSelection?: TableRowSelection<any> | undefined;
}
interface PropsColumn {
  [x: string]: any;
}
export const LaoITDevTable: React.FC<Props<any>> = (props): JSX.Element => {
  const { t } = useTranslation('company');

  const [tableSearch, setTableSearch] = React.useState<any>({
    searchText: '',
    searchedColumn: '',
  });
  const columnFunc = (col: LaoITDevColumn<any>[]): any => {
    const newCol = col.map((i, index): any => {
      let column: PropsColumn = {
        title: i.title,
        key: index + 1,
        ellipsis: i.ellipsis ? true : false,
      };
      if (i.name) {
        column = { ...column, dataIndex: i.name };
        if (i.sorter) {
          column = {
            ...column,
            sorter: (a: any, b: any) =>
              sortString(i.name && a[i.name], i.name && b[i.name]),
          };
        }
      }
      if (i.name && i.search) {
        column = { ...column, ...getColumnSearchProps(i.name) };
      }
      if (i.width) {
        column = { ...column, width: i.width };
      }

      if (i.render) {
        column = { ...column, render: i.render };
      }
      if (i.className) {
        column = { ...column, className: i.className };
      }
      if (i.onCell) {
        column = { ...column, onCell: i.onCell };
      }
      if (i.onFilter) {
        column = { ...column, onFilter: i.onFilter };
      }
      if (i.filters) {
        column = { ...column, filters: i.filters };
      }
      if (i.children) {
        column = { ...column, children: columnFunc(i.children) };
      }
      return column;
    });
    return newCol;
  };
  const columns = columnFunc(props.columns);
  function getColumnSearchProps<T>(dataIndex: string): ColumnType<T> {
    const searchInput: { current: any } = { current: null };
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search`}
            value={selectedKeys[0]}
            ref={(node: any) => {
              searchInput.current = node;
            }}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type='primary'
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size='small'
              style={{ width: 90, textAlign: 'center' }}
            >
              {t('search')}
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size='small'
              style={{ width: 90 }}
            >
              {t('reset')}
            </Button>
            <Button
              type='link'
              size='small'
              onClick={() => {
                confirm({ closeDropdown: false });
                setTableSearch({
                  searchText: selectedKeys[0],
                  searchedColumn: dataIndex,
                });
              }}
            >
              {t('filter')}
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#056839' : undefined }} />
      ),
      onFilter: (
        value: string | number | boolean,
        record: DefaultRecordType
      ): boolean =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase())
          : '',
      onFilterDropdownVisibleChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text: string) =>
        tableSearch.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[tableSearch.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    };
  }

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: string) => {
    confirm();
    setTableSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  const handleReset = (clearFilters: any) => {
    clearFilters();
    setTableSearch({ searchText: '', searchedColumn: '' });
  };

  return (
    <Table
      loading={props.loading}
      dataSource={props.dataSource}
      columns={columns}
      tableLayout='auto'
      scroll={{ x: '1500' }}
      size={props.size}
      pagination={props.pagination}
      summary={props.summary}
      rowSelection={props.rowSelection}
    />
  );
};
