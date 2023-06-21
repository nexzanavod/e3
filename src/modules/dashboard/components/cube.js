import { useCubeQuery }  from '@cubejs-client/react';

export default function Cube() {
    const { resultSet, isLoading, error, progress } = useCubeQuery({
      measures: ['Orders.count'],
      dimensions: ['Orders.createdAt.month'],
    });
  
    if (isLoading) {
      return <div>{progress?.stage || 'Loading...'}</div>;
    }
  
    if (error) {
      return <div>{error.toString()}</div>;
    }
  
    if (!resultSet) {
      return null;
    }
  
    const dataSource = resultSet.tablePivot();
    const columns = resultSet.tableColumns();
  
    return <Table columns={columns} dataSource={dataSource} />;
  }